import React from 'react'

// import { Container } from './styles';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom'
import { authRoutes } from '../../routes/auth.routes'

const AuthLayout = ({ match, ...props }) => {
  const routes = authRoutes

  return (
    <Switch>
      {routes.map(({ path, component }, key) => (
        <Route
          key={key}
          exact
          path={`${match.path}/${path}`}
          component={component}
        />
      ))}
      <Redirect
        from="/auth"
        to={{ pathname: '/auth/login', state: { from: props.location.state } }}
      />
    </Switch>
  )
}

export { AuthLayout }
