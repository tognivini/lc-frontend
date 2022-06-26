import styled, { css } from 'styled-components'
import { colors } from '../../../common/types/IColors'

const fullWidthStyle = css`
  width: 100%;
`

const transparentCss = css`
  border: 1px solid transparent !important;

  text-decoration-line: underline !important;

  background: transparent;
  color: ${({ color }) => {
    const key = color || 'blueGreenLight'
    return colors[key]
  }};

  svg {
    color: ${({ color }) => colors[color] || colors.blueGreenLight};
  }

  padding: 0 !important;
  font-weight: 500;

  :hover {
    color: ${({ color }) => colors[color] || colors.blueGreenLight} !important;
    svg {
      color: ${({ color }) => colors[color] || colors.blueGreenLight} !important;
    }
    background: transparent !important;
  }
`

const smallBotton = css`
  padding: 8px 17px !important;
  font-size: 18px !important;
  height: 38px;
  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: 18px !important;
    padding: 8px 17px !important;
    height: 38px;
  }

  @media (max-width: 1440px) {
    font-size: 16.5px !important;
    padding: 7px 15px !important;
    height: 35px;
  }

  @media (max-width: 1366px) {
    font-size: 15px !important;
    padding: 7px 17px !important;
    height: 33px;
  }

  @media (max-width: 1280px) {
    font-size: 15px !important;
    padding: 7px 15px !important;
    height: 30px;
  }

  @media (max-width: 768px) {
    font-size: 12px !important;
    padding: 5px 12px !important;
    height: 28px;
  }
  @media (max-width: 425px) {
    font-size: 10px !important;
    padding: 5px 10px !important;
    height: 25px;
  }
`

export const DefaultButton = styled.button`
  font-weight: bold;
  outline: none;
  user-select: none;
  border: solid 1.4px
    ${({ color }) => {
    const key = color || 'blueGreenLight'
    return colors[key]
  }};
  outline: none;
  border-radius: 8px;
  width: fit-content;

  display: flex;
  align-items: center;

  cursor: pointer;
  letter-spacing: 0.16px;
  background: ${({ color }) => {
    const key = color || 'blueGreenLight'
    return colors[key]
  }};
  color: ${colors.white};
  line-height: 14px;
  /* width: ${customWidth => customWidth ? customWidth  : 'fit-content' } ; */

  ${({ fullWidth }) => fullWidth && fullWidthStyle}

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  padding: 5px 12px;
  height: 37px;

  @media (max-width: 600px) {
    height: 30px;
    font-size: 15px !important;

    img {
      width: 23px !important;
    }
  }

  @media (max-width: 500px) {
    height: 30px;
    font-size: 14px !important;

    img {
      width: 20px !important;
    }
  }

  svg {
    color: ${colors.white};
    font-size: 28px !important;

    margin: 0;
    margin-right: 6px !important;
    margin-left: -10px !important;
  }

  img {
    height: 26px !important;
    margin: 0;
    margin-right: 8px !important;
  }

  :disabled {
    background: ${colors.lightGray};
    border: none;
    color: ${colors.gray};
    cursor: default;
  }

  ${({ small }) => small && smallBotton}

  * {
    font-family: 'Open Sans' !important;
  }

  transition: background 120ms;
  ${({ transparent }) => transparent && transparentCss}
`
