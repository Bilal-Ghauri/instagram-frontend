import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import Cookies from 'js-cookie'

const UserPrivateRoute = ({ children, isLoading }: any) => {
	const { user, token } = useSelector((state: RootState) => state.UserReducer)

	const userToken = Cookies.get('UserToken')
	if (isLoading) {
		return
	}

	if (userToken) {
		return children
	}
	return <Navigate to={'/login'} replace />
}

export default UserPrivateRoute
