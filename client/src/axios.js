import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:81/',
	withCredentials: true,
});

instance.interceptors.response.use(
	req => {
		return req;
	}, 
	async (err) => {
		const originalRequest = err.config;
		if((err.response.status === 401 || err.response.status === 403) && !originalRequest._retry){ //unauthorized
			originalRequest._retry = true;
			instance.baseURL = undefined;
			if(originalRequest.data) originalRequest.data = JSON.parse(originalRequest.data)
			//query for new refresh token
			await instance.post('/auth/refresh');
			return axios(originalRequest);
			
		}
		return Promise.reject(err);
	}
);

export default instance;
