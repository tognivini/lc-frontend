import { Link } from "react-router-dom";
import { routesType } from "../../resources/routesTypes";
import {
  Container
} from './styles'
const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <Container class="container">
        <ul className="nnavbar-nav">
          <li className="nav-item mx-3">
            <Link to={routesType.ROOT}>root (change)</Link>
          </li>
          <li className="nav-item mx-3">
            <Link to={routesType.HOME}>home</Link>
          </li>
          <li className="nav-item mx-3">
            <Link to={routesType.USER_EDIT}>edit profile</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Header;
