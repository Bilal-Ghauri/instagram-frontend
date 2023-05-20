import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'

const SingleReply = ({ showCommentForm, setShowCommentForm }: any) => {
	const [showReplyForm, setShowReplyForm] = useState(false)
	return (
		<>
			<div className='mt-5'>
				<div className=' pb-3 flex justify-between'>
					<div className='flex'>
						<img
							src={
								// post?.postOwner?.profilePicture ||
								'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXH0iM58q-QakVgcQO-IGB05iAJBkEeh6KQ&usqp=CAU'
							}
							alt=''
							className='w-10  rounded-full h-10 '
						/>
						<div className='ml-3 flex flex-col justify-start'>
							<Link to={`/profile`}>
								<h2 className='text-md p-0 font-medium'>
									{/* {post?.postOwner?.name} */}
									hiii
								</h2>
							</Link>
							<small
								className='p-0 '
								style={{ fontSize: '10px' }}>
								4 days ago
								{/* {moment(post?.createdAt).calendar()} */}
							</small>
						</div>
					</div>
				</div>
				<p className='text-sm pr-5'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. In
					odit quas expedita eum magni nostrum natus quasi molestias?
					Eaque in nobis quod nihil architecto, pariatur tempora
					debitis. Dolorum animi eos, quae eaque vitae aperiam culpa
					eveniet laudantium cum quisquam nisi repellendus impedit
					corporis, veritatis ipsa esse, provident illum officiis
					officia.
				</p>
				<div className='pt-1'>
					<small className='pr-3 cursor-pointer font-semibold'>
						Remove
					</small>
					<small
						className='cursor-pointer font-semibold'
						onClick={() => setShowReplyForm(!showReplyForm)}>
						Reply
					</small>
				</div>
				{showReplyForm && (
					<CommentForm rowsToShow={2} textForButton={'Reply'} />
				)}
			</div>
		</>
	)
}

export default SingleReply
