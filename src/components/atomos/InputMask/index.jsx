import React, { useState, useEffect, useCallback } from "react";

import { InputDefault, InputContainer } from "./styles";

import * as remask from "remask";

const CPF_MASK = "999.999.999-99";
const CNPJ_MASK = "99.999.999/9999-99";

const InputMask = ({
  mask,
  time,
  label,
  hidden,
  children,
  name,
  precision,
  controlledValue,
  onTextChange,
  noMarginBottom,
  ...props
}) => {
  const [value, setValue] = useState(controlledValue);

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value);

      onTextChange && onTextChange(e.target.value);
    },
    [onTextChange]
  );

  const removeMask = (text) => {
    return String(text).replace(/[^\d]+/g, "");
  };

  const setMaks = (valueInputed) => {
    const maskValue = {
      cpf: () => remask.mask(valueInputed, [CPF_MASK]),
      cnpj: () => remask.mask(valueInputed, [CNPJ_MASK]),
      cnpjCpf: () => {
        if (remask.unMask(valueInputed).length <= 11) {
          return remask.mask(valueInputed, [CPF_MASK]);
        } else {
          return remask.mask(valueInputed, [CNPJ_MASK]);
        }
      },
      cellPhone: () =>
        remask.mask(removeMask(valueInputed), ["(99) 99999-9999"]),
      phone: () => remask.mask(removeMask(valueInputed), ["(99) 9999-9999"]),
      phoneNoDDD: () =>
        remask.mask(removeMask(valueInputed), ["9999-9999", "99999-9999"]),
      DDD: () => remask.mask(removeMask(valueInputed), ["99", "999"]),
      cep: () => remask.mask(removeMask(valueInputed), ["99999-999"]),
    };

    return maskValue[mask] ? maskValue[mask]() : valueInputed;
  };

  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue, onChange]);

  return (
    <InputContainer hidden={hidden} noMarginBottom={noMarginBottom}>
      <InputDefault
        label={label}
        type="text"
        onChange={onChange}
        value={setMaks(value)}
        name={name}
        hidden={hidden}
        {...props}
      >
        {children}
      </InputDefault>
    </InputContainer>
  );
};

InputMask.defaultProps = {
  controlledValue: "",
};

export { InputMask };
