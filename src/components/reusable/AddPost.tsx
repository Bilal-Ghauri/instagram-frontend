import React, { useState, useEffect } from 'react'
import axios from '../../config/axios'
import { Icon } from '@iconify/react'
import { addUser } from '../../store/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../services/UserService'
import { populateAllPosts } from '../../utils/utils'
import {
	addAllPosts,
	addExplorePosts,
	addOriginalPostsArray,
} from '../../store/slices/PostSlice'
import { RootState } from '../../store/store'

const AddPost = () => {
	const [postImg, setPostImg] = useState<null | File | Blob>(null)
	const [imgBlob, setImgBlob] = useState<string | null>(null)
	const [postText, setPostText] = useState('')
	const [loading, setLoading] = useState(false)

	const { originalPostsArray } = useSelector(
		(state: RootState) => state.PostReducer
	)

	const dispatch = useDispatch()

	const handleChangePic = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		setPostImg(e.target.files[0])
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
		reader.onload = () => {
			setImgBlob(String(reader.result))
		}
	}

	const hideAddPostContainer = () => {
		const element = document?.getElementById('add-post')
		if (element) {
			element.style.display = 'none'
		}
	}

	const createPost = async () => {
		setLoading(true)
		let imageUrl = ''
		if (postImg) {
			try {
				const fd = new FormData()
				fd.append('image', postImg)

				const postImgRequest = await axios.post(
					'/post/post-image-upload',
					fd,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				)
				const postImgResponse = await postImgRequest.data
				const postRequest = await axios.post('/post/user-post', {
					postContent: postText,
					postImg: postImgResponse.url,
				})
				const postResponse = await postRequest.data
				console.log(postResponse)

				let postsClone = [...originalPostsArray]
				postsClone.unshift(postResponse?.post)
				dispatch(addOriginalPostsArray(postsClone))
				setPostImg(null)
				setImgBlob(null)
				setLoading(false)
				setPostText('')
				hideAddPostContainer()
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		} else {
			try {
				setLoading(true)
				const sendPostRequest = await axios.post('/post/user-post', {
					postContent: postText,
					postImg: '',
				})
				const sendPostResponse = await sendPostRequest.data
				let postsClone = [...originalPostsArray]
				postsClone.unshift(sendPostResponse?.post)
				dispatch(addOriginalPostsArray(postsClone))
				setPostText('')
				setLoading(false)
				hideAddPostContainer()
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<div
			id='add-post'
			style={{
				height: '100vh',
				width: '100vw',
				position: 'fixed',
				top: 0,
				left: 0,
				backgroundColor: 'rgba(0,0,0,0.5)',
				zIndex: 100,
				overflow: 'hidden',
				display: 'none',
				padding: 10,
				justifyContent: 'center',
				alignItems: 'center',
				transition: 'display 1s ease-in',
			}}>
			<div
				id='add-post-container'
				className=' bg-white mb-[150px]'
				style={{
					width: '600px',
					maxWidth: '600px',
					minHeight: '200px',
					padding: '25px',
					marginTop: '50px',
				}}>
				<div className='text-2xl font-bold mb-3 flex justify-between items-center'>
					Create Post{' '}
				</div>
				<textarea
					name=''
					id=''
					cols={10}
					rows={3}
					className='w-full border p-3 outline-none rounded-xl'
					placeholder="What's in your mind?"
					value={postText}
					onChange={(e) => setPostText(e.target.value)}></textarea>
				{imgBlob && (
					<div className='border w-56 h-72 relative mx-auto'>
						<img src={imgBlob} className='w-full h-full' />
						<Icon
							icon='material-symbols:close'
							height={30}
							width={30}
							className='text-white absolute top-2 right-2 bg-gray-500 rounded-full p-1 cursor-pointer'
							onClick={() => {
								setPostImg(null)
								setImgBlob(null)
							}}
						/>
					</div>
				)}
				<div className='flex items-baseline justify-end'>
					<button className='ml-auto relative overflow-hidden'>
						<div className='h-10 w-10  bg-white rounded-full border flex items-center justify-center'>
							<Icon
								icon='material-symbols:edit'
								height={18}
								width={18}
								className='text-gray-500'
							/>
						</div>
						<input
							type='file'
							className='absolute top-0 left-0 mt-[10px] scale-[5] opacity-0 cursor-pointer '
							onChange={handleChangePic}
						/>
					</button>
					<button
						className='py-3 ml-2 flex mt-3 px-8 items-center cursor-pointer rounded-xl text-white bg-primary disabled:opacity-50 disabled:cursor-default'
						onClick={createPost}
						disabled={postText == '' && postImg == null}>
						{loading && (
							<Icon
								icon='line-md:loading-loop'
								width='20'
								height='20'
								className={`mr-2`}
							/>
						)}
						Post
					</button>
				</div>
			</div>
		</div>
	)
}

export default AddPost
