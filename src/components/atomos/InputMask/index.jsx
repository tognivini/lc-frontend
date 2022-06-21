import React, { useState, useEffect, useCallback } from 'react'

import { InputDefault, InputCurrency, InputContainer } from './styles'

import * as remask from 'remask'

import { removeMask } from '../../../utils/removeMaks'

const CPF_MASK = '999.999.999-99'
const CNPJ_MASK = '99.999.999/9999-99'

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
  const [value, setValue] = useState(controlledValue)

  const onChange = useCallback(
    e => {
      setValue(e.target.value)

      onTextChange && onTextChange(e.target.value)
    },
    [onTextChange]
  )

  const setMaks = valueInputed => {
    const maskValue = {
      time: () => remask.mask(valueInputed, ['99:99']),
      cpf: () => remask.mask(valueInputed, [CPF_MASK]),
      cnpj: () => remask.mask(valueInputed, [CNPJ_MASK]),
      cnpjCpf: () => {
        if (remask.unMask(valueInputed).length <= 11) {
          return remask.mask(valueInputed, [CPF_MASK])
        } else {
          return remask.mask(valueInputed, [CNPJ_MASK])
        }
      },
      cellPhone: () =>
        remask.mask(removeMask(valueInputed), ['(99) 99999-9999']),
      phone: () => remask.mask(removeMask(valueInputed), ['(99) 9999-9999']),
      phoneNoDDD: () =>
        remask.mask(removeMask(valueInputed), ['9999-9999', '99999-9999']),
      DDD: () => remask.mask(removeMask(valueInputed), ['99', '999']),
      cep: () => remask.mask(removeMask(valueInputed), ['99999-999'])
    }

    return maskValue[mask] ? maskValue[mask]() : valueInputed
  }

  useEffect(() => {
    if (time) {
      if (value.substring(0, 1) > 3) {
        setValue(
          mask(0 + value.substring(0, 1) + value.substring(2, 5), ['99:99'])
        )
      } else {
        if (value.substring(0, 2) > 23) {
          setValue(mask(23 + value.substring(2, 5), ['99:99']))
        }
      }
      if (value.substring(3, 5) > 59) {
        setValue(mask(value.substring(0, 3) + 59, ['99:99']))
      }
    }
  }, [mask, time, value])

  useEffect(() => {
    setValue(controlledValue)
  }, [controlledValue, onChange])

  return (
    <InputContainer hidden={hidden} noMarginBottom={noMarginBottom}>
      {mask !== 'currency' &&
      mask !== 'celsius' &&
      mask !== 'kgm3' &&
      mask !== 'percent' &&
      mask !== 'volume' &&
      mask !== 'unidade' &&
      mask !== 'm3' &&
      mask !== 'inpm' &&
      mask !== 'currencyPerLiter' ? (
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
      ) : (
        <InputCurrency
          defaultValue={value}
          label={label}
          name={name}
          hidden={hidden}
          mask={mask}
          precision={precision}
          disabled={props.disabled}
          onTextChange={onTextChange}
          {...props}
        />
      )}
    </InputContainer>
  )
}

InputMask.defaultProps = {
  controlledValue: ''
}

export { InputMask }
