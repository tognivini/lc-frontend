import React from 'react'
import { useAuth } from '../../../contexts/auth.context'
import { Route, Redirect } from 'react-router-dom'
import { routesType } from '../../../resources/routesTypes'

import { intersection } from 'underscore'

const RoleRequiredRoute = ({ component, rolesRequired, ...props }) => {
  const {
    user: { scopes }
  } = useAuth()

  if (
    !intersection([...scopes], [...rolesRequired]).length &&
    rolesRequired.length
  ) {
    return <Redirect to={routesType.CRM_ROOT} />
  }

  return <Route component={component} {...props} />
}

RoleRequiredRoute.defaultProps = {
  rolesRequired: []
}

export { RoleRequiredRoute }
