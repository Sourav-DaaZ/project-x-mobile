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
        userDetailsApi(param) {
            return axiosObj({
                url: API.noAuthUrls.userDetails + param,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
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
        getPostsApi(param) {
            return axiosObj({
                url: API.noAuthUrls.getPosts + param,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        tagListApi(param) {
            return axiosObj({
                url: API.noAuthUrls.tagList + param,
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
        myNotificationApi(param) {
            return axiosObj({
                url: API.noAuthUrls.myNotification + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        getReviewForOtherApi(param) {
            return axiosObj({
                url: API.noAuthUrls.getReviewForOther + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        bookingListForAllApi(param) {
            return axiosObj({
                url: API.noAuthUrls.bookingListForAll + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        refreshTokenCall(data) {
            return axiosObj({
                url: API.noAuthUrls.refreshToken,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        }
    }
}

export default OutsideAuthApi;