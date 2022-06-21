import styled from 'styled-components'
import { colors } from '../../../common/types/IColors'
import { Button } from '../Button'

export const OutlineButton = styled(Button)`
  background-color: transparent;
  color: ${({ color }) => colors[color] || colors.red};
  border-color: ${({ color }) => colors[color] || colors.red};
  /* font-weight: normal;
  font-weight: 600; */
  svg {
    color: ${({ color }) => colors[color] || colors.red} !important;
  }
`
