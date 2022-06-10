import axiosObj from './axiosConfig';
import { API } from '../constants/apiConstant';
import { useSelector, shallowEqual } from 'react-redux';

const InsideAuthApi = (auth) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth.access_token
    };
    const formDataHeaders = {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + auth.access_token
    };
    return {
        createPost(data) {
            return axiosObj({
                url: API.authUrls.createPost,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: data,
            })
        },
    }
}

export default InsideAuthApi;