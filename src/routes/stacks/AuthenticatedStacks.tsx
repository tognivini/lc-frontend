import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../../pages/AuthPage/LoginPage";
import { RegisterPage } from "../../pages/AuthPage/RegisterPage";
import { UserProfilePage } from "../../pages/CommonPage/UserProfile";
import { routesType } from "../../resources/routesTypes";

import { useAuth } from "../../contexts/auth.context";
import { UserSchedulePage } from "../../pages/CommonPage/UserSchedulePage";
import { ListLaundryPage } from "../../pages/CommonPage/ListLaundryPage";
import { ListUserPage } from "../../pages/CommonPage/UserList";
import { LaundryEditPage } from "../../pages/CommonPage/LaundryEditPage";
import { LaundryCreatePage } from "../../pages/CommonPage/LaundryCreatePage";
import { BolsistAreaPage } from "../../pages/CommonPage/BolsistAreaPage";
import { WashMachineEditPage } from "../../pages/CommonPage/WashMachineEditPage";

const AuthenticatedStacks = () => {
  return (
    <Routes>
      <Route
        path={`${routesType.USER_EDIT}/:id`}
        element={<UserProfilePage />}
      />
      <Route path={routesType.USER_SCHEDULE} element={<UserSchedulePage />} />

      <Route path={routesType.LAUNDRY_LIST} element={<ListLaundryPage />} />

      <Route path={routesType.USER_LIST} element={<ListUserPage />} />

      <Route path={routesType.LAUNDRY_CREATE} element={<LaundryCreatePage />} />

      <Route path={routesType.LAUNDRY_EDIT} element={<LaundryEditPage />} />

      <Route path={routesType.WASH_MACHINE_EDIT} element={<WashMachineEditPage />} />

      <Route path={routesType.BOLSISTA_AREA} element={<BolsistAreaPage />} />
    </Routes>
  );
};

export default AuthenticatedStacks;
