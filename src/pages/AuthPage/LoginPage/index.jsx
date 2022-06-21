import React, { useState, useRef } from 'react'

import {
  Container,
  Content,
  HeaderTitle,
  RodoilBrand,
  BrandView,
  CardTitle,
  SubTitle,
  FormGrid,
  TitleGrid,
  LoginInput,
  PasswordInput,
  SpamLink
} from './styles'

import { Button } from '../../../components/atomos/Button'
// import { brand } from '../../../common/images'
// import { useAuth } from '../../../contexts/auth.context'
// import { useMessage } from '../../../contexts/message.context'

// import { Form } from '@unform/web'
import { routesType } from '../../../resources/routesTypes'

// import * as Yup from 'yup'

const LoginPage = ({ ...props }) => {
  const { history } = props

  const [email, setEmail] = useState()
  const [errorEmail, setErrorEmail] = useState()

  const [password, setPassword] = useState()
  const [errorPassword, setErrorPassword] = useState()

  // const formRef = useRef(null)

  // const { onLogin } = useAuth()

  // const { onSignal, onMessageSucess, onMessageFailed } = useMessage()

  const [disabled, setDisabled] = useState(false)

  // const handleSubmit = data => {
  //   const schema = Yup.object().shape({
  //     user: Yup.string().required('Este campo é obrigatório'),
  //     password: Yup.string().required('Este campo é obrigatório')
  //   })

  //   // formRef.current.setErrors({})

  //   schema
  //     .validate(data, {
  //       abortEarly: false
  //     })
  //     .then(() => {
  //       onSignal()
  //       setDisabled(true)
  //       onLogin(data)
  //         .then(res => {
  //           onMessageSucess('Logado com sucesso', 1500)
  //           if (props.location.state?.from) {
  //             const { pathname, search } = props.location.state.from
  //             return history.push(pathname + search)
  //           }
  //           history.push(routesType.CRM_INITIAL)
  //         })
  //         .catch(error => {
  //           const { response } = error || {}
  //           setDisabled(false)
  //           onMessageFailed(
  //             (response?.data?.messages && response?.data?.messages[0]) ||
  //               'Houve um erro inesperado com seu login'
  //           )
  //         })
  //     })
  //     .catch(err => {
  //       onMessageFailed('Verifique os campos do formulário.')
  //       const validationErrors = {}
  //       if (err instanceof Yup.ValidationError) {
  //         err.inner.forEach(error => {
  //           validationErrors[error.path] = error.message
  //         })

  //         formRef.current.setErrors(validationErrors)
  //       }
  //     })
  // }

  const handleSubmit = data => { }
  return (
    <Container>
      <TitleGrid>
      <HeaderTitle>Lavanderia CEU</HeaderTitle>
      <SubTitle>UFSM</SubTitle>
      </TitleGrid>

      <FormGrid>
        <Content>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '12%'
            }}
          >
            <BrandView>
              <CardTitle>LOGIN</CardTitle>
            </BrandView>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ width: '100%' }}>
              <LoginInput placeholder="E-mail" name="email" onChange={(e)=>{
                setEmail(e?.target?.value)
              }} 
              error={errorEmail}
              />
              <PasswordInput password placeholder="Senha" name="password" 
              onChange={(e)=>{
                setPassword(e?.target?.value)
              }} 
              error={errorPassword}
              /> 
            </div>
            <Button
              disabled={disabled}
              type="submit"
              fullWidth
              color="secundary"
              style={{ height: 40, fontSize: 20 }}
            >
              Entrar
            </Button>
            <SpamLink>Não possui uma conta?</SpamLink>
          </form>
        </Content>
      </FormGrid>
    </Container>
  )
}

export { LoginPage }
