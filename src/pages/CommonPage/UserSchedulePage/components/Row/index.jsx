import { SituationScheduleEnum } from "../../../../../services/enums";
import { format } from "date-fns-tz";
import { Button } from "../../../../../components/atomos/Button";

import Swal from "sweetalert2";

import { onUpdateSchedule } from "../../../../../services/api-services/index";

function Row(props) {
  const { rowData, setReloadRow } = props;

  const formatedDate = format(new Date(rowData?.date), "dd/MM/yyyy");

  const onHandleCancelSchedule = async (event) => {
    event.preventDefault();

      Swal.fire({
        title: "Atenção!",
        text: "Você realmente deseja cancelar o agendamento?",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: "Não",
        confirmButtonText: "Sim",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const payload = {
            situation: SituationScheduleEnum.CANCELADO.value,
          };
          await onUpdateSchedule(payload, rowData.id).then((data) => {
            if (data?.statusCode === 200 && data?.success) {
              Swal.fire({
                title: "Sucesso!",
                text: "Agendamento cancelado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
              }).then(()=>{
                setReloadRow(true)
              });
            } else {
              Swal.fire({
                title: "Erro!",
                text: "Ocorreu um problema ao cancelar o agendamento!",
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          });
        }
      });
  };
  let isCanceled = false;
  if (rowData?.situation === SituationScheduleEnum.CANCELADO.value) {
    isCanceled = true;
  } else {
    isCanceled = false;
  }

  return (
    <tr>
      <td heading={"Data"}>{formatedDate ? formatedDate : "-"}</td>
      <td heading={"startHour"}>
        {rowData?.startHour ? rowData.startHour : "-"}
      </td>
      <td heading={"Status"}>
        {rowData?.situation
          ? SituationScheduleEnum[rowData?.situation].label
          : "-"}
      </td>
      <td heading={"Endereço"}>
        <td>{rowData?.laundry?.address ? rowData?.laundry?.address : "-"}</td>
      </td>
      <td heading={"btn"}>
        <td>
            <Button
              disabled={isCanceled}
              onClick={(e) => onHandleCancelSchedule(e)}
              type="button"
              fullWidth
              color="blueGreenLight"
              style={{ height: 35, fontSize: 16, with: 10 }}
            >
              Cancelar
            </Button>
        </td>
      </td>
    </tr>
  );
}

export { Row };
