import Axios from 'axios';

const api = Axios.create({
	baseURL: "http://localhost:8080/api/v1",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});


export default api;
