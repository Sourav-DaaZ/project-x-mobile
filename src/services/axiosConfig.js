import axios from 'axios';
import { API } from '../constants/apiConstant';
import validation from '../constants/validationMsg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosObj = (info) => {
  const { url, method, headers, data } = info;
  const AxiosInstance = axios.create({
    baseURL: API.baseUrls[API.currentEnv],
    headers,
  });
  // AxiosInstance.defaults.timeout = 20000;


  AxiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (e) => {
      Promise.reject(e);
    },
  );

  const interceptor = AxiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      const tokenData = JSON.parse(await AsyncStorage.getItem('token') || "{}");
      if (!(error.config && error.response && error.response.status === 401 && tokenData && tokenData.refresh_token)) {
        return Promise.reject(error);
      } else {
        AxiosInstance.interceptors.response.eject(interceptor);
        const data = { refresh_token: tokenData?.refresh_token ? tokenData.refresh_token : '' };
        return axios.post(API.baseUrls[API.currentEnv] + API.noAuthUrls.refreshToken, data)
          .then(async response => {
            tokenData.access_token = response.data.data.access_token;
            await AsyncStorage.setItem('token', JSON.stringify(tokenData));
            error.response.config.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;
            return axios(error.response.config);
          }).catch(async error => {
            await AsyncStorage.removeItem('token');
            return Promise.reject({ message: validation.generaleError });
          });
      }
    }
  );

  return AxiosInstance({ url, method, headers, data });
};

export default axiosObj;