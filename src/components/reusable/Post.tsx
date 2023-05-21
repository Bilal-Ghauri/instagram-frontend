import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import moment from 'moment'
import { IUser } from '../../types/User.types'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
	addAllPosts,
	addExplorePosts,
	addOriginalPostsArray,
	addSinglePost,
} from '../../store/slices/PostSlice'
import axios from '../../config/axios'
import { populateAllPosts } from '../../utils/utils'
import { addSingleBookmarkPost } from '../../store/slices/UserSlice'
import { addUser } from '../../store/slices/UserSlice'

const Post = ({ post, width = 'w-full', postNum, index }: any) => {
	const [open, setOpen] = useState(false)
	const location = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	let postContent = post?.postContent || ''
	let { user } = useSelector((state: RootState) => state.UserReducer)
	let { posts, originalPostsArray, singlePost } = useSelector(
		(state: RootState) => state.PostReducer
	)

	const [content, setContent] = useState(false)
	const menuRef = useRef<any>('')

	const [deletedPostIds, setDeletedPostIds] = useState<string[]>([])
	const [likePost, setLikePost] = useState(false)

	useEffect(() => {
		let handler = (e: MouseEvent) => {
			menuRef.current as HTMLDivElement
			if (
				menuRef &&
				menuRef.current &&
				!menuRef.current.contains(e.target)
			) {
				setOpen(false)
			}
		}

		document.addEventListener('mousedown', handler)

		return () => {
			document.addEventListener('mousedown', handler)
		}
	}, [])

	const removePost = async (id: string) => {
		if (location.pathname.startsWith('/post')) {
			navigate('/')
		}
		let postsClone = [...originalPostsArray]
		postsClone = postsClone.filter((item) => item._id !== id)
		dispatch(addOriginalPostsArray(postsClone))
		if (user) {
			const userId = user?._id
			await axios.post(`/post/delete/post/${id}`, {
				userId,
			})
			const getAllPostsRequest = await axios.get(
				'/post/get/all/posts/forUser'
			)
			const getAllPostsResponse = await getAllPostsRequest.data
			dispatch(addOriginalPostsArray(getAllPostsResponse))
		}
	}

	const setBookMarkColor = (post: any) => {
		let findPost = user?.bookmarks.find(
			(item: any) => item?._id == post?._id
		)
		if (findPost) {
			return true
		}
		return false
	}

	const handleLikeUser = async (postId: string) => {
		let id = user?._id
		if (location.pathname == '/bookmarks') {
			let findPost: any = user?.bookmarks.find(
				(item: any) => item._id == postId
			)
			if (findPost) {
				let findLike = findPost?.postLikes.find(
					(item: any) => item == user?._id
				)
				if (findLike) {
					let likesArr = findPost?.postLikes.filter(
						(item: any) => item !== user?._id
					)
					findPost = {
						...findPost,
						postLikes: likesArr,
					}
					let bookMarksArr = user?.bookmarks.map((item: any) => {
						if (item._id == findPost._id) {
							return findPost
						}
						return item
					})
					let cloneUser = { ...user, bookmarks: bookMarksArr }
					dispatch(addUser({ user: cloneUser }))
					await axios.post('/post/dislike/post', {
						postId: postId,
						userId: id,
					})
				} else {
					let postLikes = [...findPost?.postLikes, user?._id]
					findPost = {
						...findPost,
						postLikes,
					}
					let bookMarksArr = user?.bookmarks.map((item: any) => {
						if (item._id == findPost._id) {
							return findPost
						}
						return item
					})
					let cloneUser = { ...user, bookmarks: bookMarksArr }
					dispatch(addUser({ user: cloneUser }))
					await axios.post('/post/like/post', {
						postId: postId,
						userId: id,
					})
				}
			}
		} else if (location.pathname == `/post/${postId}`) {
			let findPost = { ...singlePost }
			let findLike = findPost?.postLikes?.find(
				(item: any) => item == user?._id
			)
			if (findLike) {
				let likesArr = findPost?.postLikes.filter(
					(item: any) => item !== user?._id
				)
				findPost = {
					...findPost,
					postLikes: likesArr,
				}
				dispatch(addSinglePost(findPost))
				await axios.post('/post/dislike/post', {
					postId: postId,
					userId: id,
				})
			} else {
				let postLikes = [...findPost?.postLikes, user?._id]
				findPost = {
					...findPost,
					postLikes,
				}
				dispatch(addSinglePost(findPost))
				await axios.post('/post/like/post', {
					postId: postId,
					userId: id,
				})
			}
		} else {
			let postsArr = [...originalPostsArray]
			let findPost = postsArr.find((item) => item?._id == postId)
			let findLike = findPost.postLikes.find((item: any) => item == id)
			if (findLike) {
				let likesArr = findPost.postLikes.filter(
					(item: any) => item !== id
				)
				findPost = {
					...findPost,
					postLikes: likesArr,
				}
				postsArr = postsArr.map((item) => {
					if (item._id == findPost._id) {
						return findPost
					}
					return item
				})
				dispatch(addOriginalPostsArray(postsArr))
				await axios.post('/post/dislike/post', {
					postId: postId,
					userId: id,
				})
			} else {
				findPost = {
					...findPost,
					postLikes: [...findPost.postLikes, id],
				}
				postsArr = postsArr.map((item) => {
					if (item._id == findPost._id) {
						return findPost
					}
					return item
				})
				dispatch(addOriginalPostsArray(postsArr))
				await axios.post('/post/like/post', {
					postId: postId,
					userId: id,
				})
			}
		}
	}

	const handleAddBookmark = async (post: any) => {
		let findPost = user?.bookmarks.find((item: any) => item._id == post._id)
		if (findPost) {
			// remove post from bookmarks
			let bookMarksArr = user?.bookmarks.filter(
				(item: any) => item._id !== post._id
			)
			let userClone = { ...user, bookmarks: bookMarksArr }
			dispatch(addUser({ user: userClone }))
			await axios.post('/post/remove/bookmark', {
				postId: post._id,
				userId: user?._id,
			})
		} else {
			//add post to bookmarks
			await axios.post('/post/add/bookmark', {
				postId: post._id,
				userId: user?._id,
			})
			dispatch(addSingleBookmarkPost(post))
		}
	}

	return (
		<div className={`post mb-3  scale-100 ${width}`}>
			<div className='user-data my-3 flex items-center justify-between'>
				<div className='flex'>
					<img
						src={
							post?.postOwner?.profilePicture ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXH0iM58q-QakVgcQO-IGB05iAJBkEeh6KQ&usqp=CAU'
						}
						alt=''
						className='w-12  rounded-full h-12 '
					/>
					<div className='ml-3 flex flex-col justify-start'>
						<Link to={`/profile/${post?.postOwner?._id}`}>
							<h2 className='text-lg p-0 font-medium'>
								{post?.postOwner?.name}
							</h2>
						</Link>
						<small className='p-0 text-xs'>
							{moment(post?.createdAt).calendar()}
						</small>
					</div>
				</div>
				<div className='relative  rounded-full p-1 ' ref={menuRef}>
					<Icon
						height={'25'}
						width={'25'}
						className='cursor-pointer  rounded-full hover:bg-gray-100'
						icon='mdi:dots-horizontal'
						id='dots-icons'
						onClick={() => {
							setOpen(!open)
						}}
					/>
					<div
						id='cta-icons'
						className={` absolute ${
							open == false && 'hidden'
						}  top-10 right-0 bg-white md:p-3 p-2  w-56 border rounded-lg`}>
						{location.pathname !== '/bookmarks' &&
							post?.postOwner?._id == user?._id && (
								<div
									onClick={() => {
										if (post?.postOwner?._id == user?._id) {
											removePost(post?._id)
										}
									}}
									className='cta-btn cursor-pointer flex items-center font-medium hover:bg-gray-200 bg-white p-3  rounded-lg  text-gray-600'>
									<Icon
										icon='ic:outline-delete'
										className='mr-3 text-gray-600'
										height={'22'}
										width={'22'}
									/>{' '}
									Delete
								</div>
							)}
						<div
							onClick={() => {
								let completeURL =
									window.location.href + `post/${post?._id}`
								navigator.clipboard
									.writeText(completeURL)
									.then(() => {})
									.catch((error) => {
										console.error(
											'Error copying text to clipboard:',
											error
										)
									})
							}}
							className='cta-btn cursor-pointer flex items-center font-medium hover:bg-gray-200 bg-white p-3  rounded-lg  text-gray-600'>
							<Icon
								icon='material-symbols:content-copy-outline'
								className='mr-3 text-gray-600'
								height={'22'}
								width={'22'}
							/>{' '}
							Copy Link
						</div>
						<div
							onClick={() => {
								let completeURL =
									window.location.href + `post/${post?._id}`
								window.open(completeURL, '_blank')
							}}
							className='cta-btn cursor-pointer flex items-center font-medium hover:bg-gray-200 bg-white p-3 rounded-lg  text-gray-600'>
							<Icon
								icon='iconoir:open-new-window'
								className='mr-3 text-gray-600'
								height={'22'}
								width={'22'}
							/>{' '}
							Open in new tab
						</div>
					</div>
				</div>
			</div>
			{post?.postContent && (
				<div
					onClick={() => {
						if (
							post?.postImg == '' &&
							location.pathname !== `/post/${post?._id}`
						) {
							navigate(`/post/${post?._id}`)
						}
					}}
					className={` ${post?.postImg == '' && 'bg-gray-100 p-3 '} ${
						post?.postImg !== '' && 'flex '
					} ${
						post?.postImg == '' && postContent.length < 100
							? 'h-56 justify-center flex text-md '
							: 'text-sm'
					}   items-center   w-full mb-2 cursor-pointer  rounded-lg`}>
					{content ? postContent : postContent.slice(0, 300)}
					{!(postContent.length <= 100) ? (
						content ? (
							<a
								href='#'
								className='font-medium ml-1'
								onClick={() => setContent(false)}>
								See Less...
							</a>
						) : (
							<a
								href='#'
								className='font-medium ml-1'
								onClick={() => setContent(true)}>
								See More...
							</a>
						)
					) : null}
				</div>
			)}
			{post?.postImg && (
				<div
					className='img-section  rounded-lg cursor-pointer object-cover w-full h-96 overflow-hidden bg-gray-200'
					onClick={() => {
						if (location.pathname !== `/post/${post?._id}`) {
							navigate(`/post/${post._id}`)
						}
					}}>
					<img
						src={post?.postImg}
						alt=''
						className='h-full w-full object-contain'
					/>
				</div>
			)}
			<div className='like-section flex items-center justify-between mt-3   w-full '>
				<div className='flex '>
					<div className='like flex items-center relative'>
						<Icon
							height={'30'}
							width={'30'}
							icon='mdi:cards-heart'
							className={`cursor-pointer  ${
								post?.postLikes.find(
									(item: any) => item == user?._id
								)
									? 'text-red-500'
									: 'text-gray-300'
							} `}
							onClick={() => handleLikeUser(post?._id)}
						/>
						<div className='likes pl-1 text-lg text-gray-500 '>
							{post?.postLikes?.length}
						</div>
					</div>
					<div className='comment ml-5 flex items-center'>
						<Icon
							height={'30'}
							width={'30'}
							icon='mdi:comment'
							className='cursor-pointer text-gray-300'
							onClick={() => {
								if (
									location.pathname !== `/post/${post?._id}`
								) {
									navigate(`/post/${post._id}`)
								}
							}}
						/>
						<div className='comments text-lg pl-1 text-gray-500'>
							{post?.comments?.length}
						</div>
					</div>
				</div>
				<div>
					<Icon
						height={'30'}
						width={'30'}
						icon={
							setBookMarkColor(post)
								? 'material-symbols:bookmark'
								: 'ic:outline-bookmark-border'
						}
						className='cursor-pointer text-gray-400'
						onClick={() => {
							handleAddBookmark(post)
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default Post
