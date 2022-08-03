import axiosObj from './axiosConfig';
import { API } from '../constants/apiConstant';

const InsideAuthApi = (authStore) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authStore.access_token
    };
    const formDataHeaders = {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + authStore.access_token
    };
    return {
        detailsApi() {
            return axiosObj({
                url: API.authUrls.details,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        updateDetailsApi(data) {
            return axiosObj({
                url: API.authUrls.updateDetails,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        createPost(data) {
            return axiosObj({
                url: API.authUrls.createPost,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        updatePost(data) {
            return axiosObj({
                url: API.authUrls.updatePost,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        createApplicationApi(data) {
            return axiosObj({
                url: API.authUrls.createApplication,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        updateApplicationApi(data) {
            return axiosObj({
                url: API.authUrls.updateApplication,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
        getAllApplicationsApi(id) {
            return axiosObj({
                url: API.authUrls.getAllApplications + id,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        getApplicationDetailsApi(id) {
            return axiosObj({
                url: API.authUrls.getApplicationDetails + "?application_id=" + id,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        getMyPostApi(param) {
            return axiosObj({
                url: API.authUrls.getMyPost + param,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        getReviewApi() {
            return axiosObj({
                url: API.authUrls.getReview,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        createReviewApi(data) {
            return axiosObj({
                url: API.authUrls.createReview,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        updateLocationApi(data) {
            return axiosObj({
                url: API.authUrls.updateLocation,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        addTagApi(data) {
            return axiosObj({
                url: API.authUrls.addTag,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        tagActionApi(param) {
            return axiosObj({
                url: API.authUrls.tagAction + param,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
        editTagApi(data) {
            return axiosObj({
                url: API.authUrls.editTag,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        bookingListApi(param) {
            return axiosObj({
                url: API.authUrls.bookingList + param,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        addBookingApi(data) {
            return axiosObj({
                url: API.authUrls.addBooking,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        editBookinggApi(data) {
            return axiosObj({
                url: API.authUrls.editBooking,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        editReviewApi(data) {
            return axiosObj({
                url: API.authUrls.editReview,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: data
            })
        },
        logout() {
            return axiosObj({
                url: API.authUrls.logout,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
    }
}

export default InsideAuthApi;