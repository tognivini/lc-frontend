const routes = {
  LOGIN: '/api/auth/login',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LIST_USERS: '/api/user',
  CREATE_USER: '/api/user',
  EDIT_USER: '/api/user/update/',

  // Schedules
  LIST_SCHEDULES: '/api/schedules',
  CREATE_SCHEDULE: '/api/schedules',
  GET_NEXT_SCHEDULES: '/api/schedules/next-visits',
  EDIT_SCHEDULE: '/api/schedules',
  DELETE_SCHEDULE: '/api/schedules',
}

export { routes }
