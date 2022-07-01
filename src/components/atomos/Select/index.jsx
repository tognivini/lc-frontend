import React, { useRef, useEffect, useState } from "react";
import { Div, CloseIcon, ArrowForwardIcon } from "./styles";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { Label } from "../Label";
import { FlexRow } from "../FlexRow";

const Select = ({ value, initialValue, displayValue, label, ...props }) => {
  const [dropDown, setDropDown] = useState(false);
  const [option, setOption] = useState(
    initialValue ? initialValue[displayValue] : "Selecione..."
  );
  const [returnFormValue, setReturnFormValue] = useState(
    initialValue ? initialValue[value] : ""
  );

  const options = new Array(props.options ? props.options.lenght : 0);

  const error = null;
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialValue) {
      setOption(initialValue[displayValue]);
      setReturnFormValue(initialValue[value]);
    }
  }, [displayValue, initialValue, value]);

  const handleChange = async (e) => {
    props.onSelect(e);
  };

  if (props.options) {
    props.options.forEach((e) => {
      options.push(
        <div
          key={e[value]}
          style={option === e[displayValue] ? { fontWeight: "bold" } : {}}
          className="option"
          onClick={async () => {
            setReturnFormValue(e[value]);
            setOption(e[displayValue]);
            setDropDown(!dropDown);
            handleChange(e);
          }}
        >
          <span>{e[displayValue]}</span>
        </div>
      );
    });
  }

  return (
    <div style={props.hidden ? { display: "none" } : { width: "100%" }}>
      {label && <Label>{label}</Label>}

      <Div
        {...props}
        drop={dropDown}
        error={Boolean(error)}
        style={{ ...props.style }}
      >
        <div className="select-box">
          <div
            className={
              dropDown ? "options-container active" : "options-container"
            }
          >
            {dropDown ? (
              <ClickAwayListener onClickAway={() => setDropDown(false)}>
                <div className="options-list">{options}</div>
              </ClickAwayListener>
            ) : (
              <React.Fragment />
            )}
          </div>
          <input hidden value={returnFormValue} ref={inputRef}></input>

          <div className="selected">
            <FlexRow
              style={{
                width: "100%",
                justifyContent: "space-between",
                paddingRight: 8,
                paddingLeft: 8,
                minHeight: 35,
              }}
              onClick={() => setDropDown(!dropDown)}
            >
              <div style={{ width: "100%" }}>{option || "Selecione..."}</div>
              <ArrowForwardIcon
                className={dropDown ? "open clear-icon" : "close clear-icon"}
                // src={arrow}
                alt="teste"
              />
            </FlexRow>
            {returnFormValue && props.showClear ? (
              <CloseIcon
                alt="Lupa"
                style={{ cursor: "pointer", paddingRight: 8 }}
                onClick={() => {
                  setReturnFormValue(null);
                  setOption("");
                  handleChange({});
                  setDropDown(false);
                }}
                className="clear-icon"
              />
            ) : (
              <React.Fragment />
            )}
          </div>
        </div>
        {error && (
          <span
            style={{
              position: "absolute",
              lineHeight: "20px",
              fontSize: 10,
              color: "red",
              fontWeight: 500,
              fontFamily: "Montserrat",
            }}
          >
            {error}
          </span>
        )}
      </Div>
    </div>
  );
};

Select.defaultProps = {
  onSelect: (e) => e,
  style: {},
  showClear: true,
};

export { Select };
