import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { IUser } from '../../types/User.types'

interface IState {
	user: IUser | null | any
	token: null | String | undefined
}

const initialState: IState = {
	user: null,
	token: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
		},
		addUser: (state, action) => {
			state.user = action.payload.user
			state.token = Cookies.get('UserToken')
		},
		removeUser: (state) => {
			state.user = null
			state.token = null
		},
		addSingleBookmarkPost: (state, action) => {
			state.user = {
				...state.user,
				bookmarks: [...state.user?.bookmarks, action.payload],
			}
		},
	},
})

export const { addUserData, addUser, removeUser, addSingleBookmarkPost } =
	userSlice.actions
export default userSlice.reducer
