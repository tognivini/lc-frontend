import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../../pages/AuthPage/LoginPage";
import { RegisterPage } from "../../pages/AuthPage/RegisterPage";
import { routesType } from "../../resources/routesTypes";

const UnauthenticatedStacks = () => {
  return (
    <Routes>
      <Route
        path={routesType.ROOT}
        element={<Navigate to={routesType.AUTH_ROOT} replace />}
      />
      <Route path={routesType.AUTH_ROOT} element={<LoginPage />} />
      <Route
        path={routesType.AUTH_REGISTER}
        element={<RegisterPage />}
      />
    </Routes>
  );
};

export default UnauthenticatedStacks;
