import React, { useState, useRef, useEffect } from 'react'

import { InputCurrency, DivInput, DivMask } from './styles'

import { Label } from '../../Label'

import { useField } from '@unform/core'

function Currency({ precision, ...props }) {
  const [value, setValue] = useState(props.defaultValue)

  const inputRef = useRef(null)

  const { fieldName, registerField, error, clearError } = useField(props.name)

  useEffect(() => {
    setValue(props.defaultValue)
  }, [props.defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [clearError, fieldName, registerField])

  const handleChange = (event, maskedvalue, floatvalue) => {
    setValue(maskedvalue)

    props.onTextChange && props.onTextChange(maskedvalue)
  }
  const inputMask = () => {
    const inputTypes = {
      currency: (
        <InputCurrency
          error={Boolean(error)}
          prefix="R$ "
          precision={precision || '4'}
          decimalSeparator=","
          thousandSeparator="."
          value={value}
          onChange={handleChange}
          allowEmpty={true}
          hidden={props.hidden}
          disabled={props.disabled}
          {...props}
          // error={Boolean(error)}
          // onFocus={clearError}
        />
      ),
      celsius: (
        <DivInput>
          <InputCurrency
            error={Boolean(error)}
            precision="1"
            decimalSeparator=","
            thousandSeparator=""
            value={value}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
            password
            // error={Boolean(error)}
            // onFocus={clearError}
          />
          <DivMask>°C</DivMask>
        </DivInput>
      ),
      kgm3: (
        <DivInput>
          <InputCurrency
            error={Boolean(error)}
            precision="1"
            decimalSeparator=","
            thousandSeparator=""
            value={value}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
            password
            // error={Boolean(error)}
            // onFocus={clearError}
          />
          <DivMask>Kg/m³</DivMask>
        </DivInput>
      ),
      percent: (
        <DivInput>
          <InputCurrency
            precision={precision || '1'}
            error={Boolean(error)}
            decimalSeparator=","
            thousandSeparator=""
            value={value}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
            password
            {...props}
            // error={Boolean(error)}
            // onFocus={clearError}
          />
          <DivMask>%</DivMask>
        </DivInput>
      ),
      inpm: (
        <DivInput>
          <InputCurrency
            error={Boolean(error)}
            precision="1"
            decimalSeparator=","
            thousandSeparator=""
            value={value}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
            password
            // error={Boolean(error)}
            // onFocus={clearError}
          />
          <DivMask>INPM</DivMask>
        </DivInput>
      ),
      volume: (
        <DivInput>
          <InputCurrency
            error={Boolean(error)}
            precision={precision || '4'}
            decimalSeparator=","
            thousandSeparator=""
            value={value}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
            password
            // error={Boolean(error)}
            // onFocus={clearError}
          />
          <DivMask>m³</DivMask>
        </DivInput>
      ),
      unidade: (
        <InputCurrency
          precision={precision || '0'}
          decimalSeparator=","
          thousandSeparator="."
          value={value}
          onChange={handleChange}
          allowEmpty={true}
          hidden={props.hidden}
          disabled={props.disabled}
          {...props}
          // error={Boolean(error)}
          // onFocus={clearError}
        />
      ),
      m3: (
        <DivInput>
          <InputCurrency
            error={Boolean(error)}
            precision={precision || '0'}
            decimalSeparator=","
            thousandSeparator="."
            value={value}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
            password
            {...props}
            // error={Boolean(error)}
            // onFocus={clearError}
          />
          <DivMask>m³</DivMask>
        </DivInput>
      ),
      currencyPerLiter: (
        <DivInput>
          <InputCurrency
            error={Boolean(error)}
            precision={precision || '5'}
            decimalSeparator=","
            thousandSeparator="."
            value={value ? value : null}
            onChange={handleChange}
            allowEmpty={true}
            hidden={props.hidden}
            disabled={props.disabled}
          />
        </DivInput>
      )
    }
    // if (props.mask === 'currency') {
    //   return (
    //     <InputCurrency
    //       error={Boolean(error)}
    //       prefix="R$ "
    //       precision={precision || '4'}
    //       decimalSeparator=","
    //       thousandSeparator="."
    //       value={value}
    //       onChange={handleChange}
    //       allowEmpty={true}
    //       hidden={props.hidden}
    //       disabled={props.disabled}
    //       {...props}
    //       // error={Boolean(error)}
    //       // onFocus={clearError}
    //     />
    //   )
    // } else if (props.mask === 'celsius') {
    //   return (
    //     <DivInput>
    //       <InputCurrency
    //         error={Boolean(error)}
    //         precision="1"
    //         decimalSeparator=","
    //         thousandSeparator=""
    //         value={value}
    //         onChange={handleChange}
    //         allowEmpty={true}
    //         hidden={props.hidden}
    //         disabled={props.disabled}
    //         password
    //         // error={Boolean(error)}
    //         // onFocus={clearError}
    //       />
    //       <DivMask>°C</DivMask>
    //     </DivInput>
    //   )
    // } else if (props.mask === 'kgm3') {
    //   return (
    //     <DivInput>
    //       <InputCurrency
    //         error={Boolean(error)}
    //         precision="1"
    //         decimalSeparator=","
    //         thousandSeparator=""
    //         value={value}
    //         onChange={handleChange}
    //         allowEmpty={true}
    //         hidden={props.hidden}
    //         disabled={props.disabled}
    //         password
    //         // error={Boolean(error)}
    //         // onFocus={clearError}
    //       />
    //       <DivMask>Kg/m³</DivMask>
    //     </DivInput>
    //   )
    // } else if (props.mask === 'percent') {
    //   return (
    //     <DivInput>
    //       <InputCurrency
    //         precision={precision || '1'}
    //         error={Boolean(error)}
    //         decimalSeparator=","
    //         thousandSeparator=""
    //         value={value}
    //         onChange={handleChange}
    //         allowEmpty={true}
    //         hidden={props.hidden}
    //         disabled={props.disabled}
    //         password
    //         {...props}
    //         // error={Boolean(error)}
    //         // onFocus={clearError}
    //       />
    //       <DivMask>%</DivMask>
    //     </DivInput>
    //   )
    // } else if (props.mask === 'inpm') {
    //   return (
    //     <DivInput>
    //       <InputCurrency
    //         error={Boolean(error)}
    //         precision="1"
    //         decimalSeparator=","
    //         thousandSeparator=""
    //         value={value}
    //         onChange={handleChange}
    //         allowEmpty={true}
    //         hidden={props.hidden}
    //         disabled={props.disabled}
    //         password
    //         // error={Boolean(error)}
    //         // onFocus={clearError}
    //       />
    //       <DivMask>INPM</DivMask>
    //     </DivInput>
    //   )
    // } else if (props.mask === 'volume') {
    //   return (
    //     <DivInput>
    //       <InputCurrency
    //         error={Boolean(error)}
    //         precision="4"
    //         decimalSeparator=","
    //         thousandSeparator=""
    //         value={value}
    //         onChange={handleChange}
    //         allowEmpty={true}
    //         hidden={props.hidden}
    //         disabled={props.disabled}
    //         password
    //         // error={Boolean(error)}
    //         // onFocus={clearError}
    //       />
    //       <DivMask>m³</DivMask>
    //     </DivInput>
    //   )
    // } else if (props.mask === 'unidade') {
    //   return (
    //     <InputCurrency
    //       precision={precision || '0'}
    //       decimalSeparator=","
    //       thousandSeparator="."
    //       value={value}
    //       onChange={handleChange}
    //       allowEmpty={true}
    //       hidden={props.hidden}
    //       disabled={props.disabled}
    //       {...props}
    //       // error={Boolean(error)}
    //       // onFocus={clearError}
    //     />
    //   )
    // }

    return (
      inputTypes[props.mask] || <span>A máscara {props.mask} não é válida</span>
    )
  }
  return (
    <div>
      {props.label && <Label>{props.label}</Label>}
      <React.Fragment>{inputMask()}</React.Fragment>
      <input hidden name={props.name} value={value} ref={inputRef} />
      {error && (
        <span
          style={{
            position: 'absolute',
            fontSize: 10,
            color: 'red',
            fontWeight: 500,
            fontFamily: 'Montserrat'
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}

export { Currency }
