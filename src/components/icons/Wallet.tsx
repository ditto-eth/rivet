import { Box } from '~/design-system'
import { backgroundColorVars } from '~/design-system/styles/theme.css'

export function Wallet({ size }: { size: `${number}px` }) {
  return (
    <Box
      as='svg'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 94 91'
      style={{
        height: size,
        width: size,
      }}
    >
      <Box
        as='path'
        fill='transparent'
        stroke={`rgb(${backgroundColorVars.primary} / 0.2)`}
        strokeWidth='1.25'
        d='M11.75 8.031C7.745 8.025 3.843 9.325.541 11.745.768 8.857 1.923 6.142 3.81 4.086 5.924 1.784 8.78.5 11.75.5h70.5c1.471 0 2.93.316 4.29.93a11.237 11.237 0 0 1 3.65 2.656 12.43 12.43 0 0 1 2.448 3.991c.445 1.171.722 2.409.82 3.668-3.199-2.343-7.055-3.714-11.208-3.714h-70.5Zm70.5 17.063h-70.5c-4.005-.007-7.907 1.293-11.209 3.713.227-2.887 1.382-5.603 3.269-7.658 2.114-2.302 4.97-3.587 7.94-3.587h70.5c1.471 0 2.93.316 4.29.93a11.237 11.237 0 0 1 3.65 2.657 12.43 12.43 0 0 1 2.448 3.991c.445 1.17.722 2.408.82 3.668-3.199-2.343-7.055-3.714-11.208-3.714Zm-50.917 9.531c1.238 0 2.435.535 3.325 1.504.89.97 1.398 2.295 1.398 3.684 0 3.136 1.143 6.151 3.19 8.381 2.049 2.231 4.837 3.493 7.754 3.493s5.705-1.262 7.754-3.493c2.047-2.23 3.19-5.245 3.19-8.382 0-1.388.508-2.713 1.398-3.683.89-.969 2.087-1.504 3.325-1.504H82.25c1.471 0 2.93.316 4.29.93a11.237 11.237 0 0 1 3.65 2.656 12.43 12.43 0 0 1 2.448 3.992c.569 1.495.862 3.098.862 4.719v31.281c0 1.62-.293 3.224-.862 4.72a12.43 12.43 0 0 1-2.448 3.99 11.237 11.237 0 0 1-3.65 2.657 10.42 10.42 0 0 1-4.29.93h-70.5c-2.97 0-5.826-1.284-7.94-3.586C1.695 84.61.5 81.478.5 78.204V46.921c0-3.275 1.195-6.407 3.31-8.71 2.114-2.303 4.97-3.587 7.94-3.587h19.583Z'
      />
    </Box>
  )
}
