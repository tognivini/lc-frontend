import styled from 'styled-components'
import { colors } from '../../common/types/IColors'
// import { Input } from '../../../components/atomos/Input'
// import { TitleOneComponent } from '../../../components/atomos/TitleOne'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.blueGreenLight};
`

export const TitleGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20vw;
  padding-left: 20px;
`