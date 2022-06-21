import React from 'react'

import { DefaultButton } from './styles'

const Button = ({ children, ...props }) => {
  return (
    <DefaultButton {...props} small={false}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          heigth: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </DefaultButton>
  )
}

export { Button }
