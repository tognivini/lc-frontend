import styled from 'styled-components'

export const LabelStyles = styled.p`
  font-style: normal;
  font-weight: 600;

  letter-spacing: 0.15px;
  margin-bottom: 5px !important;
  margin-top: 2px !important;
  width: 100%;
  font-size: 15.5px;
  line-height: 25px;

  /* @media (min-width: 1920px) {
    font-size: 14px;
  }

  @media (max-width: 1440px) {
    font-size: 12px;
  }

  @media (max-width: 1024px) {
    font-size: 9px;
  } */

  @media (max-width: 600px) {
    font-size: 12px;
  }

  ::after {
    content: ${({ required }) => (required ? '" *"' : null)};
    color: red;
  }
`
