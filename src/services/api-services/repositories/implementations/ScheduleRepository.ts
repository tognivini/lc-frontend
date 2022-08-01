import { api } from "../../../axios";
import { routes } from "../../types/endpoints";

interface IUserInterface {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

interface ILaundryInterface {
  address: string;
  name: string;
  responsible: IUserInterface;
  status: boolean;
  washMachines: [];
}

interface IWashMachineInterface {}

interface IScheduleParams {
  laundry: ILaundryInterface;
  client: IUserInterface;
  responsible: IUserInterface;
  washMachine: IWashMachineInterface;
  startHour: string;
  endHour: string;
  date: Date;
}

const onGetAllSchedules = async (params: IScheduleParams) => {
  try {
    return (await api.get(routes.LIST_SCHEDULES, { params })).data;
  } catch (error) {
    throw error;
  }
};

const onCreateSchedule = (payload: IScheduleParams) => {
  return new Promise((resolve, reject) => {
    api
      .post(routes.CREATE_SCHEDULE, payload)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

const onGetAvailableHours = async (payload: IScheduleParams) => {
  return new Promise((resolve, reject) => {
    api
      .post(routes.CHECK_AVAILABLE_HOURS, payload)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

const onUpdateSchedule = (payload: IScheduleParams, scheduleId: string) => {
  return new Promise((resolve, reject) => {
    api
      .put(`${routes.EDIT_SCHEDULE}/${scheduleId}`, payload)
      .then((data: any) => {
        resolve(data?.data);
      })
      .catch(reject);
  });
};

export { onGetAllSchedules, onCreateSchedule, onGetAvailableHours, onUpdateSchedule };
