import React from 'react'

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
// import { CRMLayout } from '../layouts/CRMLayout'
import { routesType } from '../resources/routesTypes'
import { PrivateRoute } from './modules/PrivateRoute'
// import { useAuth } from '../contexts/auth.context'
import JwtContextProvider from '../contexts/jwt.context'

const Routes = () => {
//   const { isAuthenticated, user } = useAuth()
console.log('start? route')
  return (
    <HashRouter>
      <Switch>
          <Route path={routesType.AUTH_ROOT} component={AuthLayout} />
        {/* 
         {!isAuthenticated && (
          <Route path={routesType.AUTH_ROOT} component={AuthLayout} />
        )}
        */}

        <PrivateRoute
          path={routesType.ROOT}
          component={props => (
            <JwtContextProvider>
              {/* <CRMLayout {...props} /> */}
            </JwtContextProvider>
          )}
        />

        {/* <Redirect
          from=""
          to={isAuthenticated ? routesType.ROOT : routesType.AUTH_ROOT}
        /> */}
      </Switch>
    </HashRouter>
  )
}

export { Routes }
