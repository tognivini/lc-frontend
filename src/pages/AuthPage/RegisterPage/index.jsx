import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  InputMasked,
  PasswordInput,
  SpamLink,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import {
  onGetAllUsers,
  onCreateUser,
} from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import Swal from "sweetalert2";

const RegisterPage = ({ ...props }) => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [errorName, setErrorName] = useState();

  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState();

  const [password, setPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const [rePassword, setRePassword] = useState();
  const [errorRePassword, setErrorRePassword] = useState();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (name && email && phoneNumber && password && rePassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phoneNumber, password, rePassword]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && email && password && rePassword) {
      if (password === rePassword) {
        setErrorPassword();
        setErrorRePassword();
        const body = {
          name,
          email,
          phoneNumber,
          password,
        };
        onCreateUser(body).then((res) => {
          Swal.fire({
            title: "Sucesso!",
            text: "Usuário cadastrado com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        });
      } else {
        setErrorPassword("As senhas não conhecidem!");
        setErrorRePassword("As senhas não conhecidem!");
      }
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
              marginBottom: "2%",
            }}
          >
            <BrandView>
              <CardTitle>Registro</CardTitle>
            </BrandView>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div style={{ width: "100%" }}>
              <LoginInput
                label="Nome"
                placeholder="Preencha com seu nome completo."
                name="name"
                onChange={(e) => {
                  setName(e?.target?.value);
                }}
                error={errorName}
              />
              <LoginInput
                label="E-mail"
                placeholder="E-mail"
                name="Preencha com seu e-mail."
                onChange={(e) => {
                  setEmail(e?.target?.value);
                }}
                error={errorEmail}
              />

              <InputMasked
                label="Telefone"
                mask="cellPhone"
                placeholder="Preencha com seu telefone celular"
                name="phoneNumber"
                controlledValue={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e?.target?.value);
                }}
                error={errorPhoneNumber}
              />
              <div style={{ marginTop: -20 }}>
                <PasswordInput
                  label="Senha"
                  password
                  placeholder="Preencha com sua senha."
                  name="password"
                  onChange={(e) => {
                    setPassword(e?.target?.value);
                  }}
                  error={errorPassword}
                />
                <PasswordInput
                  label="Confirmar senha"
                  password
                  placeholder="Preencha com sua senha novamente."
                  name="rePassword"
                  onChange={(e) => {
                    setRePassword(e?.target?.value);
                  }}
                  error={errorRePassword}
                />
              </div>
            </div>
            <Button
              disabled={disabled}
              type="submit"
              fullWidth
              color="blueGreenLight"
              style={{ height: 40, fontSize: 20 }}
            >
              Registrar-se
            </Button>
            <SpamLink
              onClick={() => {
                navigate(routesType.AUTH_ROOT);
              }}
            >
              Já possui uma conta?
            </SpamLink>
          </form>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { RegisterPage };
