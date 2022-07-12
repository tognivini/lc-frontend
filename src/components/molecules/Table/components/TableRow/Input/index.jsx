// import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

import { InputComponent } from './styles'

function Input({ name, label }) {
  const inputRef = useRef(null)

  // const {
  //   fieldName,
  //   defaultValue,
  //   registerField,
  //   error,
  //   clearError
  // } = useField(name)

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     path: 'value',
  //     ref: inputRef.current,
  //     setValue: value => {}
  //   })
  // }, [fieldName, registerField])

  return <InputComponent ref={inputRef} type="text" label={label} name={name} />
}

export default Input
