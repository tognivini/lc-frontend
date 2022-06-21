import { useAuth } from '../../../contexts/auth.context'
import { Route, Redirect } from 'react-router-dom'
import { routesType } from '../../../resources/routesTypes'

const PrivateRoute = ({ component, ...props }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated)
    return (
      <Redirect
        to={{ pathname: routesType.AUTH_ROOT, state: props.location }}
      />
    )

  return <Route component={component} {...props} />
}

export { PrivateRoute }
