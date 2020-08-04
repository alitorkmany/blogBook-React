import axios from 'axios';
import { getToken } from './userService'
import { toast } from 'react-toastify';

//we add token to all requests headers/ if no token nothing will be added.
axios.defaults.headers.common['x-auth-token'] = getToken();

//axios interceptors is fired when ever an error happens on our response from server.
axios.interceptors.response.use(null, error => { //we pass null to onfullfiled, error on rejected
    const expectedError =
    error.response && // if type of error is response not request
    error.response.status >= 400 &&
    error.response.status < 500;

    if(!expectedError){
        // here we sould log error
        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error); // we return a rejected promise with error
});

//exporting methods of axios
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
}