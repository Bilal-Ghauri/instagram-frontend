import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Bookmarks from './pages/Bookmarks'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import { Icon } from '@iconify/react'
import Cookies from 'js-cookie'
import UserPrivateRoute from './routes/private/UserPrivateRoute'
import { useGetUserQuery } from './store/api/userApi'
import { useDispatch } from 'react-redux'
import { addUser } from './store/slices/UserSlice'
import { useEffect, useMemo, useState } from 'react'
import { RootState } from './store/store'
import { useSelector } from 'react-redux'
import PostSkeletion from './components/reusable/PostSkeletion'
import { populateAllPosts } from './utils/utils'
import { addAllPosts, addExplorePosts } from './store/slices/PostSlice'
import axios from './config/axios'
import PostPage from './pages/PostPage'
import 'react-responsive-modal/styles.css'

const App = () => {
	const { user, token } = useSelector((state: RootState) => state.UserReducer)
	const { originalPostsArray } = useSelector(
		(state: RootState) => state.PostReducer
	)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()

	const getUserFromAPI = async () => {
		try {
			setLoading(true)
			const getUserRequest = await axios.get('/user/get/user')
			const getUserResponse = await getUserRequest.data
			dispatch(addUser(getUserResponse))
			// navigate(localStorage.getItem('userPath') || '/')
			navigate('/')
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (Cookies.get('UserToken') !== undefined) {
			getUserFromAPI()
		}
	}, [])

	// window.addEventListener('resize', () => {
	// 	console.log(window.innerWidth)

	// 	if (originalPostsArray.length > 0) {
	// 		const getResultantPosts = populateAllPosts(originalPostsArray)
	// 		dispatch(addAllPosts(getResultantPosts?.completeArray))
	// 		dispatch(addExplorePosts(getResultantPosts?.completeArray))
	// 	}
	// })

	useEffect(() => {
		const getResultantPosts = populateAllPosts(originalPostsArray)
		dispatch(addAllPosts(getResultantPosts?.completeArray))
		dispatch(addExplorePosts(getResultantPosts?.explorePosts))
	}, [originalPostsArray])

	useEffect(() => {
		if (location.pathname !== '/login') {
			localStorage.setItem('userPath', location.pathname)
		}
	}, [location.pathname])

	// useEffect(() => {
	// 	console.log(user)
	// }, [user, token])

	if (loading) {
		return (
			<div className='w-screen h-screen overflow-hidden flex items-center justify-center'>
				<img src='/loading.gif' alt='' />
			</div>
		)
	}
	return (
		<div
			className='App relative'
			style={{ width: '100vw', overflowX: 'hidden' }}>
			<Routes>
				<Route
					path='/'
					element={
						<UserPrivateRoute isLoading={loading}>
							<Home />
						</UserPrivateRoute>
					}>
					<Route
						path='/'
						element={
							<UserPrivateRoute isLoading={loading}>
								<Feed />
							</UserPrivateRoute>
						}
					/>
					<Route
						path='/explore'
						element={
							<UserPrivateRoute isLoading={loading}>
								<Explore />
							</UserPrivateRoute>
						}
					/>
					<Route
						path='/bookmarks'
						element={
							<UserPrivateRoute isLoading={loading}>
								<Bookmarks />
							</UserPrivateRoute>
						}
					/>
					<Route
						path='/settings'
						element={
							<UserPrivateRoute isLoading={loading}>
								<Settings />
							</UserPrivateRoute>
						}
					/>
					<Route
						path='/profile/:id'
						element={
							<UserPrivateRoute isLoading={loading}>
								<UserProfile />
							</UserPrivateRoute>
						}
					/>
					<Route
						path='/post/:postId'
						element={
							<UserPrivateRoute isLoading={loading}>
								<PostPage />
							</UserPrivateRoute>
						}
					/>
				</Route>
				{loading == false && (
					<Route path='/login' element={<Login />} />
				)}
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	)
}

export default App
