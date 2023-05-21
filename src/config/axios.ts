import axios from 'axios'
import Cookies from 'js-cookie'

export const baseURL = 'https://instagram-backend-ten.vercel.app'

const api = axios.create({
	baseURL,
})

api.interceptors.request.use((config) => {
	const token = Cookies.get('UserToken')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	if (config.method === 'post' && config.data instanceof FormData) {
		config.headers['Content-Type'] = 'multipart/form-data'
	}

	return config
})

export default api
