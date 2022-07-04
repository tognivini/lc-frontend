import styled from 'styled-components'
import { colors } from '../../../common/types/IColors'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  /* @media (min-width: 1920px) {
    margin-bottom: 20px;
  }

  @media (max-width: 1440px) {
    margin-bottom: 16px;
  }

  @media (max-width: 1024px) {
    margin-bottom: 10px;
  } */

  :only-child {
    margin-bottom: 0px;
  }

  span {
    margin-left: 8px;
    color: ${colors.darkGray};
  }
`

export const Label = styled.label`
  ::after {
    content: ${({ required }) => (required ? '"*"' : null)};
    color: red;
  }
`

export const InputDefault = styled.input`
  background: white;
  border: solid 1px
    ${({ error, readOnly }) => (error ? 'red' : 'rgba(200, 200, 200, 1)')};
  border-radius: ${({ password }) => (password ? '4px 0px 0px 4px' : '4px')};
  outline: none;
  transition: 0.3s;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-top: ${({ label }) => (label === undefined ? null : '5px')};
  /* font-size: clamp(0.88rem, 0.88rem + 0.88vw, 0.88rem); */

  padding: 8px;
  font-size: 13px;
  min-height: 35px;

  ${({ readOnly }) => (readOnly ? 'cursor: default' : '')};
  ${({ readOnly }) => (readOnly ? 'color: ##a2a2a2' : '')};

  /* @media (min-width: 1920px) and (max-width: 2560px) {

    font-size: 15px;
  }

  @media (min-width: 1280px) and (max-width: 1440px) {
    font-size: 11px;
  }

  @media (max-width: 1024px) {
    font-size: 10px;
  } */

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

export const PasswordEye = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: solid 1px rgba(200, 200, 200, 1);
  border-left: none;
  border-radius: 0px 8px 8px 0px;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.4);

  min-height: 37px;

  padding: 0.337rem;

  @media (min-width: 1920px) {
    padding: 0.337rem;
  }

  @media (max-width: 1440px) {
    padding: 0.337rem;
  }

  @media (max-width: 1024px) {
    padding: 0.306rem;
  }

  :hover {
    border-color: rgba(150, 150, 150, 0.8);
    background: rgba(200, 200, 200, 0.6);
  }

  svg {
    color: ${colors.black};
    font-size: 28px;

    @media (min-width: 1920px) {
      font-size: 28px;
    }

    @media (max-width: 1440px) {
      font-size: 24px;
    }

    @media (max-width: 1024px) {
      font-size: 20px;
    }
  }
`
