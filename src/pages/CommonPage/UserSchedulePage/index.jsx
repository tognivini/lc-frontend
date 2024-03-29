import React, { useState, useCallback, useEffect } from "react";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

import {
  Container,
  Content,
  BrandView,
  CardTitle,
  FormGrid,
  SelectInput,
  InputC,
  DateInputC,
  ContainerButton,
  NextScheduleGrid,
  ArrowForwardIosIcon,
  ArrowForwardIosIconDown,
  SpacedView,
  NextScheduleContent,
  CardTitleNextSchedule,
  ContainerNexSchedule,
  VisibleSpan,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { Table } from "../../../components/molecules/Table";
import { Row } from "./components/Row";
import { useAuth } from "../../../contexts/auth.context";

import {
  onGetAllSchedules,
  onGetAvailableLaundrys,
  onCreateSchedule,
  onGetAvailableHours,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

const UserSchedulePage = ({ ...props }) => {
  const { user } = useAuth();

  const [arrayLaundryes, setArrayLaundryes] = useState();
  const [allLaundryes, setAllLaundryes] = useState();
  const [selectedLaundry, setSelectedLaundry] = useState();

  const [responsible, setResponsible] = useState();

  const [selectedWashMachine, setSelectedWashMachine] = useState();
  const [arrayAvailableWashMachines, setArrayAvailableWashMachines] = useState(
    []
  );

  const [selectedHour, setSelectedHour] = useState();
  const [availableHours, setAvailableHours] = useState([]);

  const [selectedDate, setSelectedDate] = useState();

  const [nextSchedules, setNextSchedules] = useState(false);

  const [reloadRow, setReloadRow] = useState(false);

  const [oppenedView, setOppenedView] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const onGetNextSchedules = useCallback(async () => {
    if (user) {
      const clientId = user.userId;
      // const parsedTime = parseISO(selectedDate?.value);
      // const formattedTime = format(parsedTime, "yyyy-MM-dd");

      await onGetAllSchedules({ clientId }).then((res) => {
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
    if (reloadRow) {
      onGetNextSchedules();
      setReloadRow(false);
    }
  }, [reloadRow]);

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
        setResponsible(laundryFinded?.responsible);
      } else {
        setArrayAvailableWashMachines([]);
      }
    }
  }, [allLaundryes, selectedLaundry]);

  const getAvailableHours = useCallback(async () => {
    if (selectedLaundry && selectedDate && selectedWashMachine) {
      const val = new Date(selectedDate?.value)
      val.setHours(val.getHours() + 4);
      const formattedTime = format(val, "yyyy-MM-dd");
      const payload = {
        laundryId: selectedLaundry.value,
        washMachineId: selectedWashMachine?.value,
        date: `${formattedTime}T00:00:00.000-03:00`,
      };
      await onGetAvailableHours(payload).then((data) => {
        const arr = [];
        data?.data.map((thisHour) => {
          return arr.push({
            label: thisHour,
            value: thisHour,
          });
        });
        setAvailableHours(arr);
      });
    }
  }, [selectedLaundry, selectedWashMachine, selectedDate]);

  useEffect(() => {
    if (selectedLaundry && selectedDate) {
      getAvailableMachinesByLaundryId();
    }
  }, [selectedLaundry, selectedDate]);

  useEffect(() => {
    if (selectedLaundry && selectedWashMachine && selectedDate) {
      getAvailableHours();
    }
  }, [selectedLaundry, selectedWashMachine, selectedDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedTime = parseISO(selectedDate?.value);

    const formattedTime = format(parsedTime, "yyyy-MM-dd");

    let endHour = selectedHour;
    switch (selectedHour) {
      case "08:00":
        endHour = "10:00";
        break;
      case "10:00":
        endHour = "12:00";
        break;
      case "14:00":
        endHour = "16:00";
        break;
      case "16:00":
        endHour = "18:00";
        break;
      case "18:00":
        endHour = "20:00";
        break;
      case "20:00":
        endHour = "22:00";
        break;
      case "22:00":
        endHour = "00:00";
        break;
      default:
        Swal.fire({
          title: "Erro!",
          text: "Horário inválido!",
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          window.reload();
        });
    }

    const payload = {
      date: formattedTime,
      laundry: {
        id: selectedLaundry?.value,
      },
      washMachine: {
        id: selectedWashMachine?.value,
      },
      startHour: selectedHour,
      endHour: endHour,
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
        }).then(() => {
          onGetNextSchedules();
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
              />
              <SpacedView>
                <DateInputC
                  name="visitDate"
                  label="Data da visita"
                  value={selectedDate}
                  setValue={setSelectedDate}
                />

                <div style={{ width: "100%", marginLeft: "5%" }}>
                  {selectedLaundry && selectedDate ? (
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
                  ) : (
                    <InputC
                      label="Selecione a máquina disponível"
                      placeholder="Selecione a lavanderia e a data"
                      disabled
                    />
                  )}
                </div>
              </SpacedView>

              <SpacedView>
                {selectedLaundry && selectedDate && selectedWashMachine ? (
                  <SelectInput
                    style={{ marginBottom: 25 }}
                    label="Escolha a hora de início"
                    options={Object.values(availableHours)}
                    displayValue="label"
                    value={selectedHour}
                    name="selectedHour"
                    initialValue={null}
                    onSelect={({ label }) => {
                      setSelectedHour(label);
                    }}
                  />
                ) : (
                  <InputC
                    label="Escolha a hora de início"
                    placeholder="Selecione a lavanderia, a data e a máquina"
                    disabled
                  />
                )}

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
        <NextScheduleContent oppenedView={oppenedView}>
          <>
            {oppenedView ? (
              <ContainerNexSchedule>
                <SpacedView>
                  <CardTitleNextSchedule
                    onClick={() => {
                      setOppenedView(!oppenedView);
                    }}
                  >
                    Proximos agendamentos
                  </CardTitleNextSchedule>
                  <ArrowForwardIosIconDown
                    onClick={() => {
                      setOppenedView(!oppenedView);
                    }}
                  />
                </SpacedView>
                <Table
                  columns={[
                    {
                      displayName: "Data",
                      columnName: "data",
                    },

                    {
                      displayName: "Início",
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
                          setReloadRow={setReloadRow}
                        />
                      );
                    })}
                </Table>
              </ContainerNexSchedule>
            ) : (
              <SpacedView>
                <CardTitleNextSchedule
                  onClick={() => {
                    setOppenedView(!oppenedView);
                  }}
                >
                  Visualizar agendamentos marcados
                </CardTitleNextSchedule>
                <ArrowForwardIosIcon
                  onClick={() => {
                    setOppenedView(!oppenedView);
                  }}
                />
              </SpacedView>
            )}
          </>
        </NextScheduleContent>
      </NextScheduleGrid>
    </Container>
  );
};

export { UserSchedulePage };
