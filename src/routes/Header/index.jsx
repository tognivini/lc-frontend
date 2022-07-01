import { Link } from "react-router-dom";
import { routesType } from "../../resources/routesTypes";
import { Container, UlCustom, Li } from "./styles";
import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, onLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Container class="container">
        <UlCustom className="menu">
          {!isAuthenticated && (
            <Li className="nav-item mx-3">
              <Link to={routesType.AUTH_ROOT}>Login</Link>
            </Li>
          )}
          {!isAuthenticated && (
            <Li className="nav-item mx-3">
              <Link to={routesType.AUTH_REGISTER}>Registro</Link>
            </Li>
          )}

          {/* <Li className="nav-item mx-3">
            <Link to={routesType.HOME}>home</Link>
          </Li> */}
          {isAuthenticated && (
            <Li className="nav-item mx-3">
              <Link to={routesType.USER_EDIT}>Perfil</Link>
            </Li>
          )}

          {isAuthenticated && (
            <Li className="nav-item mx-3">
              <Link to={routesType.USER_SCHEDULE}>Agendamentos</Link>
            </Li>
          )}

          {isAuthenticated && (
            <Li className="nav-item mx-3">
              <span
                onClick={() => {
                  onLogout().then(() => {
                    console.log("then");
                    navigate(routesType.USER_EDIT);
                  });
                }}
              >
                Logout
              </span>
            </Li>
          )}
        </UlCustom>
      </Container>
    </nav>
  );
};

export default Header;
