const routes = {
  LOGIN: '/api/auth/login',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LIST_USERS: '/api/user',
  CREATE_USER: '/api/user/create',
  EDIT_USER: '/api/user/update/',

  // Schedules
  LIST_SCHEDULES: '/api/schedule',
  CREATE_SCHEDULE: '/api/schedule/create',
  // GET_NEXT_SCHEDULES: '/api/schedules/next-visits',
  EDIT_SCHEDULE: '/api/schedule/:id',
  DELETE_SCHEDULE: '/api/schedule',

   // Laundry
   LIST_LAUNDRY: '/api/laundry',
   CREATE_LAUNDRY: '/api/laundry',
   GET_LAUNDRY: '/api/laundry',
   EDIT_LAUNDRY: '/api/laundry',
   DELETE_LAUNDRY: '/api/laundry',
}

export { routes }
