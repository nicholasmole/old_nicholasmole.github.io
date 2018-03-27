import axios from 'axios';

const api = ({route}) => {
	const token = window.localStorage.getItem('jwt');
	console.log(route);

	return axios
		.get(
			route,
			{headers: {
				Authorization: 'Bearer ' + token
			}}
		)
		.then(res => res.data);
};

export default api;
