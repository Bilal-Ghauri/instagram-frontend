import React, { useState, useEffect } from 'react'
import AppBar from '../components/reusable/AppBar'
import Post from '../components/reusable/Post'
import PostSkeletion from '../components/reusable/PostSkeletion'
import { RootState } from '.././store/store'
import axios from '../config/axios'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from '../services/UserService'
import { addUser } from '../store/slices/UserSlice'
import {
	addAllPosts,
	addExplorePosts,
	addOriginalPostsArray,
} from '../store/slices/PostSlice'
import { checkPostsLength, populateAllPosts } from '../utils/utils'

const Feed = () => {
	const [loading, setLoading] = useState(false)
	const [noPostToShow, setNoPostsToShow] = useState('')

	const { user, token } = useSelector((state: RootState) => state.UserReducer)
	const { posts, originalPostsArray } = useSelector(
		(state: RootState) => state.PostReducer
	)

	const dispatch = useDispatch()

	const getAllPostsFromAPI = async () => {
		try {
			setLoading(true)
			const getAllPostsRequest = await axios.get(
				'/post/get/all/posts/forUser'
			)
			const getAllPostsResponse = await getAllPostsRequest.data
			dispatch(addOriginalPostsArray(getAllPostsResponse))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const noPosts = () => {
		setTimeout(() => {
			posts?.length > 0 &&
				checkPostsLength(posts) == 0 &&
				setNoPostsToShow('No Posts To Show')
		}, 1000)
	}
	useEffect(() => {
		getAllPostsFromAPI()
	}, [])

	useEffect(() => {
		noPosts()
	}, [originalPostsArray])

	const skeleton = (
		<div className='grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 '>
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />s
		</div>
	)

	useEffect(() => {}, [])

	return (
		<div className='w-full  '>
			<AppBar />
			{loading ? (
				skeleton
			) : (
				<div
					className={`${
						posts?.length > 0 && checkPostsLength(posts) == 0
							? 'w-full'
							: 'grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7'
					}`}>
					{posts?.length > 0 && checkPostsLength(posts) > 0 ? (
						<>
							{posts[0]?.length > 0 && (
								<>
									<div className='flex flex-col items-start  gap-3'>
										{posts[0]?.map((post, index) => {
											return (
												<Post
													key={index}
													post={post}
													index={index}
													postNum={0}
												/>
											)
										})}
									</div>
								</>
							)}
							{posts[1]?.length > 0 && (
								<div className='flex flex-col items-start  gap-3'>
									{posts[1]?.map((post, index) => {
										return (
											<Post
												key={index}
												post={post}
												index={index}
												postNum={1}
											/>
										)
									})}
								</div>
							)}

							{posts[2]?.length > 0 && (
								<div className='flex flex-col items-start  gap-3'>
									{posts[2]?.map((post, index) => {
										return (
											<Post
												key={index}
												post={post}
												index={index}
												postNum={2}
											/>
										)
									})}
								</div>
							)}
						</>
					) : (
						<div className='h-96 w-full  flex flex-col justify-center items-center lg:text-7xl md:text-5xl text-2xl font-bold text-gray-400'>
							{noPosts()}
							{noPostToShow}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Feed
