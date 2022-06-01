import axiosObj from './axiosConfig';
import { API } from '../constants/apiConstant';

const OutsideAuthApi = () => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };
    const formDataHeaders = {
        "Content-Type": "multipart/form-data",
    };
    return {
        loginApi(data) {
            return axiosObj({
                url: API.noAuthUrls.login,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        verifyOtp(data) {
            return axiosObj({
                url: API.noAuthUrls.otpVerify,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        requestForChangePassword(data) {
            return axiosObj({
                url: API.noAuthUrls.requestForChangePassword,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
    }
}

export default OutsideAuthApi;