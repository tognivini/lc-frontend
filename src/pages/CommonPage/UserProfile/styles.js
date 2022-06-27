import styled from 'styled-components'
import { colors } from '../../../common/types/IColors'
import { Input } from '../../../components/atomos/Input'
import { InputMask } from '../../../components/atomos/InputMask'
import { TitleOneComponent } from '../../../components/atomos/TitleOne'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  border-bottom-right-radius: 2.5px;
  border-top-right-radius: 2.5px;
  background-color: ${colors.backgroundGray};
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`

// export const TitleGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20vw;
//   padding-left: 20px;
// `
// export const HeaderTitle = styled(TitleOneComponent)`
//   text-align: left;
//   color: ${colors.white};
//   font-weight: bold;
//   font-family: 'Open Sans';
//   font-size: 40px;
//   margin-bottom: 0;
// `
// export const SubTitle = styled(TitleOneComponent)`
//   text-align: left;
//   color: ${colors.white};
//   font-family: 'Open Sans';
//   font-size: 15px;
//   margin-top: 0;
// `

export const FormGrid = styled.div`
  display: flex;
  align-content: center;
  height: 70vh;
  margin: 5vw 2vw 1vw 2vw;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  padding: 50px 50px 50px 50px;

  background-color: ${colors.white};
  box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.3);

  /* height: 100%; */
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

export const InputMasked = styled(InputMask)`
`

export const ContainerButton = styled.div`
display: flex;
justify-content: end;
`