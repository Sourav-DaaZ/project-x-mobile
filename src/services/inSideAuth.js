import axiosObj from './axiosConfig';
import { API } from '../constants/apiConstant';
import { getAccessToken } from '../utils';

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
            return axiosObj({
                url: API.authUrls.updateDetails,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async createPost(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.createPost,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        async updatePost(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.updatePost,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        async createApplicationApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.createApplication,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        async updateApplicationApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.updateApplication,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        async getAllApplicationsApi(id) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.getAllApplications + id,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getApplicationDetailsApi(id) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.getApplicationDetails + "?application_id=" + id,
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
            return axiosObj({
                url: API.authUrls.getMyPost + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getReviewApi() {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.getReview,
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
            return axiosObj({
                url: API.authUrls.createReview,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async updateLocationApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.updateLocation,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async addTagApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.addTag,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async tagActionApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.tagAction + param,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
        async editTagApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.editTag,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async bookingListApi(param) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.bookingList + param,
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
            return axiosObj({
                url: API.authUrls.addBooking,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async editBookinggApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.editBooking,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        async editReviewApi(data) {
            const token = await getAccessToken();
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token?.access_token
            };
            return axiosObj({
                url: API.authUrls.editReview,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
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