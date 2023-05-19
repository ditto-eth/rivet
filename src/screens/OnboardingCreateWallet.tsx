import { english, generateMnemonic } from 'viem/accounts'

import { Box, Stack, Text } from '~/design-system'

export function OnboardingCreateWallet() {
  const phrase = generateMnemonic(english)

  return (
    <Stack gap='24px'>
      <Stack gap='16px'>
        <Text weight='medium' size='22px'>
          Create a new wallet
        </Text>
        <Text size='18px'>
          Here is your secret phrase. Keep it safe. I trust you.
        </Text>
      </Stack>
      <Box borderColor='scrim' borderWidth='1.5px' padding='12px'>
        <Text>{phrase}</Text>
      </Box>
    </Stack>
  )
}
