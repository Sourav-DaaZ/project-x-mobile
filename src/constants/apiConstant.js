export const API = {
  baseUrls: {
    dev: 'https://project-xx-client.herokuapp.com/api',
    qa: '',
    uat: '',
    prod: '',
  },
  noAuthUrls: {
    login: '/login',
    otp: '/user_varification',
    register: 'register_user',
    userIdCheck: 'user_id_check',
    requestToChangePassword: 'request_for_change_password',
  },
  authUrls: {
    // add the new api urls here which are inside the authentication
  },
};
