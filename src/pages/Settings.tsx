import React, { useEffect, useState } from 'react'
import AppBar from '../components/reusable/AppBar'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import axios from '.././config/axios'
import { addUser } from '../store/slices/UserSlice'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import SettingsSkeleton from './SettingsSkeleton'
import { getUser } from '../services/UserService'

const Settings = () => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state: RootState) => state.UserReducer)
	const [coverPhoto, setCoverPhoto] = useState<IPic>({
		pic: null,
		blob: null,
	})
	const [profilePhoto, setProfilePhoto] = useState<IPic>({
		pic: null,
		blob: null,
	})

	const [userData, setUserData] = useState({
		name: user?.name,
		bio: user?.bio,
		location: user?.location,
		DOB: user?.DOB,
		profession: user?.profession,
		website: user?.website,
		profilePicture: user?.profilePicture,
		coverPicture: user?.coverPicture,
	})

	interface IPic {
		pic: File | null
		blob: string | ArrayBuffer | null
	}

	const updateUserData = async () => {
		let fd = new FormData()
		if (coverPhoto.pic) {
			fd.append('coverPhoto', coverPhoto.pic)
		}
		if (profilePhoto.pic) {
			fd.append('profilePhoto', profilePhoto.pic)
		}

		if (coverPhoto.pic || profilePhoto.pic) {
			try {
				setLoading(true)
				let apiRequest = await axios.post('/user/upload', fd, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				let apiData = await apiRequest.data
				if (apiData) {
					await axios.post('/user/update/user', {
						name: userData.name,
						bio: userData.bio,
						location: userData.location,
						DOB: userData.DOB,
						profession: userData.profession,
						website: userData.website,
						profilePicture:
							apiData?.profilePhoto || user?.profilePicture,
						coverPicture: apiData?.coverPhoto || user?.coverPicture,
					})
					let userGet = await getUser()
					dispatch(addUser(userGet))
					setLoading(false)
				}
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		} else {
			try {
				setLoading(true)
				await axios.post('/user/update/user', {
					name: userData.name,
					bio: userData.bio,
					location: userData.location,
					DOB: userData.DOB,
					profession: userData.profession,
					website: userData.website,
					profilePicture: user?.profilePicture,
					coverPicture: user?.coverPicture,
				})
				let userGet = await getUser()
				dispatch(addUser(userGet))
				setLoading(false)
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div>
			<AppBar />
			<div className='flex mt-10 gap-10'>
				<div className='flex-grow-[11] pb-10'>
					<div>
						<div className='h-56 md:h-72 rounded-xl bg-gray-200  relative'>
							<img
								src={
									coverPhoto.blob ||
									user?.coverPicture ||
									'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEXT09OdeqMBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII='
								}
								className={`${
									coverPhoto.blob || user?.coverPicture
										? 'object-contain'
										: 'object-fill'
								} rounded-xl h-full w-full`}
								alt=''
							/>
							<button className='absolute top-2 right-4'>
								<div className='relative overflow-hidden'>
									<div className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
										<Icon
											icon='material-symbols:edit'
											height={18}
											width={18}
											className='text-gray-500'
										/>
									</div>
									<input
										type='file'
										onChange={(e) => {
											if (!e.target.files) return
											const img = e.target.files[0]
											const reader = new FileReader()
											reader.readAsDataURL(img)
											reader.onload = () => {
												setCoverPhoto({
													pic:
														e.target.files &&
														e.target.files[0],
													blob: reader.result,
												})
											}
										}}
										className='absolute top-0 scale-[5] opacity-0 left-0 cursor-pointer'
									/>
								</div>
							</button>
							<div className='flex  w-full  absolute bottom-[-63px] pl-2 sm:pl-4 items-center '>
								<div className='relative'>
									<img
										src={
											profilePhoto.blob
												? profilePhoto.blob
												: user?.profilePicture
												? user?.profilePicture
												: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXH0iM58q-QakVgcQO-IGB05iAJBkEeh6KQ&usqp=CAU'
										}
										alt=''
										className='rounded-full h-28 w-28 outline-1 '
										style={{ border: '3px solid white' }}
									/>
									<button className='absolute right-0  bottom-0'>
										<div className='relative overflow-hidden'>
											<div className='h-10 w-10 border  bg-white rounded-full flex items-center justify-center'>
												<Icon
													icon='material-symbols:edit'
													className='text-gray-500'
													height={18}
													width={18}
												/>
											</div>
											<input
												type='file'
												onChange={(e) => {
													if (!e.target.files) return
													const img =
														e.target.files[0]
													const reader =
														new FileReader()
													reader.readAsDataURL(img)
													reader.onload = () => {
														setProfilePhoto({
															pic:
																e.target
																	.files &&
																e.target
																	.files[0],
															blob: reader.result,
														})
													}
												}}
												className='absolute top-0 scale-[5] opacity-0 left-0 cursor-pointer'
											/>
										</div>
									</button>
								</div>
								<input
									type='text'
									className=' text-3xl border-b-2 pb-1 md:text-4xl ml-2 md:ml-5 w-32 md:w-72 font-medium mt-10  outline-none text-gray-500'
									value={userData.name}
									name='name'
									onChange={handleChange}
								/>
							</div>
							<button
								onClick={updateUserData}
								className='bg-primary hidden md:flex items-center rounded-lg px-8 text-white py-3 absolute top-[103%] right-0'>
								{loading && (
									<Icon
										icon='line-md:loading-loop'
										width='18'
										height='18'
										className={`mr-2`}
									/>
								)}{' '}
								Update
							</button>
						</div>
					</div>
					<div className='mt-24'>
						<div className='text-lg font-medium'>Bio</div>
						<textarea
							name='bio'
							value={userData.bio}
							onChange={(e) =>
								setUserData({
									...userData,
									bio: e.target.value,
								})
							}
							placeholder='Add a short Bio.'
							className='border h-32 w-full p-2 px-4 mt-2 rounded-lg outline-gray-200'
						/>
					</div>
					<div className='grid md:grid-cols-2 grid-cols-1 gap-3 mt-3'>
						<div>
							<div className='text-lg font-medium'>Location</div>
							<input
								type='text'
								name='location'
								value={userData.location}
								onChange={handleChange}
								placeholder='Add a location...'
								className='border w-full p-2 mt-2 rounded-lg'
							/>
						</div>
						<div>
							<div className='text-lg font-medium'>
								When You Were Born
							</div>
							<input
								type='date'
								name='DOB'
								value={userData.DOB}
								className='border w-full p-2 mt-2 rounded-lg'
								onChange={handleChange}
							/>
						</div>
						<div>
							<div className='text-lg font-medium'>
								Profession
							</div>
							<input
								type='text'
								name='profession'
								value={userData.profession}
								onChange={handleChange}
								placeholder='What do you do?'
								className='border w-full p-2 mt-2 rounded-lg'
							/>
						</div>
						<div>
							<div className='text-lg font-medium'>Website</div>
							<input
								type='text'
								name='website'
								value={userData?.website}
								onChange={handleChange}
								placeholder='Add you website link'
								className='border w-full p-2 mt-2 rounded-lg'
							/>
						</div>
						<button
							onClick={updateUserData}
							className='bg-primary flex justify-center md:hidden items-center rounded-lg px-8 text-white py-3'>
							{loading && (
								<Icon
									icon='line-md:loading-loop'
									width='18'
									height='18'
									className={`mr-2`}
								/>
							)}{' '}
							Update
						</button>
					</div>
				</div>
				<div className='flex-grow-[1]  items-start  hidden md:flex'>
					<img src='/settings.svg' alt='' />
				</div>
			</div>
		</div>
	)
}

export default Settings
