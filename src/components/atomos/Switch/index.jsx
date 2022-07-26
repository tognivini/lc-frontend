import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const SwitchComponent = ({ ...props }) => {
  const bolsistaType = {
    valueTrue: "Sim",
    valueFalse: "Não",
  };

  const statusType = {
    valueTrue: "Ativo",
    valueFalse: "Inativo",
  };
  const [usableLabel, setUsableLabel] = useState({});

  useEffect(() => {
    if (props?.customLabel === "bolsista") {
      setUsableLabel(bolsistaType);
    } else if (props?.customLabel === "status") {
      setUsableLabel(statusType);
    } else {
      setUsableLabel({});
    }
  }, []);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={props.value} onChange={props?.onChange} />}
        label={props.value ? usableLabel?.valueTrue : usableLabel?.valueFalse}
      />
    </FormGroup>
  );
};

export { SwitchComponent };
