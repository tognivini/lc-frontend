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
  name: string;
  responsible: IUserInterface;
  status: boolean;
  washMachines: [];
}

//mudar
async function onGetAllNextSchedules(params: ILaundryParams) {
  try {
    return (await api.get(routes.LIST_SCHEDULES, { params })).data;
  } catch (error) {
    throw error;
  }
}

// const onCreateUser = (payload: ILaundryParams) => {
//   return new Promise((resolve, reject) => {
//     api
//       .post(routes.CREATE_USER, payload)
//       .then(({ data }) => {
//         resolve(data);
//       })
//       .catch(reject);
//   });
// };

// const onUpdateUser = (payload: ILaundryParams, userId: string) => {
//   return new Promise((resolve, reject) => {
//     api
//       .put(routes.EDIT_USER + userId, payload)
//       .then((data: any) => {
//         resolve(data?.data);
//       })
//       .catch(reject);
//   });
// };

export {
  onGetAllNextSchedules,
  // onUpdateProfile
};