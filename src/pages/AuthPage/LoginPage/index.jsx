import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Content,
  HeaderTitle,
  BrandView,
  CardTitle,
  SubTitle,
  FormGrid,
  TitleGrid,
  LoginInput,
  PasswordInput,
  SpamLink,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";

import { routesType } from "../../../resources/routesTypes";


const LoginPage = ({ ...props }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();

  const [password, setPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const { onLogin } = useAuth();

  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      console.log("aa", email, password);
      const body = {
        email,
        password,
      };
      onLogin(body)
        .then((res) => {
          navigate(routesType.HOME)
        })
    }
  };
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
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "12%",
            }}
          >
            <BrandView>
              <CardTitle>LOGIN</CardTitle>
            </BrandView>
          </div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div style={{ width: "100%" }}>
              <LoginInput
                placeholder="E-mail"
                name="email"
                onChange={(e) => {
                  setEmail(e?.target?.value);
                }}
                error={errorEmail}
              />
              <PasswordInput
                password
                placeholder="Senha"
                name="password"
                onChange={(e) => {
                  setPassword(e?.target?.value);
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
  );
};

export { LoginPage };
