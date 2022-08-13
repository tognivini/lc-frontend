import { api } from "../../../axios";
import { routes } from "../../types/endpoints";

interface IUserParams {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
  onlyAvailableResponsibles?: boolean
}

async function onGetAllUsers(params: IUserParams) {
  try {
    return (await api.get(routes.LIST_USERS, { params })).data;
  } catch (error) {
    throw error;
  }
}

async function onGetResponsibles(params: IUserParams) {
  try {
    return (await api.get(routes.LIST_RESPONSIBLES, { params })).data;
  } catch (error) {
    throw error;
  }
}

const onCreateUser = (payload: IUserParams) => {
  return new Promise((resolve, reject) => {
    api
      .post(routes.CREATE_USER, payload)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

const onUpdateUser = (payload: IUserParams, userId: string) => {
  return new Promise((resolve, reject) => {
    api
      .put(routes.EDIT_USER + userId, payload)
      .then((data: any) => {
        resolve(data?.data);
      })
      .catch(reject);
  });
};

export {
  onGetAllUsers,
  onGetResponsibles,
  onCreateUser,
  onUpdateUser,
};
