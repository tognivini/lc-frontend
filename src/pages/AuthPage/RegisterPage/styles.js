import styled from 'styled-components'
import { loginImage } from '../../../common/images'
import { colors } from '../../../common/types/IColors'
import { Input } from '../../../components/atomos/Input'
import { TitleOneComponent } from '../../../components/atomos/TitleOne'
import { InputMask } from '../../../components/atomos/InputMask'

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
  border-bottom-right-radius: 2.5px;
  border-top-right-radius: 2.5px;
  background-image: url(${loginImage});
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`

export const TitleGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20vw;
  padding-left: 20px;
`
export const HeaderTitle = styled(TitleOneComponent)`
  text-align: left;
  color: ${colors.white};
  font-weight: bold;
  font-family: 'Open Sans';
  font-size: 40px;
  margin-bottom: 0;
  text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff;
`
export const SubTitle = styled(TitleOneComponent)`
  text-align: left;
  color: ${colors.white};
  font-family: 'Open Sans';
  font-size: 15px;
  margin-top: 0;
`

export const FormGrid = styled.div`
  display: flex;
  align-content: center;
  margin-top: 2vw;
  height: 80vh;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  padding: 10px 30px 10px 30px;

  background-color: ${colors.white};
  box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.3);

  height: 90vh;
  width: 35vw;
`

export const CardTitle = styled(TitleOneComponent)`
  text-transform: uppercase;
  text-align: center;
  color: ${colors.darkGray};
  font-weight: bold;
  font-family: 'Open Sans' !important;
  font-size: 25px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
`

export const BrandView = styled.div`
`

export const LoginInput = styled(Input)`
`

export const PasswordInput = styled(LoginInput)`
  border-right-color: transparent;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`
export const InputMasked = styled(InputMask)`
`

export const SpamLink = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
`