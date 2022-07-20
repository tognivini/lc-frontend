import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

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
  Thead,
  Tbody,
  VisibleSpan,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { Table } from "../../../components/molecules/Table";
import { Row } from "./components/Row";

import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { colors } from "../../../common/types/IColors";

import {
  onGetAllNextSchedules,
  onGetAvailableLaundrys,
  onCreateSchedule,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import {
  LaundryEnum,
  MockedBaseHourEnum,
  SituationScheduleEnum,
} from "../../../services/enums";

const UserSchedulePage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [arrayLaundryes, setArrayLaundryes] = useState();
  const [allLaundryes, setAllLaundryes] = useState();
  const [selectedLaundry, setSelectedLaundry] = useState();

  const [arrayWashMachines, setArrayWashMachines] = useState();
  const [allWashMachines, setAllWashMachines] = useState();

  const [responsible, setResponsible] = useState();

  const [selectedWashMachine, setSelectedWashMachine] = useState();
  const [arrayAvailableWashMachines, setArrayAvailableWashMachines] = useState(
    []
  );

  const [selectedHour, setSelectedHour] = useState();

  const [selectedDate, setSelectedDate] = useState();

  const [nextSchedules, setNextSchedules] = useState(false);
  const [availableWashMachines, setAvailableWashMachines] = useState(false);

  const [oppenedView, setOppenedView] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const onGetNextSchedules = useCallback(async () => {
    if (user) {
      const userId = user.userId;
      await onGetAllNextSchedules({ userId }).then((res) => {
        setNextSchedules(res?.data);
      });
    }
  }, [user]);

  const onGetAllLaundryes = useCallback(async () => {
    await onGetAvailableLaundrys().then((data) => {
      if (data?.data) {
        const arr = [];
        data?.data.map((thisLaundry) => {
          return arr.push({
            label: thisLaundry?.name,
            value: thisLaundry?.id,
          });
        });
        setArrayLaundryes(arr);
        setAllLaundryes(data?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      onGetNextSchedules();
      onGetAllLaundryes();
    }
  }, [user]);

  useEffect(() => {
    if (selectedLaundry && selectedWashMachine && selectedHour) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedLaundry, selectedWashMachine, selectedHour]);

  const getAvailableMachinesByLaundryId = useCallback(async () => {
    if (selectedLaundry) {
      const laundryFinded = allLaundryes.find(
        (thisLaundry) => thisLaundry.id === selectedLaundry.value
      );
      if (laundryFinded?.washMachines) {
        const arr = [];
        laundryFinded?.washMachines.map((thisWashMachine) => {
          return arr.push({
            label: `Máquina ${thisWashMachine?.number}`,
            value: thisWashMachine?.id,
          });
        });
        setArrayAvailableWashMachines(arr);
        setAvailableWashMachines(laundryFinded?.washMachines);
        setResponsible(laundryFinded?.responsible);
      } else {
        setAvailableWashMachines([]);
      }
    }
  }, [allLaundryes, selectedLaundry]);

  useEffect(() => {
    if (selectedLaundry && selectedDate) {
      getAvailableMachinesByLaundryId();
    }
  }, [selectedLaundry, selectedDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedTime = parseISO(selectedDate?.value);
    const formatInTimeZone = (date, fmt, tz) =>
      format(utcToZonedTime(date, tz), fmt, { timeZone: tz });
    const formattedTime = formatInTimeZone(
      parsedTime,
      "yyyy-MM-dd kk:mm:ss xxx",
      "UTC"
    );

    const payload = {
      date: formattedTime,
      laundry: {
        id: selectedLaundry?.value,
      },
      washMachine: {
        id: selectedWashMachine?.value,
      },
      startHour: selectedHour,
      endHour: selectedHour,
      responsible: { id: responsible.id },
      client: { id: user?.userId },
    };

    await onCreateSchedule(payload).then((data) => {
      if (data?.statusCode === 200 && data?.success) {
        Swal.fire({
          title: "Sucesso!",
          text: "Agendamento criado com sucesso!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Erro!",
          text: "Ocorreu um problema ao criar o agendamento!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
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
              <SelectInput
                style={{ marginBottom: 25 }}
                label="Selecione a lavanderia"
                options={arrayLaundryes}
                displayValue="label"
                value={selectedLaundry}
                name="selectedLaundry"
                initialValue={null}
                onSelect={(selected) => {
                  setSelectedLaundry(selected);
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
                  // value={date}
                  // setValue={setDate}
                  value={selectedDate}
                  setValue={setSelectedDate}
                />

                <div style={{ width: "100%", marginLeft: "5%" }}>
                  <SelectInput
                    label="Selecione a máquina disponível"
                    options={arrayAvailableWashMachines}
                    displayValue="label"
                    value={selectedWashMachine}
                    name="washMachine"
                    initialValue={null}
                    onSelect={(selected) => {
                      setSelectedWashMachine(selected);
                    }}
                  />
                </div>
              </SpacedView>

              <SpacedView>
                <SelectInput
                  style={{ marginBottom: 25 }}
                  label="Escolha a hora de início"
                  options={Object.values(MockedBaseHourEnum)}
                  displayValue="label"
                  value={selectedHour}
                  name="selectedHour"
                  initialValue={null}
                  onSelect={({ label }) => {
                    setSelectedHour(label);
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    marginLeft: "5%",
                    marginTop: "4%",
                    color: "red",
                  }}
                >
                  <VisibleSpan
                    visible={
                      selectedLaundry && selectedWashMachine && selectedDate
                    }
                  >
                    Por padrão será reservado um espaço de 2h por agendamento
                    (conforme o ciclo das máquinas)
                  </VisibleSpan>
                </div>
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
                <Table
                  columns={[
                    {
                      displayName: "Data",
                      columnName: "data",
                    },

                    {
                      displayName: "Hora de início",
                      columnName: "startHour",
                    },
                    {
                      displayName: "Status",
                      columnName: "status",
                    },
                    {
                      displayName: "Endereço",
                      columnName: "endereco",
                    },
                  ]}
                >
                  {nextSchedules &&
                    nextSchedules?.map((thisSchedule, index) => {
                      return (
                        <Row
                          key={Math.random()}
                          rowData={thisSchedule}
                          // isSelected={isSelected}
                          // onSelectItems={handleSelectItems}
                        />
                      );
                    })}
                  {/* <Thead>
                    <tr>
                      <th>Data</th>
                      <th>Status</th>
                      <th style={{ width: 170 }}>Endereço</th>
                    </tr>
                  </Thead>
                  <Tbody>
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
                  </Tbody>
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
                  )} */}
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
