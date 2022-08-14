import axios from 'axios';
import { API } from '../constants/apiConstant';
import validation from '../constants/validationMsg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxStore from '../store';
import { tokenUpdate } from '../store/actions';
const { dispatch } = ReduxStore;

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
      return Promise.reject(e);
    },
  );

  const interceptor = AxiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      if ((error.config && error.response && error.response.status === 401)) {
        const tokenData = JSON.parse(await AsyncStorage.getItem('token') || '{}');
        if (tokenData && tokenData.refresh_token) {
          AxiosInstance.interceptors.response.eject(interceptor);
          const data = { refresh_token: tokenData?.refresh_token ? tokenData.refresh_token : '' };
          return await axios.post(API.baseUrls[API.currentEnv] + API.noAuthUrls.refreshToken, data)
            .then(async response => {
              tokenData.access_token = response.data.data.access_token;
              await AsyncStorage.setItem('token', JSON.stringify(tokenData));
              error.response.config.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;
              return await axios(error.response.config)
                .then(fResponse => {
                  return fResponse.data
                })
                .catch(async error => {
                  await AsyncStorage.removeItem('token');
                  dispatch(tokenUpdate({
                    access_token: '',
                    refresh_token: ''
                  }))
                  return await Promise.reject({ message: validation.generaleError });
                });
            }).catch(async error => {
              await AsyncStorage.removeItem('token');
              dispatch(tokenUpdate({
                access_token: '',
                refresh_token: ''
              }))
              return await Promise.reject({ message: validation.generaleError });
            });
        } else {
          if (error?.response?.data) {
            return Promise.reject(error.response.data);
          } else {
            return Promise.reject(error);
          }
        }
      } else {
        if (error?.response?.data) {
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error);
        }

      }
    }
  );

  return AxiosInstance({ url, method, headers, data });
};

export default axiosObj;