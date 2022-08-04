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
import {
  SituationScheduleEnum,
  StatusEnum,
  TypeUserEnum,
} from "../../../services/enums";

import {
  onGetAllSchedules,
  onUpdateSchedule,
} from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import { colors } from "../../../common/types/IColors";
import { format, utcToZonedTime } from "date-fns-tz";
import Swal from "sweetalert2";
// import emailjs from '@emailjs/browser';
import emailjs from "emailjs-com";

const BolsistAreaPage = ({ ...props }) => {
  // const { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY } = process.env;

  const { user } = useAuth();

  const [schedules, setSchedules] = useState([]);

  let thisDay = new Date();

  const onHandleGetSchedule = useCallback(async () => {
    if (user.permissionType === TypeUserEnum.BOLSISTA) {
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

  const sendEmail = (e, thisSchedule) => {
    e.preventDefault();

    const fromName = "Lavanderia CEU";
    const toName = `${thisSchedule?.client?.name}`;
    // const toEmail = "thisSchedule?.client?.email";
    const toEmail = "tognivini@hotmail.com";
    const subject = "finalizado";
    const message = `Agendamento no horário de ${thisSchedule?.startHour} até ${thisSchedule?.endHour} na ${thisSchedule?.laundry.name}`;

    let templateParams = {
      from_name: fromName,
      to_name: toName,
      to_email: toEmail,
      subject: subject,
      message: message,
    };
    // console.log("ids ", EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY);
    // emailjs.send(
    //   EMAIL_SERVICE_ID,
    //   EMAIL_TEMPLATE_ID,
    //   templateParams,
    //   EMAIL_PUBLIC_KEY
    // );

    emailjs.send(
      "service_kdy70dx",
      "template_ilaqkun",
      templateParams,
      "r89jayx6hnLe0Qthk"
    );
  };

  const onHandleScheduleSituation = (e, data, schedule) => {
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
        if (data.situation === SituationScheduleEnum.FINALIZADO.value) {
          sendEmail(e, schedule);
        }
      });
    });
  };

  useEffect(() => {
    if (user.permissionType === TypeUserEnum.BOLSISTA) {
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
                schedules?.map((schedule, key) => {
                  let isScheduleEnded = false;
                  if (
                    SituationScheduleEnum.FINALIZADO.value ===
                    schedule?.situation
                  ) {
                    isScheduleEnded = true;
                  }
                  return (
                    <Tr key={key}>
                      <td>{schedule?.laundry?.name}</td>
                      <td>Máquina {schedule?.washMachine?.number}</td>
                      <td>
                        {schedule?.startHour} - {schedule?.endHour}
                      </td>
                      <td>{schedule?.client.name}</td>
                      <td>
                        <SpacedView>
                          <DivMargin>
                            {SituationScheduleEnum[schedule?.situation].label}
                          </DivMargin>
                          {!isScheduleEnded && (
                            <Button
                              type="submit"
                              // fullWidth
                              disabled={isScheduleEnded}
                              color="blueGreenLight"
                              name="to_name"
                              value="gabriela"
                              onClick={(e) => {
                                if (
                                  schedule?.situation ===
                                  SituationScheduleEnum.EM_ANDAMENTO.value
                                ) {
                                  const data = {
                                    situation: "FINALIZADO",
                                    scheduleId: schedule?.id,
                                  };
                                  onHandleScheduleSituation(e, data, schedule);
                                } else if (
                                  schedule?.situation ===
                                  SituationScheduleEnum.NAO_INICIADO.value
                                ) {
                                  const data = {
                                    situation: "EM_ANDAMENTO",
                                    scheduleId: schedule?.id,
                                  };
                                  onHandleScheduleSituation(e, data, schedule);
                                }
                              }}
                              style={{ height: 40, fontSize: 22, with: 10 }}
                            >
                              {schedule?.situation ===
                              SituationScheduleEnum.NAO_INICIADO.value
                                ? "Iniciar"
                                : "Finalizar"}
                            </Button>
                          )}
                        </SpacedView>
                      </td>
                    </Tr>
                  );
                })
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
