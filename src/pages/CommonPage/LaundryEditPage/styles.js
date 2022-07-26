import styled from 'styled-components'
import { colors } from '../../../common/types/IColors'
import { Input } from '../../../components/atomos/Input'
import { InputMask } from '../../../components/atomos/InputMask'
import { TitleOneComponent } from '../../../components/atomos/TitleOne'
import { Select } from "../../../components/atomos/Select";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  border-bottom-right-radius: 2.5px;
  border-top-right-radius: 2.5px;
  background-color: ${colors.backgroundGray};
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`

export const FormGrid = styled.div`
  display: flex;
  align-content: center;
  height: ${props => props.smallHeight ? '50vh' :'65vh'};
  margin: ${props => props.smallHeight ? '2vw' :'5vw'} 2vw 1vw 2vw;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  padding: 50px 50px 50px 50px;

  background-color: ${colors.white};
  box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.3);

  width: 70vw;
`

export const CardTitle = styled(TitleOneComponent)`
  text-align: center;
  color: ${colors.darkGray};
  font-family: 'Open Sans' !important;
  font-size: 30px;
  margin-top: 0px !important;
`

export const BrandView = styled.div`
`

export const InputCustom = styled(Input)`
`

export const ContainerButton = styled.div`
display: flex;
justify-content: end;
`

export const SelectInput = styled(Select)``;
