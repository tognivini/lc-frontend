import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { login } from "../services/api-services";
import { api } from "../services/axios";

import jwtDecode from "jwt-decode";
import { TypeUserEnum } from "../services/enums";

const AuthContext = createContext({
  user: null,
  token: null,
  onLogin: () => {},
  onLogout: () => {},
  isAuthenticated: false,
  onSetUserDat: () => {},
  refreshToken: null,
  setToken: () => {},
});

const AuthProvider = ({ children }) => {
  const USER_LOCAL_STORAGE = "@me/user";
  const TOKEN_LOCAL_STORAGE = "@me/token";
  // const REFRESH_TOKEN_LOCAL_STORAGE = '@me/refresh_token'

  const getUserType = (userData, _token) => {
    const decodedToken = jwtDecode(
      _token ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U"
    );

    return {
      ...userData,
      isAdmin: decodedToken.permissionType === TypeUserEnum.ADMIN,
    };
  };

  /**
   * recuperando localStorage
   */
  const _token = localStorage.getItem(TOKEN_LOCAL_STORAGE);
  // const _refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE)
  const _user = {
    ...JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE)),
    ...jwtDecode(
      localStorage.getItem("@me/token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsInNjb3BlcyI6W119.mmMcsFJgYHmgUeIe81IUZ0UjkXU8c3_R2jY9xmwwvxg"
    ),
  };

  /**
   * setando header da api
   */
  api.defaults.headers.Authorization = _token;
  // api.defaults.headers.refreshToken = _refreshToken

  const [user, setUser] = useState(getUserType(_user, _token));
  const [token, setToken] = useState(_token);
  // const [refreshToken, setRefreshToken] = useState(_refreshToken)

  const onSetTokens = useCallback((dto) => {
    setToken(dto.token);
    // setRefreshToken(dto.refreshToken)
    localStorage.setItem(TOKEN_LOCAL_STORAGE, dto.token);
    // localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE, dto.refreshToken)
  }, []);

  const populateLocalStorage = useCallback((dto) => {
    localStorage.setItem(
      USER_LOCAL_STORAGE,
      JSON.stringify({
        ...dto.user,
        isAdmin: undefined,
        permissionType: undefined,
        userId: undefined,
      })
    );
    localStorage.setItem(TOKEN_LOCAL_STORAGE, dto.token);
    // localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE, dto.refreshToken)
  }, []);

  const onLogout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    // setRefreshToken(null)
  }, []);

  const onSetUserData = useCallback((data) => {
    setUser(getUserType(data.user, data.token));
  }, []);

  const onLogin = useCallback(
    (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { token, error, ...rest } = await login({
            ...body,
          });

          if (!error) {
            populateLocalStorage({
              user: rest,
              token,
              // refreshToken
            });
            onSetUserData({
              user: rest,
              token,
              // refreshToken
            });
          }

          resolve({ error, ...rest });
        } catch (error) {
          reject(error);
        }
      });
    },
    [onSetUserData, populateLocalStorage]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        onLogin,
        onLogout,
        isAuthenticated: Boolean(_token),
        onSetUserData,
        // refreshToken,
        setToken: onSetTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
