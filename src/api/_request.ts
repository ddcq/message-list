import axios from 'axios';

const API_URL = 'https://msglist.getsandbox.com:443';
const instance = axios.create({
	baseURL: API_URL,
});
instance.defaults.headers.common['Content-Type'] = 'application/json';

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default instance;
