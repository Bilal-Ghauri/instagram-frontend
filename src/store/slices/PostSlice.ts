import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface IState {
	posts: null | Array<Object>
	originalPostsArray: null | Array<Object>
	explorePosts: null | Array<Object>
	bookmarks: null | Array<Object>
	singlePost: null | Object
}
const initialState: IState = {
	posts: [],
	originalPostsArray: [],
	explorePosts: [],
	bookmarks: [],
	// single post for post page
	singlePost: null,
}

const postSlice = createSlice({
	name: 'Post',
	initialState,
	reducers: {
		addOriginalPostsArray: (state, action) => {
			state.originalPostsArray = action.payload
		},
		addAllPosts: (state, action) => {
			state.posts = action.payload
		},
		addExplorePosts: (state, action) => {
			state.explorePosts = action.payload
		},
		addBookMarks: (state, action) => {
			state.bookmarks = action.payload
		},
		addSinglePost: (state, action) => {
			state.singlePost = action.payload
		},
		removeSinglePost: (state) => {
			state.singlePost = null
		},
	},
})

export const {
	addAllPosts,
	addExplorePosts,
	addOriginalPostsArray,
	addBookMarks,
	addSinglePost,
	removeSinglePost,
} = postSlice.actions
export default postSlice.reducer
