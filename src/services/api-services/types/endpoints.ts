const routes = {
  LOGIN: '/api/auth/login',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LIST_USERS: '/api/user',
  LIST_RESPONSIBLES: '/api/user/responsibles',
  CREATE_USER: '/api/user/create',
  EDIT_USER: '/api/user/update/',

  // Schedules
  LIST_SCHEDULES: '/api/schedule',
  CREATE_SCHEDULE: '/api/schedule/create',
  CHECK_AVAILABLE_HOURS: '/api/schedule/get-available-hours',
  EDIT_SCHEDULE: '/api/schedule/update',
  DELETE_SCHEDULE: '/api/schedule',

   // Laundry
   LIST_ALL_LAUNDRY: '/api/laundry',
   LIST_AVAILABLE_LAUNDRY: '/api/laundry/get-available',
   CREATE_LAUNDRY: '/api/laundry/create',
   UPDATE_LAUNDRY: '/api/laundry/update',
   GET_LAUNDRY: '/api/laundry',
   EDIT_LAUNDRY: '/api/laundry',
   DELETE_LAUNDRY: '/api/laundry',

   // WashMachine
   GET_WASH_MACHINE: '/api/wash-machine',
   CREATE_WASH_MACHINE: '/api/wash-machine/create',
   UPDATE_WASH_MACHINE: '/api/wash-machine/update',
}

export { routes }
