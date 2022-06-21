import styled from 'styled-components'
import { colors } from '../../../common/types/IColors'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ noMargin }) => (noMargin ? '0 !important' : '28px')};

  @media (min-width: 1920px) {
    margin-bottom: 28px;
  }

  @media (max-width: 1440px) {
    margin-bottom: 24px;
  }

  @media (max-width: 1024px) {
    margin-bottom: 18px;
  }

  :only-child {
    margin-bottom: 0px;
  }

  span {
    margin-left: 8px;
    color: ${colors.darkGray};
  }
`

export const AreaText = styled.textarea`
  resize: none;

  background: white;
  border: solid 1px ${({ error }) => (error ? 'red' : 'rgba(200, 200, 200, 1)')};
  outline: none;
  transition: 0.3s;
  display: flex;
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  font-size: 13px;

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

  ::-webkit-scrollbar {
    width: 8px;
    background: rgba(200, 200, 200, 1);
    border-radius: 0 0 3px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 1);
    border-radius: 0 0 3px 0;
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
