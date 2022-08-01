import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  BrandView,
  CardTitle,
  FormGrid,
  Tr,
  SpacedView,
  DivMargin,
} from "./styles";
import { SwitchComponent } from "../../../components/atomos/Switch";
import { Table } from "../../../components/molecules/Table";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { SituationScheduleEnum, TypeUserEnum } from "../../../services/enums";

import {
  onGetAllSchedules,
  onUpdateSchedule,
} from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import { colors } from "../../../common/types/IColors";
import { format, utcToZonedTime } from "date-fns-tz";
import Swal from "sweetalert2";

const BolsistAreaPage = ({ ...props }) => {
  const { user } = useAuth();

  const [schedules, setSchedules] = useState([]);

  let thisDay = new Date();

  const onHandleGetSchedule = useCallback(async () => {
    if (
      user.permissionType === TypeUserEnum.ADMIN ||
      user.permissionType === TypeUserEnum.BOLSISTA
    ) {
      const today = new Date();
      const formattedTime = format(today, "yyyy-MM-dd");
      const payload = {
        responsibleId: user.userId,
        date: `${formattedTime}T00:00:00.000-03:00`,
      };
      await onGetAllSchedules(payload).then((res) => {
        setSchedules(res?.data);
      });
    }
  }, [user]);

  const onHandleScheduleSituation = (data) => {
    const payload = {
      situation: data.situation,
    };
    onUpdateSchedule(payload, data.scheduleId).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Agendamento atualizado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        onHandleGetSchedule();
      });
    });
  };

  useEffect(() => {
    if (
      user.permissionType === TypeUserEnum.ADMIN ||
      user.permissionType === TypeUserEnum.BOLSISTA
    ) {
      onHandleGetSchedule();
    } else {
      setSchedules([]);
    }
  }, [user]);

  return (
    <Container>
      <FormGrid>
        <Content>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <BrandView>
              <CardTitle>Área Bolsista</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>
                  Agendamentos do dia
                  {format(thisDay, " dd/MM/yyyy")}
                </th>
              </tr>
              <tr>
                <th style={{ width: 10 }}>Lavanderia</th>
                <th>Máquina</th>
                <th>Período</th>
                <th style={{ width: 450 }}>Cliente</th>
                <th style={{ width: 150 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules ? (
                schedules?.map(
                  (
                    {
                      id,
                      laundry,
                      washMachine,
                      startHour,
                      endHour,
                      client,
                      situation,
                    },
                    key
                  ) => {
                    let isScheduleEnded = false;
                    if (SituationScheduleEnum.FINALIZADO.value === situation) {
                      isScheduleEnded = true;
                    }
                    return (
                      <Tr key={key}>
                        <td>{laundry?.name}</td>
                        <td>Máquina {washMachine?.number}</td>
                        <td>
                          {startHour} - {endHour}
                        </td>
                        <td>{client.name}</td>
                        <td>
                          <SpacedView>
                            <DivMargin>
                              {SituationScheduleEnum[situation].label}
                            </DivMargin>
                            {!isScheduleEnded && (
                              <Button
                                type="submit"
                                // fullWidth
                                disabled={isScheduleEnded}
                                color="blueGreenLight"
                                onClick={() => {
                                  if (
                                    situation ===
                                    SituationScheduleEnum.EM_ANDAMENTO.value
                                  ) {
                                    const data = {
                                      situation: "FINALIZADO",
                                      scheduleId: id,
                                    };
                                    onHandleScheduleSituation(data);
                                  } else if (
                                    situation ===
                                    SituationScheduleEnum.NAO_INICIADO.value
                                  ) {
                                    const data = {
                                      situation: "EM_ANDAMENTO",
                                      scheduleId: id,
                                    };
                                    onHandleScheduleSituation(data);
                                  }
                                }}
                                style={{ height: 40, fontSize: 22, with: 10 }}
                              >
                                {situation ===
                                SituationScheduleEnum.NAO_INICIADO.value
                                  ? "Iniciar"
                                  : "Finalizar"}
                              </Button>
                            )}
                          </SpacedView>
                        </td>
                      </Tr>
                    );
                  }
                )
              ) : (
                <></>
              )}
            </tbody>
            {!schedules && (
              <tfoot>
                <tr>
                  <td
                    colspan="5"
                    style={{
                      fontSize: 24,
                      backgroundColor: `${colors.lightGray}`,
                    }}
                  >
                    Sem registros disponíveis na tabela de usuários
                  </td>
                </tr>
              </tfoot>
            )}
          </Table>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { BolsistAreaPage };
