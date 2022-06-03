export const API = {
  currentEnv: 'dev',
  baseUrls: {
    dev: 'http://192.168.0.105:5000/api',
    qa: '',
    uat: '',
    prod: '',
  },
  noAuthUrls: {
    login: '/login',
    otpVerify: '/user_varification',
    requestForChangePassword: '/request_for_change_password',
    userIdCheck: '/user_id_check',
    registerUser: '/register_user',
  },
  authUrls: {
    // add the new api urls here which are inside the authentication
  },
};
