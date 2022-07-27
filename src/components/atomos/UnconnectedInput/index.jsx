import React, { useState, useRef, useEffect } from 'react'

import { mask, unMask } from 'remask'

import { InputDefault, PasswordEye, Container } from './styles'

import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded'

import { Label } from '../Label'

import { colors } from '../../../common/types/IColors'
import { CircularProgress } from '@material-ui/core'
const UnconnectedInput = ({
  children,
  hidden,
  name,
  label,
  noMargin,
  maxLength,
  marginError,
  readOnly,
  notNull,
  isLoading,
  footer,
  error,
  ...props
}) => {
  const [visibity, setVisibility] = useState(false)
  const [value, setValue] = useState('')

  const onChange = e => {
    setValue(mask(e.target.value, ['99:99']))
  }

  useEffect(() => {
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
  }, [value])

  return (
    <div
      style={
        hidden
          ? { display: 'none' }
          : noMargin
          ? {
              position: 'relative',
              display: 'inline-block',
              marginBottom: marginError ? marginError : 0,
              width: '100%'
            }
          : {
              position: 'relative',
              display: 'inline-block',
              marginBottom: marginError ? marginError : 25,
              width: '100%'
            }
      }
    >
      {label && (
        <Label>
          {label}{' '}
          <span style={{ color: colors.red }}>{notNull ? ' *' : ''}</span>
        </Label>
      )}
      <Container>
        {props.time ? (
          <InputDefault
            autoComplete="off"
            type="text"
            onChange={onChange}
            value={value}
            error={Boolean(error)}
            hidden={hidden}
            readOnly={readOnly}
            {...props}
          />
        ) : (
          <InputDefault
            readOnly={readOnly}
            autoComplete="off"
            error={Boolean(error)}
            maxLength={maxLength ? maxLength : ''}
            type={
              (props.password && !visibity) || (!props.password && visibity)
                ? 'password'
                : 'text'
            }
            $password={props.password}
            {...props}
          />
        )}
        {props.password ? (
          <PasswordEye onClick={() => setVisibility(!visibity)}>
            {visibity ? (
              <VisibilityRoundedIcon />
            ) : (
              <VisibilityOffRoundedIcon />
            )}
          </PasswordEye>
        ) : null}
        {children}

        {isLoading && !error ? (
          <div
            style={{
              position: 'absolute',

              right: 10,
              top: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress color="inherit" size={22} />
          </div>
        ) : (
          <React.Fragment />
        )}
      </Container>

      {error || footer ? (
        <div
          style={{
            position: 'absolute',
            fontSize: 10,
            fontWeight: 500,
            fontFamily: 'Montserrat',
            lineHeight: '20px'
          }}
        >
          {footer ? (
            <div style={{ marginTop: 8 }}>{footer}</div>
          ) : (
            <React.Fragment />
          )}
          {error ? (
            <span style={{ color: 'red' }}>{error}</span>
          ) : (
            <React.Fragment />
          )}
        </div>
      ) : (
        <React.Fragment />
      )}

      {/* {error || footer ? (

      ) : (
        <React.Fragment />
      )} */}
    </div>
  )
}

UnconnectedInput.defaultProps = {
  name: 'name'
}

export { UnconnectedInput }
