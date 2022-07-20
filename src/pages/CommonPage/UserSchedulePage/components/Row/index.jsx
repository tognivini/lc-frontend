import { SituationScheduleEnum } from "../../../../../services/enums";
import { format,  } from "date-fns-tz";

function Row(props) {
  const { rowData } = props;

  const formatedDate = format(new Date(rowData?.date), "MM/dd/yyyy");

  return (
    <tr>
      <td heading={"Data"}>{formatedDate ? formatedDate : '-'}</td>
      <td heading={"startHour"}>
        {rowData?.startHour
          ? rowData.startHour
          : "-"}
      </td>
      <td heading={"Status"}>
        {rowData?.situation
          ? SituationScheduleEnum[rowData?.situation].label
          : "-"}
      </td>
      <td heading={"Endereço"}>
        <td>{rowData?.laundry?.address ? rowData?.laundry?.address : "-"}</td>
      </td>
    </tr>
  );
}

export { Row };
