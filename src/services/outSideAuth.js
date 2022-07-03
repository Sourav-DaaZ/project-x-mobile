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
        registerUserApi(data) {
            return axiosObj({
                url: API.noAuthUrls.registerUser,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        userIdCheckApi(data) {
            return axiosObj({
                url: API.noAuthUrls.userIdCheck,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        categoryListApi() {
            return axiosObj({
                url: API.noAuthUrls.categoryList,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        searchPostApi(data) {
            return axiosObj({
                url: API.noAuthUrls.searchPost + '?search=' + data,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        getPostsApi(data) {
            return axiosObj({
                url: API.noAuthUrls.getPosts,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        tagListApi(lat, long, distance) {
            return axiosObj({
                url: API.noAuthUrls.tagList + `?lat=${lat}&&long=${long}${distance ? "&&distance=" + distance : ''}`,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        getPostDetailsApi(id) {
            return axiosObj({
                url: API.noAuthUrls.getPostDetails + `?post_id=${id}`,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        allUserApi(param) {
            return axiosObj({
                url: API.noAuthUrls.allUser + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        allUserApi(param) {
            return axiosObj({
                url: API.noAuthUrls.allUser + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        searchUserApi(param) {
            return axiosObj({
                url: API.noAuthUrls.searchUser + "?search=" + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        socialLoginApi(data) {
            return axiosObj({
                url: API.noAuthUrls.socialLogin,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        appConfigApi() {
            return axiosObj({
                url: API.noAuthUrls.appConfig,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
    }
}

export default OutsideAuthApi;