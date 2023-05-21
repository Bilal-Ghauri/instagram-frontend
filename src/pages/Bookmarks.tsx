import React, { useEffect, useState } from 'react'
import AppBar from '../components/reusable/AppBar'
import Post from '../components/reusable/Post'
import PostSkeletion from '../components/reusable/PostSkeletion'
import { RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../config/axios'
import { checkPostsLength, populateAllPosts } from '../utils/utils'
import { addBookMarks } from '../store/slices/PostSlice'

const Bookmarks = () => {
	const [loading, setLoading] = useState(false)
	const [noPostToShow, setNoPostsToShow] = useState('')
	const { originalPostsArray } = useSelector(
		(state: RootState) => state.PostReducer
	)
	const { user } = useSelector((state: RootState) => state.UserReducer)
	const { bookmarks } = useSelector((state: RootState) => state.PostReducer)

	const dispatch = useDispatch()
	const noPosts = (): any => {
		setTimeout(() => {
			setNoPostsToShow('No Bookmarks To Show')
		}, 1000)
	}

	const getAllBookMarks = async () => {
		try {
			setLoading(true)
			const apiRequest = await axios.get('/post/get/bookmarks')
			const apiData = await apiRequest.data
			let reverseArray = apiData.reverse()
			let allPostsArray = populateAllPosts(
				originalPostsArray,
				reverseArray
			)
			dispatch(addBookMarks(allPostsArray?.bookmarkArray))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	useEffect(() => {
		getAllBookMarks()
	}, [user])

	useEffect(() => {
		getAllBookMarks()
		// if (user !== null) {
		// 	setBookMarks()
		// }
	}, [])

	const skeleton = (
		<div className='grid mt-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 '>
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
			<PostSkeletion />
		</div>
	)

	return (
		<div>
			<AppBar />
			{/* <div className='text-xl md:text-2xl mt-5 font-bold'>
				My Bookmarks
			</div> */}
			{loading ? (
				skeleton
			) : (
				<div
					className={`${
						bookmarks &&
						bookmarks?.length > 0 &&
						checkPostsLength(bookmarks) == 0
							? 'w-full'
							: 'grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7'
					}`}>
					{bookmarks &&
					bookmarks.length > 0 &&
					checkPostsLength(bookmarks) > 0 ? (
						<>
							{bookmarks[0] && bookmarks[0]?.length > 0 && (
								<div className='flex flex-col items-start  gap-3'>
									{bookmarks[0]?.map(
										(post: any, index: any) => {
											return (
												<Post
													key={index}
													post={post}
													index={index}
													postNum={0}
												/>
											)
										}
									)}
								</div>
							)}
							{bookmarks[1]?.length > 0 && (
								<div className='flex flex-col items-start  gap-3'>
									{bookmarks[1]?.map(
										(post: any, index: any) => {
											return (
												<Post
													key={index}
													post={post}
													index={index}
													postNum={1}
												/>
											)
										}
									)}
								</div>
							)}

							{bookmarks[2]?.length > 0 && (
								<div className='flex flex-col items-start  gap-3'>
									{bookmarks[2]?.map(
										(post: any, index: any) => {
											return (
												<Post
													key={index}
													post={post}
													index={index}
													postNum={2}
												/>
											)
										}
									)}
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

export default Bookmarks
