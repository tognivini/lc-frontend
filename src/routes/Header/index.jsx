import { Link } from "react-router-dom";
import { routesType } from "../../resources/routesTypes";
import { Container, UlCustom, Li } from "./styles";
import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeUserEnum } from "../../services/enums";

const Header = () => {
  const { isAuthenticated, onLogout, user } = useAuth();

  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState();
  const [isBolsista, setIsBolsista] = useState();

  useEffect(() => {
    if (user) {
      if (user?.permissionType === TypeUserEnum.ADMIN) {
        setIsAdmin(true);
      } else if (user?.permissionType === TypeUserEnum.BOLSISTA) {
        setIsAdmin(false);
        setIsBolsista(true);
      } else {
        setIsAdmin(false);
        setIsBolsista(false);
      }
    } else {
      setIsAdmin(false);
      setIsBolsista(false);
    }
  }, [user]);

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
              <Link to={`${routesType.USER_EDIT}/${user?.userId}`}>Perfil</Link>
            </Li>
          )}

          {isAuthenticated && !isAdmin && (
            <Li className="nav-item mx-3">
              <Link to={routesType.USER_SCHEDULE}>Agendamentos</Link>
            </Li>
          )}

          {isAuthenticated && isAdmin && (
            <Li className="nav-item mx-3">
              <Link to={routesType.USER_LIST}>Usuários</Link>
            </Li>
          )}

          {isAuthenticated && isAdmin && (
            <Li className="nav-item mx-3">
              <Link to={routesType.LAUNDRY_LIST}>Lavanderias</Link>
            </Li>
          )}

          {isAuthenticated && (isBolsista || isAdmin) && (
            <Li className="nav-item mx-3">
              <Link to={routesType.BOLSISTA_AREA}>Área Bolsista</Link>
            </Li>
          )}

          {isAuthenticated && (
            <Li className="nav-item mx-3">
              <span
                onClick={() => {
                  onLogout().then(() => {
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
