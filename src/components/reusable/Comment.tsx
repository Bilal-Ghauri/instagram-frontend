import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import CommentForm from './CommentForm'
import SingleReply from './SingleReply'
import { ClipLoader } from 'react-spinners'
import moment from 'moment'
import axios from '../../config/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addSinglePost } from '../../store/slices/PostSlice'
import { RootState } from '../../store/store'

const Comment = ({ comment }: any) => {
	console.log('comment', comment)

	const [showCommentForm, setShowCommentForm] = useState(false)
	const [removeCommentLoading, setRemoveCommentLoading] = useState(false)

	const { user } = useSelector((state: RootState) => state.UserReducer)
	const dispatch = useDispatch()
	const { singlePost } = useSelector((state: RootState) => state.PostReducer)
	console.log(singlePost)

	const removeComment = async (commentId: any) => {
		try {
			setRemoveCommentLoading(true)
			const deleteComment = await axios.post(
				`/post/delete/comment/${singlePost?._id}/${commentId}`,
				{ currentUserId: user?._id }
			)
			const deleteCommentREs = deleteComment.data
			console.log(deleteCommentREs)
			const apiRequest = await axios.get(
				`/post/get/singlepost/${singlePost?._id}`
			)
			const apiResponse = await apiRequest.data
			dispatch(addSinglePost(apiResponse))
			setRemoveCommentLoading(false)
		} catch (error) {
			setRemoveCommentLoading(false)
			console.log(error)
		}
	}

	return (
		<div className='mb-5 border bg-gray-200 rounded-lg p-3'>
			<div className=' pb-3 flex justify-between'>
				<div
					className='flex w-full pb-2'
					style={{ borderBottom: '2px solid lightgray' }}>
					<img
						src={
							comment?.commentOwner?.profilePicture ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXH0iM58q-QakVgcQO-IGB05iAJBkEeh6KQ&usqp=CAU'
						}
						alt=''
						className='w-10  rounded-full h-10 '
					/>
					<div className='ml-3 flex flex-col justify-start'>
						<Link to={`/profile`}>
							<h2 className='text-md p-0 font-medium'>
								{comment?.commentOwner?.name}
							</h2>
						</Link>
						<small className='p-0 ' style={{ fontSize: '10px' }}>
							{moment(comment?.createdAt).calendar()}
						</small>
					</div>
				</div>
			</div>
			<p className='text-sm pr-5'>{comment?.text}</p>
			<div className='pt-1 flex items-center justify-between pr-5'>
				<div>
					{removeCommentLoading ? (
						<span className='mx-4 mt-1'>
							<ClipLoader color='#000' size={12} />
						</span>
					) : (
						comment?.commentOwner?._id == user?._id && (
							<small
								className='pr-3 cursor-pointer font-semibold'
								onClick={() => removeComment(comment?._id)}>
								Remove
							</small>
						)
					)}
					{/* <small
						className='cursor-pointer font-semibold'
						onClick={() => setShowCommentForm(!showCommentForm)}>
						Reply
					</small> */}
				</div>
			</div>
			{showCommentForm && (
				<CommentForm rowsToShow={2} textForButton={'Reply'} />
			)}
			{/* <div className='border-l-2 ml-3 pl-4'>
				<SingleReply
					showCommentForm={showCommentForm}
					setShowCommentForm={setShowCommentForm}
				/>
				<SingleReply
					showCommentForm={showCommentForm}
					setShowCommentForm={setShowCommentForm}
				/>
			</div> */}
		</div>
	)
}

export default Comment
