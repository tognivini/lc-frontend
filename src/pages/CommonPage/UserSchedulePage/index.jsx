import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import {
  Container,
  Content,
  // HeaderTitle,
  BrandView,
  CardTitle,
  // SubTitle,
  FormGrid,
  // TitleGrid,
  InputC,
  SelectInput,
  // PasswordInput,
  InputMasked,
  DateInputC,
  ContainerButton,
  NextScheduleGrid,
  ArrowForwardIosIcon,
  ArrowForwardIosIconDown,
  SpacedView,
  NextScheduleContent,
  CardTitleNextSchedule,
  ContainerNexSchedule,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { Table } from "../../../components/molecules/Table";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { colors } from "../../../common/types/IColors";

import {
  onGetAllNextSchedules,
  // onUpdateUser,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import { LaundryEnum, SituationScheduleEnum } from "../../../services/enums";

const UserSchedulePage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [laundry, setLaundry] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [washMachine, setWashMachine] = useState();

  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState(false);
  const [nextSchedules, setNextSchedules] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [oppenedView, setOppenedView] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const onGetNextSchedules = useCallback(async () => {
    if (user) {
      const userId = user.userId;
      //verificar
      await onGetAllNextSchedules({userId}).then((res) => {
        setNextSchedules(res?.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      onGetNextSchedules();
    }
  }, [user]);

  useEffect(() => {
    if (laundry && washMachine) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [laundry, washMachine]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const payload = {
    //   name,
    //   email,
    //   phoneNumber,
    // };

    const d = new Date(date).toISOString();
    console.log(d, "d");

    // const userId = user.userId;
    // onUpdateUser(payload, userId).then((res) => {
    //   Swal.fire({
    //     title: "Sucesso!",
    //     text: "Usuário editado com sucesso!",
    //     icon: "success",
    //     confirmButtonText: "Ok",
    //   });
    // });
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
              <SelectInput
                style={{ marginBottom: 25 }}
                label="Selecione a lavanderia"
                options={Object.values(LaundryEnum)}
                displayValue="label"
                value={laundry}
                name="laundry"
                initialValue={null}
                onSelect={({ label }) => {
                  setLaundry(label);
                }}
                //  initialValue={
                //    isEdit
                //      ? MotivosPlanoDeAcaoEnum[actionData.reason] || undefined
                //      : null
                //  }
              />
              <SpacedView>
                <DateInputC
                  name="visitDate"
                  // style={{ width: "95%" }}
                  label="Data da visita"
                  value={date}
                  setValue={setDate}
                  // initialValue={
                  //   isEdit
                  //     ? format(new Date(editModal.historyDate), "dd/MM/yyyy")
                  //     : null
                  // }
                />

                <InputC
                  label="Escolha a hora desejada"
                  placeholder="--:--"
                  style={{ marginLeft: "5%" }}
                  name="time"
                  time={true}
                  value={time}
                  onChange={(e) => {
                    setTime(e?.target?.value);
                  }}
                  // error={errorName}
                />
              </SpacedView>

              <SpacedView>
                <SelectInput
                  style={{ marginBottom: 25 }}
                  label="Selecione a máquina disponível"
                  options={Object.values(LaundryEnum)}
                  displayValue="label"
                  value={washMachine}
                  name="washMachine"
                  initialValue={null}
                  onSelect={({ label }) => {
                    setWashMachine(label);
                  }}
                  //  initialValue={
                  //    isEdit
                  //      ? Enum[data.reason] || undefined
                  //      : null
                  //  }
                />
                <span style={{ width: "100%" }}></span>
              </SpacedView>

              {/* <InputInput
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
                fullWidth
                color="blueGreenLight"
                style={{ height: 40, fontSize: 25, with: 30 }}
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
              <ContainerNexSchedule>
                <SpacedView>
                  <CardTitleNextSchedule>
                    Proximos agendamentos
                  </CardTitleNextSchedule>
                  <ArrowForwardIosIconDown />
                </SpacedView>
                <Table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Status</th>
                      <th style={{ width: 170 }}>Endereço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nextSchedules ? (
                      nextSchedules?.map((schedule, key) => {
                        const newDate = new Date().toISOString();
                        const formatedDate = format(
                          new Date(newDate),
                          "MM/dd/yyyy"
                        );

                        return (
                          <tr key={key}>
                            <td>{formatedDate}</td>
                            <td>{schedule?.laundry?.address}</td>
                            <td>
                              {schedule?.situation ? SituationScheduleEnum[schedule?.situation].label : '-'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                  {!nextSchedules && (
                    <tfoot>
                      <tr>
                        <td
                          colspan="3"
                          style={{
                            fontSize: 20,
                            backgroundColor: `${colors.lightGray}`,
                          }}
                        >
                          Não há agendamentos futuros
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </Table>
              </ContainerNexSchedule>
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
