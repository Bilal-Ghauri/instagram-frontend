import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import AppBar from '../components/reusable/AppBar'
import Post from '../components/reusable/Post'
import axios from '.././config/axios'
import { useParams, useNavigate } from 'react-router-dom'
import SettingsSkeleton from './SettingsSkeleton'
import { IUser } from '../types/User.types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { addUser } from '../store/slices/UserSlice'

const UserProfile = () => {
	const { id } = useParams()
	const dispatch = useDispatch()

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [followLoading, setFollowLoading] = useState(false)
	const [singleUserPosts, setSingleUserPosts] = useState([])

	const [data, setData] = useState<null | IUser>(null)
	const { user } = useSelector((state: RootState) => state.UserReducer)

	const navigate = useNavigate()

	window.addEventListener('resize', () => {
		windowResizerFunction()
	})

	const getSingleUser = async () => {
		try {
			setLoading(true)
			const apiRequest = await axios.get(`/user/get/user/${id}`)
			const apiData = await apiRequest.data
			setData(apiData.user)

			let sortedArray = apiData?.user?.posts?.sort(function (a, b) {
				return new Date(b.createdAt) - new Date(a.createdAt)
			})

			setSingleUserPosts(sortedArray)

			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			if (error.response.status == 500) {
				setError('Internal Server Error')
			}
			if (error.response.status == 403) {
				setError(error.response.data.msg)
			}
		}
	}

	const changeFollowButtonName = () => {
		if (user?._id == id) {
			return 'Update'
		} else {
			let userExist = user?.following.find(
				(user) => user._id == data?._id
			)
			if (userExist) {
				return 'Unfollow'
			} else {
				return 'Follow'
			}
		}
	}

	const handleFollowUser = async () => {
		if (user?._id == id) {
			return navigate('/settings')
		}

		try {
			setFollowLoading(true)
			let findUser = user?.following?.find(
				(singleUser) => singleUser._id == data?._id
			)
			if (findUser) {
				await axios.post('/user/unfollow/user', {
					followId: data?._id,
				})
			} else {
				await axios.post('/user/follow/user', {
					followId: data?._id,
				})
			}

			const getUserRequest = await axios.get('/user/get/user')
			const getUserResponse = await getUserRequest.data
			dispatch(addUser(getUserResponse))
			setFollowLoading(false)
		} catch (error) {
			setFollowLoading(false)
			console.log(error)
		}
	}

	useEffect(() => {
		getSingleUser()
	}, [])

	useEffect(() => {
		getSingleUser()
		changeFollowButtonName()
	}, [id])

	return (
		<div className='pb-5  '>
			<AppBar />
			{loading ? (
				<SettingsSkeleton />
			) : error ? (
				<div className='w-1/2 mx-auto p-4 bg-gray-300 text-center mt-10'>
					{error}
				</div>
			) : (
				<div>
					<div className='h-48 md:h-72 bg-gray-200 rounded-xl  relative'>
						<img
							src={
								data?.coverPicture == ''
									? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEXT09OdeqMBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII='
									: data?.coverPicture
							}
							className={`${
								data?.coverPicture == ''
									? 'object-fill'
									: 'object-contain'
							}  rounded-xl h-full w-full`}
							alt=''
						/>
						<div className='flex  w-full  absolute md:bottom-[-63px]  bottom-[-45px] pl-2 sm:pl-4 items-center '>
							<div className='relative'>
								<img
									src={
										data?.profilePicture == ''
											? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXH0iM58q-QakVgcQO-IGB05iAJBkEeh6KQ&usqp=CAU'
											: data?.profilePicture
									}
									alt=''
									className='rounded-full md:h-28 md:w-28 h-20 w-20 outline-1 '
									style={{ border: '3px solid white' }}
								/>
							</div>
							<input
								type='text'
								className=' text-2xl border-b-2 pb-1 md:text-4xl ml-2 md:ml-5 w-32 md:w-72 font-medium mt-10  outline-none text-gray-500'
								value={data?.name}
								disabled
							/>
						</div>
						<button
							onClick={handleFollowUser}
							className={`${
								user?.following.find(
									(singleUser) => singleUser._id == data?._id
								)
									? 'border-2 text-primary'
									: 'bg-primary text-white'
							}  flex items-center rounded-lg text-sm md:text-lg md:px-8 px-4  md:py-3 py-2 absolute top-[103%] right-0`}>
							{followLoading && (
								<Icon
									icon='line-md:loading-loop'
									width='20'
									height='20'
									className={`mr-2`}
								/>
							)}{' '}
							{changeFollowButtonName()}
						</button>
					</div>
					<div className='md:flex gap-4 mt-24'>
						<div className='md:w-[30%] w-full '>
							<div className='items-list flex justify-between bg-gray-200 rounded-md p-4 text-gray-500'>
								<div className='flex flex-col '>
									<span className='text-xl text-center text-black'>
										{data?.posts.length}
									</span>{' '}
									<div className='font-medium'>Posts</div>
								</div>
								<div className='flex flex-col '>
									<span className='text-xl text-center text-black'>
										{data?.followers.length}
									</span>{' '}
									<div className='font-medium'>Followers</div>
								</div>
								<div className='flex flex-col '>
									<span className='text-xl text-center text-black'>
										{data?.following.length}
									</span>{' '}
									<div className='font-medium'>Following</div>
								</div>
							</div>
							<div className='mt-5 bg-gray-200 p-4 text-gray-700 rounded-md'>
								<div className='text-xl font-medium '>
									About
								</div>
								<div className='text-lg flex items-center mt-3 '>
									<Icon
										icon='material-symbols:date-range'
										height={24}
										width={24}
										className='mr-5'
									/>{' '}
									Joined Jan 2023
								</div>
							</div>
						</div>

						<div className='flex flex-col md:w-[70%]'>
							{singleUserPosts?.length > 0 ? (
								singleUserPosts?.map((post) => {
									return <Post post={post} width={'w-3/5'} />
								})
							) : (
								<div className='font-bold text-3xl md:mt-0 mt-7 h-full flex items-center justify-center'>
									No Posts To Show
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserProfile
