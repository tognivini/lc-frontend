import { api } from "../../../axios";
import { routes } from "../../types/endpoints";

interface ILaundryInterface {
  id: string;
}

interface IWashMachineParams {
  model: string;
  number: string;
  inOpperation: boolean;
  laundry: {
    id: ILaundryInterface;
  };
}

const onGetWashMachine = (params: IWashMachineParams) => {
  return new Promise((resolve, reject) => {
    api
      .get(routes.GET_WASH_MACHINE, { params })
      .then(({ data }) => {
        resolve(data?.data);
      })
      .catch(reject);
  });
};

const onCreateWashMachine = (payload: IWashMachineParams) => {
  return new Promise((resolve, reject) => {
    api
      .post(routes.CREATE_WASH_MACHINE, payload)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

const onUpdateWashMachine = (
  payload: IWashMachineParams,
  washMachineId: string
) => {
  return new Promise((resolve, reject) => {
    api
      .put(`${routes.UPDATE_WASH_MACHINE}/${washMachineId}`, payload)
      .then((data: any) => {
        resolve(data);
      })
      .catch(reject);
  });
};

export { onGetWashMachine, onCreateWashMachine, onUpdateWashMachine };
