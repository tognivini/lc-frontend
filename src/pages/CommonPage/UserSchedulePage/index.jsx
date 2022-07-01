import React, { useState, useCallback, useEffect } from "react";
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
  SelectCustom,
  // PasswordInput,
  InputMasked,
  ContainerButton,
  NextScheduleGrid,
  ArrowForwardIosIcon,
  ArrowForwardIosIconDown,
  SpacedView,
  NextScheduleContent,
  CardTitleNextSchedule,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";

import {
  onGetAllUsers,
  onUpdateUser,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import { LaundryEnum } from "../../../services/enums";

const UserSchedulePage = ({ ...props }) => {
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
  const [laundry, setLaundry] = useState();
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [oppenedView, setOppenedView] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name,
      email,
      phoneNumber,
    };
    const userId = user.userId;
    onUpdateUser(payload, userId).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
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
              <CardTitle>Realizar novo agendamento</CardTitle>
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

              <SelectCustom
                style={{ marginBottom: 25 }}
                label="Selecione a lavanderia"
                options={Object.values(LaundryEnum)}
                displayValue="label"
                value="value"
                name="laundry"
                initialValue={null}
                onSelect={(e) => {
                  setLaundry(e?.target?.value);
                }}
                //  initialValue={
                //    isEdit
                //      ? MotivosPlanoDeAcaoEnum[actionData.reason] || undefined
                //      : null
                //  }
              />

              {/* <InputCustom
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
              /> */}
            </div>
            <ContainerButton>
              <Button
                disabled={disabled}
                type="submit"
                // fullWidth
                color="blueGreenLight"
                style={{ height: 30, fontSize: 20, with: 30 }}
              >
                Agendar
              </Button>
            </ContainerButton>
          </form>
        </Content>
      </FormGrid>
      <NextScheduleGrid>
        <NextScheduleContent
          oppenedView={oppenedView}
          onClick={() => {
            setOppenedView(!oppenedView);
          }}
        >
          <>
            {oppenedView ? (
              <SpacedView>
                <CardTitleNextSchedule>
                  Proximos Agendamentos
                </CardTitleNextSchedule>
                <ArrowForwardIosIconDown />
              </SpacedView>
            ) : (
              <SpacedView>
                <CardTitleNextSchedule>
                  Visualizar agendamentos marcados
                </CardTitleNextSchedule>
                <ArrowForwardIosIcon />
              </SpacedView>
            )}
          </>
        </NextScheduleContent>
      </NextScheduleGrid>
    </Container>
  );
};

export { UserSchedulePage };
