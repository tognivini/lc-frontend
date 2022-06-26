import { Link } from "react-router-dom";
import { routesType } from "../../resources/routesTypes";

const Header= () => {
  return (
    <nav className="navbar">
        <ul className="navbar-items">
          <li className="navbar-items_item">
            <Link to={routesType.ROOT}>root (change)</Link>
          </li>
          <li className="navbar-items_item">
            <Link to={routesType.HOME}>home</Link>
          </li>
          <li className="navbar-items_item">
          <Link to={routesType.USER_EDIT}>edit profile</Link>
          </li>
        </ul>
      </nav>
  );
};

export default Header;