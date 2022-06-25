const routes = {
  LOGIN: '/api/auth/login',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LIST_USERS: '/api/users',
  CREATE_USER: '/api/users',

  EDIT_PERMISSION_GROUP: '/api/permission-group',
  LIST_PERMISSION_GROUP: '/api/permission-group',
  GET_PERMISSION_GROUP: '/api/permission-group',
  CREATE_PERMISSION_GROUP: '/api/permission-group',
  DELETE_PERMISSION_GROUP: '/api/permission-group',

  LIST_PERMISSIONS: '/api/permissions',

  // Schedules
  LIST_SCHEDULES: '/api/schedules',
  CREATE_SCHEDULE: '/api/schedules',
  GET_NEXT_SCHEDULES: '/api/schedules/next-visits',
  EDIT_SCHEDULE: '/api/schedules',
  DELETE_SCHEDULE: '/api/schedules',
}

export { routes }
