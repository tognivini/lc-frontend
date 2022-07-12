import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
  useState
} from 'react'
// import { useField } from '@unform/core'

import { AreaText, Container } from './styles'

import { Label } from '../Label'
import { colors } from '../../../common/types/IColors'
import { FlexRow } from '../FlexRow'
import ShowMaxLength from './ShowMaxLength'

const TextArea = ({
  children,
  label,
  name,
  hidden,
  noMargin,
  notNull,
  showMaxLength,
  maxLength,
  labelStyle,
  initialValue,
  ...props
}) => {
  const inputRef = useRef(null)
  const showMaxLengthRef = useRef(null)
  const valueLength = useRef(null)
  const [textLengthValue, setTextLengthValue] = useState(0)
  const textLength = useRef(0)
  // const { fieldName, registerField, error } = useField(name)

  const onSetValueLength = useCallback(value => {
    textLength.current = value
    setTextLengthValue(value)
  }, [])

  useImperativeHandle(valueLength, () => ({ onSetValueLength }))

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     path: 'value',
  //     ref: inputRef.current
  //   })
  // }, [fieldName, registerField])
  return (
    <div style={hidden ? { display: 'none' } : { width: '100%' }}>
      <FlexRow>
        {label && (
          <Label style={labelStyle}>
            {label}
            <span style={{ color: colors.red }}>{notNull ? ' *' : ''}</span>
          </Label>
        )}

        {maxLength && showMaxLength ? (
          <ShowMaxLength
            maxLength={Number(maxLength)}
            ref={showMaxLengthRef}
            initialValue={props.defaultValue}
          />
        ) : (
          <React.Fragment />
        )}
      </FlexRow>

      <div
        style={
          hidden
            ? { display: 'none' }
            : noMargin
            ? {
                position: 'relative',
                display: 'inline-block',
                marginBottom: 0,
                width: '100%'
              }
            : {
                position: 'relative',
                display: 'inline-block',
                marginBottom: 25,
                width: '100%'
              }
        }
      >
        <Container noMargin>
          {/* <AreaText
            error={Boolean(error) || textLengthValue > Number(maxLength)}
            ref={inputRef}
            {...props}
            onChange={event => {
              props.onChange && props.onChange(event)

              if (showMaxLengthRef.current) {
                showMaxLengthRef.current.onSetInputedLength(
                  event.target.value.length
                )
                valueLength.current.onSetValueLength(event.target.value.length)
              }
            }}
          /> */}
          {children}
        </Container>
        {/* {(error || textLengthValue > Number(maxLength)) && (
          <span
            style={{
              position: 'absolute',
              fontSize: 10,
              color: 'red',
              fontWeight: 500,
              fontFamily: 'Montserrat',
              bottom: -18,
              lineHeight: '20px'
            }}
          >
            {Boolean(error)
              ? error
              : textLengthValue > Number(maxLength) &&
                'Número máximo de caracteres excedido.'}
          </span>
        )} */}
      </div>
    </div>
  )
}

TextArea.defaultProps = {
  name: 'name',
  labelStyle: {}
}
export { TextArea }
