import styled, { keyframes } from 'styled-components'
import { colors } from '../../../common/types/IColors'

import { TitleTwoComponent } from '../TitleTwo'

const fadeIn = keyframes`
  from {opacity: 0; transform: scale(0)}
  from {opacity: 1; transform: scale(1)}
`

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1100;

  display: grid;
  grid-template-areas:
    '. . .'
    '. content .'
    '. . .';

  grid-template-columns: 1fr 100% 1fr;
  grid-template-rows: 1fr 500px 1fr;
  max-width: 100vw !important;
`

export const Content = styled.div`
  grid-area: content;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MainContainer = styled.div`
  border-radius: 3px;
  background: white;
  min-width: 600px;

  @media (max-width: 650px) {
    min-width: 100%;
  }
  margin: 20px;
  animation: ${fadeIn} 500ms;
  overflow: auto;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 24px 35px;
  box-shadow: 0 0 2px 0 ${colors.borderColor};

  img {
    width: 24px;
    height: auto;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    img {
      width: 17px !important;
    }
  }
`

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 0.8rem;
    width: 24px;
    height: auto;
  }

  .close {
    cursor: pointer;
  }
`

export const Title = styled(TitleTwoComponent)`
  margin: 0px !important;

  font-weight: bold;

  font-size: 25px;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`

export const ContentContainer = styled.div`
  padding: ${({ defaultPadding }) =>
    defaultPadding ? '30px 44px 30px 44px' : '0px'};
`
