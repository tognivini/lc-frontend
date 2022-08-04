export enum routesType {
  AUTH_ROOT = "/auth/login",
  AUTH_REGISTER = "/auth/register",
  ROOT = "/",
  HOME = "/home",
  
  //user
  USER_LIST = "/user",
  USER_PROFILE = "/user/profile/:id",
  USER_EDIT = "/user/edit",
  
  //schedule
  SCHEDULE_LIST = "/schedule/",
  USER_SCHEDULE = "/schedule/user",
  SCHEDULE_EDIT = "/schedule/edit/:id",
  
  //laundry
  LAUNDRY_LIST = "/laundry",
  LAUNDRY_CREATE = "/laundry/create",
  LAUNDRY_EDIT = "/laundry/:id",

  WASH_MACHINE_BASE = "/wash-machine/edit",
  WASH_MACHINE_EDIT = "/wash-machine/edit/:id",
  
  BOLSISTA_AREA = "/bolsista-area",
}
