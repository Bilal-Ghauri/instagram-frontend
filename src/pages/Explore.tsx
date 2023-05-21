import React, { useEffect, useState } from 'react'
import AppBar from '../components/reusable/AppBar'
import Post from '../components/reusable/Post'
import SingleExplore from '../components/reusable/SingleExplore'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import axios from '../config/axios'
import { addOriginalPostsArray } from '../store/slices/PostSlice'
import { checkPostsLength } from '../utils/utils'

const Explore = () => {
	const [loading, setLoading] = useState(false)
	const { explorePosts } = useSelector(
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

	useEffect(() => {
		getAllPostsFromAPI()
	}, [])

	const skeleton = (
		<div className='grid mt-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 '>
			<div className='animate-pulse h-60 w-full bg-slate-200 rounded-lg'></div>
			<div className='animate-pulse h-60 w-full bg-slate-200 rounded-lg'></div>
			<div className='animate-pulse h-60 w-full bg-slate-200 rounded-lg'></div>
			<div className='animate-pulse h-60 w-full bg-slate-200 rounded-lg'></div>
			<div className='animate-pulse h-60 w-full bg-slate-200 rounded-lg'></div>
			<div className='animate-pulse h-60 w-full bg-slate-200 rounded-lg'></div>
		</div>
	)

	return (
		<div>
			<AppBar />
			{loading ? (
				skeleton
			) : explorePosts &&
			  explorePosts?.length > 0 &&
			  checkPostsLength(explorePosts) > 0 ? (
				<div className='grid mt-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 '>
					<div className='flex flex-col items-start  gap-4'>
						{explorePosts[0] &&
							explorePosts[0]?.map((post: any, index: any) => {
								return <SingleExplore key={index} post={post} />
							})}
					</div>
					<div className='flex  flex-col  gap-4'>
						{explorePosts[1]?.map((post: any, index: any) => {
							return <SingleExplore key={index} post={post} />
						})}
					</div>
					<div className=' flex  flex-col  gap-4'>
						{explorePosts[2]?.map((post: any, index: any) => {
							return <SingleExplore key={index} post={post} />
						})}
					</div>
				</div>
			) : (
				<div className='h-96 w-full  flex flex-col justify-center items-center lg:text-7xl md:text-5xl text-2xl font-bold text-gray-400'>
					No Posts To Show
				</div>
			)}
		</div>
	)
}

export default Explore
