import styled from 'styled-components'

import { Input } from '../Input'

import { Currency } from './Currency'

export const InputDefault = styled(Input)`
  font-size: 13px;
  min-height: 35px;
`

export const InputCurrency = styled(Currency)`
  font-size: 13px;
  min-height: 35px;
`
export const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  ${({ hidden }) => hidden && 'display:none'}
  ${({ noMarginBottom }) => !noMarginBottom && 'margin-bottom: 20px'}
`
