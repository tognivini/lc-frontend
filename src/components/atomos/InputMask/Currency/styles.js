import styled from 'styled-components'

import CurrencyInput from 'react-currency-input'

export const InputCurrency = styled(CurrencyInput)`
  background: ${({ readOnly }) => (readOnly ? '#f4f4f4' : 'white')};
  border: solid 1px
    ${({ error, readOnly }) =>
      error ? 'red' : readOnly ? '#c1c1c1' : 'rgba(200, 200, 200, 1)'};
  border-radius: ${({ password }) => (password ? '4px 0px 0px 4px' : '4px')};
  outline: none;
  transition: 0.3s;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  /* margin-top: ${({ label }) => (label === undefined ? null : '5px')}; */
  /* font-size: clamp(0.88rem, 0.88rem + 0.88vw, 0.88rem); */

  padding: 8px;
  font-size: 13px;
  min-height: 37px;

  ${({ readOnly }) => (readOnly ? 'cursor: default' : '')};

  /* font-size: 20px; */

  ::placeholder {
    transition: 0.3s;
    color: rgba(200, 200, 200, 1);
  }

  :focus {
    border-color: rgba(150, 150, 150, 0.8);
    ::placeholder {
      color: rgba(200, 200, 200, 0.5);
    }
  }

  :disabled {
    background: #eeeeee;
  }
`

export const DivInput = styled.div`
  display: flex;
  flex-direction: row;
`

export const DivMask = styled.div`
  padding: 0px 10px;
  border: solid 1px rgba(200, 200, 200, 1);
  border-left-width: 0px;
  border-radius: 0px 4px 4px 0px;
  display: flex;
  place-items: center;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
`
