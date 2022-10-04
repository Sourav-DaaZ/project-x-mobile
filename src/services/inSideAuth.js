import axiosObj from './axiosConfig';
import { API } from '../constants/apiConstant';
import { getAccessToken } from '../utils';
import { apiEncryptionData } from '../utils';

const InsideAuthApi = (authStore) => {
    // const defaultHeaders = {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + authStore.access_token
    // };
    // const formDataHeaders = {
    //     "Content-Type": "multipart/form-data",
    //     "Authorization": "Bearer " + authStore.access_token
    // };
    return {
        async detailsApi() {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.details,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async updateDetailsApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updateDetails,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async createPost(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createPost,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async updatePost(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updatePost,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async createApplicationApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createApplication,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async updateApplicationApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updateApplication,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async getAllApplicationsApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getAllApplications + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getApplicationDetailsApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getApplicationDetails + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getMyPostApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getMyPost + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getReviewApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getReview + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async createReviewApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createReview,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async updateLocationApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updateLocation,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async addTagApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.addTag,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editTagApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editTag,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async saveTagApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.saveTag + varData,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
        async getSaveTagApi() {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.getSaveTag,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async bookingListApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.bookingList + varData,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async addBookingApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.addBooking,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editBookinggApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editBooking,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editReviewApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editReview,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async myChatListApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.myChatList + varData,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async createCategoryApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createCategory,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editCategoryApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editCategory,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async bannerAddApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.bannerAdd,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async bannerUpdateApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.bannerUpdate,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async changeUseridApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.changeUserid,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async bookingListForAllApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            let varData = apiEncryptionData(param, true)
            return axiosObj({
                url: API.authUrls.bookingListForAll + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async logout() {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.logout,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
    }
}

export default InsideAuthApi;