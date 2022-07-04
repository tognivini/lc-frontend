import { useState, useEffect } from "react";

import { Container, Items } from "./styles";
import { MiniCalendar } from "../MiniCalendar";
import { format } from "date-fns";
import { ClickAwayListener } from "@material-ui/core";
import { Label } from "../Label";
import * as remask from "remask";

import TodayIcon from "@material-ui/icons/Today";
import { colors } from "../../../common/types/IColors";
import { UnconnectedInput } from "../UnconnectedInput";

const DateInput = ({
  name,
  value,
  setValue,
  label,
  getTime,
  readOnly,
  ...props
}) => {
  const dateRegex =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const [showItems, toggleShowItems] = useState(false);
  // const [value, setValue] = useState(
  //   props.initialValue ? props.initialValue : null
  // )

  const [returnValue, setReturnForm] = useState(
    props.initialValue ? props.initialValue : null
  );

  const onShowItems = (value) => toggleShowItems(value);

  const onSetInputValue = (value) => {
    setValue(value);
    onShowItems(false);
  };

  useEffect(() => {
    if (props.initialValue) {
      setValue(props.initialValue);
      // setReturnForm(props.initialValue);
    }
  }, [props.initialValue]);

  return (
    <ClickAwayListener onClickAway={() => onShowItems(false)}>
      <Container>
        {label && <Label>{label}</Label>}

        <div
          style={{
            position: "relative",
          }}
        >
          <UnconnectedInput
            {...props}
            placeholder="dd/mm/aaaa"
            onChange={({ target: { value } }) => {
              const dateMask = remask.mask(value, ["99/99/9999"]);

              onSetInputValue(dateMask);

              // if (dateMask.length === "dd/mm/yyyy".length) {
              //   if (dateRegex.test(dateMask)) {
              //     setReturnForm(dateMask);
              //   }
              // } else {
              //   setReturnForm(null);
              // }
            }}
            value={value ? value : ""}
            name="dateRoot"
            maxLength={"99/99/9999".length}
            readOnly={readOnly}
            // error={error}
            // style={error ? { borderColor: 'red' } : {}}
          ></UnconnectedInput>

          <TodayIcon
            style={{
              position: "absolute",
              right: 0,
              margin: 8,
              cursor: !readOnly ? "pointer" : "default",
              color: readOnly ? "#595959" : colors.red,
            }}
            onClick={() => (!readOnly ? onShowItems(true) : undefined)}
          />
        </div>

        {showItems && (
          <Items>
            <MiniCalendar
              className="mini-calendar"
              fullWidth
              view="month"
              selectRange={false}
              onChange={(date) => {
                // setReturnForm(date);
                onSetInputValue(format(date, "dd/MM/yyyy"));
              }}
            />
          </Items>
        )}
      </Container>
    </ClickAwayListener>
  );
};

DateInput.defaultProps = {
  getTime: true,
};

export { DateInput };
