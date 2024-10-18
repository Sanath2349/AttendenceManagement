export const USER_ROLES = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    // HR: 'hr',
    DEFAULT: 'default_role'
  };
  
  export const ROLE_ROUTES = {
    [USER_ROLES.ADMIN]: '/admin-dashboard',
    [USER_ROLES.EMPLOYEE]: '/employee-dashboard',
    // [USER_ROLES.HR]: '/hr-dashboard',
    [USER_ROLES.DEFAULT]: '/employee-dashboard'
  };