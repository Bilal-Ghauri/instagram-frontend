import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { handleHideSideBar } from '../utils/document.utils.d'
import { removeUser } from '../store/slices/UserSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Cookies from 'js-cookie'
import {
	addAllPosts,
	addExplorePosts,
	addOriginalPostsArray,
} from '../store/slices/PostSlice'
import { Modal } from 'react-responsive-modal'

const SiderBar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [userPostsLength, setUserPostsLength] = useState(0)
	const [open, setOpen] = useState(false)
	const [currentModelToShow, setCurrentModelToShow] = useState<any>(null)
	const onOpenModal = () => {
		handleHideSideBar('sideBar')
		setOpen(true)
	}
	const onCloseModal = () => {
		setCurrentModelToShow(null)
		setOpen(false)
	}

	const { user } = useSelector((state: RootState) => state.UserReducer)
	const { posts, originalPostsArray } = useSelector(
		(state: RootState) => state.PostReducer
	)

	useEffect(() => {
		let userPostsClone = [...originalPostsArray]
		userPostsClone = userPostsClone.filter(
			(item) => item?.postOwner._id == user?._id
		)
		setUserPostsLength(userPostsClone?.length)
	}, [originalPostsArray])

	const logoutUser = () => {
		Cookies.remove('UserToken')
		// window.location.reload()
		localStorage.removeItem('userPath')
		dispatch(removeUser())
		dispatch(addAllPosts([]))
		dispatch(addOriginalPostsArray([]))
		dispatch(addExplorePosts([]))
		navigate('/login')
	}

	const closeIcon = <div className='text-sm font-bold '>X</div>

	return (
		<>
			<div
				id='sideBar'
				className='sideBar lg:fixed fixed z-[5]  lg:shadow-none shadow-2xl  bg-white translate-x-[-110%] lg:translate-x-0 transition-all duration-200 flex flex-col justify-between border lg:w-64 w-64 p-5 px-4 h-screen'>
				<div className=''>
					<Link to={`/profile/${user?._id}`}>
						<div className='profile-section cursor-pointer active:scale-[.99] bg-gray-200 p-3 rounded flex items-center'>
							{user?.profilePicture ? (
								<img
									src={user?.profilePicture}
									alt=''
									className='w-11 h-11 object-cover rounded-full'
								/>
							) : (
								<div className='bg-gray-100 rounded-full p-1'>
									<Icon
										icon='material-symbols:person'
										height={28}
										width={28}
									/>
								</div>
							)}
							<div className='text-xl font-medium text-gray-700 pl-3'>
								{user?.name}
							</div>
						</div>
					</Link>

					<div className='items-list flex justify-between mt-7 text-gray-500'>
						<div className='flex flex-col '>
							<span className='text-xl text-center text-black'>
								{userPostsLength}
							</span>{' '}
							<div className='font-medium '>Posts</div>
						</div>
						<div
							className='flex flex-col cursor-pointer'
							onClick={() => {
								setCurrentModelToShow({
									text: 'Followers',
									persons: user?.followers,
								})
								onOpenModal()
							}}>
							<span className='text-xl text-center text-black'>
								{user?.followers?.length}
							</span>{' '}
							<div className='font-medium '>Followers</div>
						</div>
						<div
							className='flex flex-col cursor-pointer'
							onClick={() => {
								setCurrentModelToShow({
									text: 'Following',
									persons: user?.following,
								})
								onOpenModal()
							}}>
							<span className='text-xl text-center text-black'>
								{user?.following.length}
							</span>{' '}
							<div className='font-medium '>Following</div>
						</div>
					</div>

					<div className='links mt-12  '>
						<div
							onClick={() => {
								navigate('/')
								handleHideSideBar('sideBar')
							}}
							className={
								useLocation().pathname == '/'
									? `link mb-1 cursor-pointer p-3 bg-primary-light group rounded-md flex items-center bg`
									: `link mb-1 cursor-pointer p-3 hover:bg-primary-light group rounded-md flex items-center bg`
							}>
							<Icon
								icon='iconoir:report-columns'
								width='22'
								height='22'
								className={
									useLocation().pathname == '/'
										? 'text-primary-dark'
										: 'text-gray-700 group-hover:text-primary-dark'
								}
								vFlip={true}
							/>{' '}
							<div
								className={`pl-4 ${
									useLocation().pathname == '/'
										? 'font-medium text-primary'
										: 'text-gray-700 font-normal'
								}    group-hover:text-primary text-lg`}>
								Feed
							</div>
						</div>

						<div
							onClick={() => {
								navigate('/explore')
								handleHideSideBar('sideBar')
							}}
							className={
								useLocation().pathname == '/explore'
									? `link mb-1 cursor-pointer p-3 bg-primary-light group rounded-md flex items-center bg`
									: `link mb-1 cursor-pointer p-3 hover:bg-primary-light group rounded-md flex items-center bg`
							}>
							<Icon
								icon='la:tachometer-alt'
								width='22'
								height='22'
								className={
									useLocation().pathname == '/explore'
										? 'text-primary-dark'
										: 'text-gray-700 group-hover:text-primary-dark'
								}
							/>{' '}
							<div
								className={`pl-4 ${
									useLocation().pathname == '/explore'
										? 'font-medium text-primary'
										: 'text-gray-700 font-normal'
								}    group-hover:text-primary text-lg`}>
								Explore
							</div>
						</div>

						<div
							onClick={() => {
								navigate('/bookmarks')
								handleHideSideBar('sideBar')
							}}
							className={
								useLocation().pathname == '/bookmarks'
									? `link mb-1 cursor-pointer p-3 bg-primary-light group rounded-md flex items-center bg`
									: `link mb-1 cursor-pointer p-3 hover:bg-primary-light group rounded-md flex items-center bg`
							}>
							<Icon
								icon='material-symbols:bookmark'
								width='22'
								height='22'
								className={
									useLocation().pathname == '/bookmarks'
										? 'text-primary-dark'
										: 'text-gray-700 group-hover:text-primary-dark'
								}
							/>{' '}
							<div
								className={`pl-4 ${
									useLocation().pathname == '/bookmarks'
										? 'font-medium text-primary'
										: 'text-gray-700 font-normal'
								}   group-hover:text-primary text-lg`}>
								Bookmarks
							</div>
						</div>

						<div
							onClick={() => {
								navigate('/settings')
								handleHideSideBar('sideBar')
							}}
							className={
								useLocation().pathname == '/settings'
									? `link mb-1 cursor-pointer p-3 bg-primary-light group rounded-md flex items-center bg`
									: `link mb-1 cursor-pointer p-3 hover:bg-primary-light group rounded-md flex items-center bg`
							}>
							<Icon
								icon='material-symbols:settings'
								width='22'
								height='22'
								className={
									useLocation().pathname == '/settings'
										? 'text-primary-dark'
										: 'text-gray-700 group-hover:text-primary-dark'
								}
							/>{' '}
							<div
								className={`pl-4 ${
									useLocation().pathname == '/settings'
										? 'font-medium text-primary'
										: 'text-gray-700 font-normal'
								}   group-hover:text-primary text-lg`}>
								Settings
							</div>
						</div>
					</div>
				</div>
				<div className=''>
					<button
						onClick={logoutUser}
						className='border w-full rounded-xl p-3 flex items-center justify-center cursor-pointer active:scale-[.98] hover:bg-gray-300 transition-all bg-gray-200'>
						<Icon icon='mdi-light:logout' width='22' height='22' />
						<div className='text-md ml-3 '> Log Out</div>
					</button>
				</div>
			</div>

			<Modal
				open={open}
				onClose={onCloseModal}
				closeIcon={closeIcon}
				center>
				<div className='pb-2'>
					<h2 className='text-2xl text-center  font-bold my-3 mb-5'>
						{currentModelToShow !== null &&
							currentModelToShow?.text}
					</h2>
					{/* <div className=' text-center'>
						<ClipLoader color='#0b0b0b' />
					</div> */}
					<div className=''>
						{currentModelToShow !== null &&
						currentModelToShow?.persons.length == 0 ? (
							<div className='text-center text-lg font-bold pt-10 '>
								{currentModelToShow.text == 'Followers'
									? 'You have 0 Followers'
									: "Your aren't Following anyone"}
							</div>
						) : (
							currentModelToShow?.persons.map((item: any) => {
								return (
									<div className=' bg-[rgba(0,0,0,0.2)] rounded-lg p-2  my-3 cursor-pointer active:scale-[.98]'>
										<Link
											to={`/profile/${item._id}`}
											className='flex items-center'
											onClick={() => onCloseModal()}>
											<img
												className='w-12 h-12 rounded-full'
												src={item.profilePicture}
												alt=''
											/>
											<div className='md:text-2xl text-xl  font-semibold pl-2'>
												{item.name}
											</div>
										</Link>
									</div>
								)
							})
						)}
					</div>
				</div>
			</Modal>
		</>
	)
}

export default SiderBar
