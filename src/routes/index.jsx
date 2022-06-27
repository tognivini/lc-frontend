import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../pages/AuthPage/LoginPage";
import { RegisterPage } from "../pages/AuthPage/RegisterPage";
import { UserProfilePage } from "../pages/CommonPage/UserProfile";
import { routesType } from "../resources/routesTypes";
import Header from "./Header";

import { useAuth } from "../contexts/auth.context";

const ConfigRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route
              path={routesType.ROOT}
              element={<Navigate to={routesType.AUTH_ROOT} replace />}
            />
            <Route exact path={routesType.AUTH_ROOT} element={<LoginPage />} />
            <Route
              exact
              path={routesType.AUTH_REGISTER}
              element={<RegisterPage />}
            />

            {/* <Route
              exact
              path={routesType.USER_PROFILE}
              element={<UserProfilePage />}
            /> */}
            <Route
              exact
              path={routesType.USER_EDIT}
              element={<UserProfilePage />}
            />

            {!isAuthenticated ? (
              <Route
                path="*"
                element={<Navigate to={routesType.AUTH_ROOT} replace />}
              />
            ) : (
              <></>
            )}

            {/* <Route
              path="*"
              element={
                <Navigate
                  to={
                    isAuthenticated
                      ? routesType.USER_PROFILE
                      : routesType.AUTH_ROOT
                  }
                  replace
                />
              }
            /> */}
          </Routes>
        </main>
        {/* <footer>
          <Footer />
        </footer> */}
      </div>
    </Router>
  );
};

export { ConfigRoutes };
