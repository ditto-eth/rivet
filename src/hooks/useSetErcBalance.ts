import { useMutation } from '@tanstack/react-query'

type SetErcBalanceParameters = {
  address: Address
  erc: Address
  value: bigint
}

import { type Address, encodeAbiParameters, keccak256, pad, toHex } from 'viem'
import { queryClient } from '~/react-query'
import { useClient } from './useClient'
import { getErcBalanceQueryKey } from './useErcBalance'

const balanceOfABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
] as const

// set guessed storage slot to odd value
// so it's obvious when checking balanceOf it was the right slot
const SLOT_VALUE_TO_CHECK = 1337_1337_1337_1337_1337_1337_1337_1337_1337n

export function useSetErcBalance() {
  const client = useClient()

  return useMutation({
    async mutationFn({ erc, address, value }: SetErcBalanceParameters) {
      try {
        let slotFound = false
        let slotGuess = 0n

        while (slotFound !== true) {
          // if map, will be keccak256(abi.encode(key, uint(slot)));
          // console.log(`${pad(address)}${pad('0x0').slice(2)}`)
          const encodedData = encodeAbiParameters(
            [
              { name: 'key', type: 'address' },
              { name: 'slot', type: 'uint' },
            ],
            [address, slotGuess],
          )

          const oldSlotValue = await client.getStorageAt({
            address: erc,
            slot: keccak256(encodedData),
          })

          // user value might be something that might have collision (like 0)
          await client.setStorageAt({
            address: erc,
            index: keccak256(encodedData),
            value: pad(toHex(SLOT_VALUE_TO_CHECK)),
          })

          const newBalance = await client.readContract({
            abi: balanceOfABI,
            address: erc,
            functionName: 'balanceOf',
            args: [address],
          })

          if (newBalance === BigInt(SLOT_VALUE_TO_CHECK)) {
            slotFound = true
            await client.setStorageAt({
              address: erc,
              index: keccak256(encodedData),
              value: pad(toHex(value)),
            })
          } else {
            if (slotGuess >= 10n) {
              slotFound = true
              throw 'balances not found past slot 10'
            }

            slotGuess++
            await client.setStorageAt({
              address: erc,
              index: keccak256(encodedData),
              value: oldSlotValue || pad('0x0'),
            })
          }
        }
      } catch (e) {
        console.error(e)
      }
      queryClient.invalidateQueries({
        queryKey: getErcBalanceQueryKey([client.key, { erc, address }]),
      })
    },
  })
}
