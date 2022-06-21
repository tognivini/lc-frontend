import styled from 'styled-components'

export const Text = styled.h1`
  font-style: normal;
  font-weight: ${({ weight }) => (weight ? weight : 'normal')};
  letter-spacing: 0.25px;
  color: ${({ color }) => (color ? color : 'black')};
  font-size: 33px;
  font-family: 'Montserrat' !important;

  @media (min-width: 1920px) {
    font-size: 33px;
  }

  @media (max-width: 1440px) {
    font-size: 27px;
  }

  @media (max-width: 1024px) {
    font-size: 21px;
  }
`
