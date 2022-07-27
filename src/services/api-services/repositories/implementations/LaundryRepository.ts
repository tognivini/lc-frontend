import { api } from "../../../axios";
import { routes } from "../../types/endpoints";

interface IUserInterface {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

interface ILaundryParams {
  address: string;
  cep: string;
  name: string;
  responsible: IUserInterface;
  status: boolean;
  washMachines: [];
}

async function onGetAllLaundrys(params: ILaundryParams) {
  try {
    return (await api.get(routes.LIST_ALL_LAUNDRY, { params })).data;
  } catch (error) {
    throw error;
  }
}

async function onGetAvailableLaundrys(params: ILaundryParams) {
  try {
    return (await api.get(routes.LIST_AVAILABLE_LAUNDRY, { params })).data;
  } catch (error) {
    throw error;
  }
}

const onCreateLaundry = (payload: ILaundryParams) => {
  return new Promise((resolve, reject) => {
    api
      .post(routes.CREATE_LAUNDRY, payload)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

const onUpdateLaundry = (payload: ILaundryParams, laundryId: string) => {
  return new Promise((resolve, reject) => {
    api
      .put(`${routes.UPDATE_LAUNDRY}/${laundryId}`, payload)
      .then((data: any) => {
        resolve(data?.data);
      })
      .catch(reject);
  });
};

export {
  onGetAllLaundrys,
  onGetAvailableLaundrys,
  onCreateLaundry,
  onUpdateLaundry
};
