import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  // HeaderTitle,
  BrandView,
  CardTitle,
  // SubTitle,
  FormGrid,
  // TitleGrid,
  InputCustom,
  // PasswordInput,
  InputMasked,
  ContainerButton,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";

import { onGetAllUsers, onUpdateUser } from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import { useEffect } from "react";

const UserProfilePage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const setUser = useCallback(async () => {
    if (user) {
      const userId = user.userId;
      await onGetAllUsers({ userId }).then((res) => {
        setName(res[0]?.name);
        setEmail(res[0]?.email);
        setPhoneNumber(res[0]?.phoneNumber);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setUser();
    }
  }, [user]);

  const [name, setName] = useState();
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name,
      email,
      phoneNumber,
    };
    const userId = user.userId
    onUpdateUser({ payload, userId }).then((res) => {
      console.log('mds', res)
    });
  };

  return (
    <Container>
      <FormGrid>
        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <BrandView>
              <CardTitle>Editar perfil</CardTitle>
            </BrandView>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div style={{ width: "100%" }}>
              <InputCustom
                label="Nome"
                placeholder="Nome"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e?.target?.value);
                }}
                error={errorName}
              />
              <InputCustom
                label="E-mail"
                placeholder="E-mail"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e?.target?.value);
                }}
                error={errorEmail}
              />
              <InputMasked
                label="Telefone"
                mask="cellPhone"
                placeholder="(99) 99999-9999"
                name="phoneNumber"
                controlledValue={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e?.target?.value);
                }}
                error={errorPhoneNumber}
              />
            </div>
            <ContainerButton>
              <Button
                disabled={disabled}
                type="submit"
                // fullWidth
                color="blueGreenLight"
                style={{ height: 40, fontSize: 20, with: 50 }}
              >
                Editar
              </Button>
            </ContainerButton>
          </form>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { UserProfilePage };
