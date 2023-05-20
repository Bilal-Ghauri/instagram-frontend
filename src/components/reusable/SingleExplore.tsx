import React from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { addOriginalPostsArray } from '../../store/slices/PostSlice'
import axios from '../../config/axios'

const SingleExplore = ({ post }: any) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { originalPostsArray } = useSelector(
		(state: RootState) => state.PostReducer
	)
	const { user } = useSelector((state: RootState) => state.UserReducer)
	const id = user?._id

	const likePost = async (singlePost) => {
		const findLike = singlePost.postLikes.find((item) => item == id)
		if (findLike) {
			let removeLike = singlePost.postLikes.filter((item) => item !== id)
			let postToAdd = { ...singlePost, postLikes: removeLike }
			let postsClone: any = [...originalPostsArray]
			postsClone = postsClone.map((item) => {
				if (item._id === singlePost._id) {
					return postToAdd
				}
				return item
			})
			dispatch(addOriginalPostsArray(postsClone))
			await axios.post('/post/dislike/post', {
				postId: singlePost._id,
				userId: id,
			})
		} else {
			let addLike = [...singlePost.postLikes, id]
			let postToAdd = { ...singlePost, postLikes: addLike }
			let postsClone: any = [...originalPostsArray]
			postsClone = postsClone.map((item) => {
				if (item._id === singlePost._id) {
					return postToAdd
				}
				return item
			})
			dispatch(addOriginalPostsArray(postsClone))
			await axios.post('/post/like/post', {
				postId: singlePost._id,
				userId: id,
			})
		}
	}

	return (
		<div className='relative rounded-lg group cursor-pointer w-full bg-gray-400   '>
			<img
				src={post?.postImg}
				alt=''
				className='h-full rounded-xl  mx-auto'
			/>
			<div className='absolute top-0 hidden transition duration-300 ease-in-out group-hover:flex items-center justify-center left-0 w-full h-full rounded-xl bg-[rgba(0,0,0,.6)]'>
				<div className='flex'>
					<div className='like flex items-center'>
						<Icon
							height={'25'}
							width={'25'}
							icon='mdi:heart'
							className={`cursor-pointer text-white ${
								post?.postLikes.find((item: any) => item == id)
									? 'text-red-500'
									: 'text-white'
							} `}
							onClick={() => likePost(post)}
						/>
						<div className='likes pl-1 text-lg text-white'>
							{post?.postLikes?.length}
						</div>
					</div>
					<div className='comment ml-5  flex items-center'>
						<Icon
							height={'25'}
							width={'25'}
							icon='mdi:comment-processing'
							className='cursor-pointer text-white'
							onClick={() => navigate(`/post/${post._id}`)}
						/>
						<div className='comments text-lg pl-1 text-white'>
							1
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleExplore
