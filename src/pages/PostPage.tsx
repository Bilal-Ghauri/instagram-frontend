import React, { useEffect, useState } from 'react'
import AppBar from '../components/reusable/AppBar'
import { useParams } from 'react-router-dom'
import axios from '../config/axios'
import { Icon } from '@iconify/react'
import Post from '../components/reusable/Post'
import Comment from '../components/reusable/Comment'
import CommentForm from '../components/reusable/CommentForm'
import { addSinglePost, removeSinglePost } from '../store/slices/PostSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ClipLoader from 'react-spinners/ClipLoader'

const PostPage = () => {
	const { postId } = useParams()
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const { singlePost } = useSelector((state: RootState) => state.PostReducer)
	console.log(singlePost)

	const getPostToShow = async () => {
		try {
			setLoading(true)
			const apiRequest = await axios.get(`/post/get/singlepost/${postId}`)
			const apiResponse = await apiRequest.data
			dispatch(addSinglePost(apiResponse))
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	useEffect(() => {
		getPostToShow()

		return () => {
			dispatch(removeSinglePost())
		}
	}, [])

	return (
		<div>
			<AppBar />
			<div className=' md:flex w-full '>
				<div className='md:w-2/5 w-full'>
					{singlePost !== null ? (
						<Post post={singlePost} />
					) : (
						<div className=' md:h-full h-96  flex items-center justify-center'>
							<ClipLoader color='#0b0b0b' />
						</div>
					)}
				</div>
				<div className='md:w-3/5 w-full h-[80vh] md:px-5'>
					<div className='md:px-3 h-full '>
						<h3 className='text-2xl font-semibold md:pb-0 pb-4'>
							Comments
						</h3>
						<div
							className={`${
								loading && 'flex items-center justify-center'
							} h-[79%] w-full  overflow-y-scroll  comments-section pt-5`}>
							{loading ? (
								<ClipLoader color='#000' />
							) : singlePost?.comments?.length > 0 ? (
								singlePost?.comments.map(
									(item: any, index: any) => {
										return (
											<Comment
												comment={item}
												key={index}
											/>
										)
									}
								)
							) : (
								<div className='h-full  flex items-center justify-center text-xl font-bold'>
									No Comments
								</div>
							)}
							{/* <Comment />
							<Comment />
							<Comment />
							<Comment /> */}
						</div>
						<CommentForm rowsToShow={4} textForButton={'Comment'} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostPage
