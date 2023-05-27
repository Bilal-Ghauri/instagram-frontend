import axios from 'axios'
import Cookies from 'js-cookie'

export const baseURL = 'https://instagram-backend-ten.vercel.app'

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use((config) => {
	const token = Cookies.get('UserToken')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api
