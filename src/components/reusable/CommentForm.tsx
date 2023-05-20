import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { ClipLoader } from 'react-spinners'
import axios from '../../config/axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { addSinglePost } from '../../store/slices/PostSlice'

const CommentForm = ({ rowsToShow, textForButton }: any) => {
	const [commentText, setCommentText] = useState('')
	const [commentLoading, setCommentLoading] = useState(false)

	const dispatch = useDispatch()

	const { singlePost } = useSelector((state: RootState) => state.PostReducer)

	const postComment = async () => {
		try {
			setCommentLoading(true)
			if (singlePost) {
				let apiRequest = await axios.post('/post/create/comment', {
					postId: singlePost?._id,
					commentText,
				})
				let apiResponse = await apiRequest.data
				dispatch(addSinglePost(apiResponse.post))
				console.log(apiResponse)
				setCommentLoading(false)
				setCommentText('')
			}
		} catch (error) {
			setCommentLoading(false)
			console.log(error)
		}
	}

	return (
		<div className='relative mt-2'>
			<textarea
				name=''
				className='border w-full outline-none border-gray-300 rounded-lg p-3 text-md'
				rows={rowsToShow}
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
				id=''>
				{' '}
			</textarea>
			<div className='absolute bottom-0 right-0 p-5 flex items-center'>
				<Icon
					icon='ic:round-emoji-emotions'
					className='text-gray-500 mr-2 cursor-pointer'
					height={30}
				/>
				<button
					disabled={commentText == ''}
					onClick={postComment}
					className='bg-primary disabled:opacity-[.6] flex items-center text-white px-4 py-2 rounded-lg'>
					{textForButton}
					{commentLoading && (
						<div className='ml-3 p-0  pt-1'>
							<ClipLoader color='#fff' size={15} />
						</div>
					)}
				</button>
			</div>
		</div>
	)
}

export default CommentForm
