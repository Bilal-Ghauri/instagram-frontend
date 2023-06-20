import axios from 'axios'
import Cookies from 'js-cookie'

export const baseURL = import.meta.env.VITE_APP_API_URL as string

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
