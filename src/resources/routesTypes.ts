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
  LAUNDRY_EDIT = "/laundry/:id",
  
  BOLSISTA_AREA = "/bolsista-area",
}
