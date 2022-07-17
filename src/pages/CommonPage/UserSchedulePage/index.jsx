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
  SelectInput,
  // PasswordInput,
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
  onGetAllLaundrys,
  // onUpdateUser,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import { LaundryEnum, SituationScheduleEnum } from "../../../services/enums";

const UserSchedulePage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [laundry, setLaundry] = useState();
  const [allLaundryes, setAllLaundryes] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [washMachine, setWashMachine] = useState();

  const [nextSchedules, setNextSchedules] = useState(false);
  const [availableLaundryes, setAvailableLaundryes] = useState(false);

  const [oppenedView, setOppenedView] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const onGetNextSchedules = useCallback(async () => {
    if (user) {
      const userId = user.userId;
      //verificar
      await onGetAllNextSchedules({ userId }).then((res) => {
        setNextSchedules(res?.data);
      });
    }
  }, [user]);

  const onGetAllLaundryes =  useCallback(async() => {
    await onGetAllLaundrys().then((res) => {
      setAllLaundryes(res?.data);
    });
}, []);

  useEffect(() => {
    if (user) {
      onGetNextSchedules();
      onGetAllLaundryes()
    }
  }, [user]);

  useEffect(() => {
    if (laundry && washMachine) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [laundry, washMachine]);

console.log(allLaundryes)

  const getAvailableLaundryes =  useCallback(async() => {
    console.log("checke", laundry);
    if (laundry) {
      const laundryId = '990be513-c70e-45c0-8ffd-3a978e801bca'
      await onGetAllLaundrys({laundryId}).then((res) => {
        console.log(res, 'res')
        setAvailableLaundryes(res?.data?.washMachines);
      });
    }
  }, [laundry]);

  useEffect(()=>{
    if (laundry && date) {
      getAvailableLaundryes()
    }
  }, [laundry, date]);

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

                <SelectInput
                  style={{ marginLeft: "5%" }}
                  label="Escolha a hora desejada"
                  options={Object.values(LaundryEnum)}
                  displayValue="label"
                  value={time}
                  name="time"
                  initialValue={null}
                  onSelect={({ label }) => {
                    setTime(label);
                  }}
                  //  initialValue={
                  //    isEdit
                  //      ? MotivosPlanoDeAcaoEnum[actionData.reason] || undefined
                  //      : null
                  //  }
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
                              {schedule?.situation
                                ? SituationScheduleEnum[schedule?.situation]
                                    .label
                                : "-"}
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
