import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../store/store'

const UserPrivateRoute = ({ children, isLoading }: any) => {
	const { user, token } = useSelector((state: RootState) => state.UserReducer)

	if (isLoading) {
		return
	}

	if (user !== null && token !== null) {
		return children
	}
	return <Navigate to={'/login'} replace />
}

export default UserPrivateRoute
