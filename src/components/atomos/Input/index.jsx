import React, { useState, useRef, useEffect } from 'react'

import { mask } from 'remask'

import { InputDefault, PasswordEye, Container } from './styles'

import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded'

import { Label } from '../Label'

// import { useField } from '@unform/core'
import { colors } from '../../../common/types/IColors'
import { CircularProgress } from '@material-ui/core'
const Input = ({
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
  initialValue,
  upperCase,
  error,
  ...props
}) => {
  const [visibity, setVisibility] = useState(false)
  const [value, setValue] = useState(initialValue || '')

  const inputRef = useRef(null)

  const onChange = e => {
    setValue(mask(e.target.value, ['99:99']))
    if (props?.onChange && typeof props?.onChange == 'function') {
      props.onChange(e)
    }
  }

  return (
    <div style={hidden ? { display: 'none' } : { width: '100%' }}>
      {label && (
        <Label>
          {label}{' '}
          <span style={{ color: colors.red }}>{notNull ? ' *' : ''}</span>
        </Label>
      )}

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
        <Container className={upperCase ? 'all-upper-case' : ''}>
          {props?.time ? (
            <InputDefault
              autoComplete="off"
              type="text"
              ref={inputRef}
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
              ref={inputRef}
              error={Boolean(error)}
              maxLength={maxLength ? maxLength : ''}
              type={
                (props.password && !visibity) || (!props.password && visibity)
                  ? 'password'
                  : 'text'
              }
              $password={props.password}
              {...props}
              onChange={event => {
                const {
                  target: { value }
                } = event

                props.onTextChange && props.onTextChange(value)
                props.onChange && props.onChange(event)
              }}
            />
          )}
          {props.password ? (
            <PasswordEye
              onClick={() => setVisibility(!visibity)}
              error={Boolean(error)}
            >
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
              fontFamily: 'Montserrat'
            }}
          >
            {footer ? (
              <div style={{ marginTop: 8 }}>{footer}</div>
            ) : (
              <React.Fragment />
            )}
            {error ? (
              <span style={{ color: 'red', lineHeight: '20px' }}>{error}</span>
            ) : (
              <React.Fragment />
            )}
          </div>
        ) : (
          <React.Fragment />
        )}

      </div>
    </div>
  )
}

Input.defaultProps = {
  name: 'name'
}

export { Input }
