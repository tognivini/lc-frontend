import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ActionLink = styled(Link)`
  color: #303030;
  text-decoration: underline;
  :hover {
    color: black;
    text-decoration: underline;
  }
`

export const DetailsLink = styled(Link)`
  font-family: 'Montserrat';

  text-decoration-line: underline;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #303030;

  :hover {
    color: black;
    text-decoration: underline;
  }
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: end;
`;