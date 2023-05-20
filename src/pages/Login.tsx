import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../config/axios'

import Cookies from 'js-cookie'
import { RootState } from '../store/store'
import { addUserData } from '../store/slices/UserSlice'

const Login = () => {
	const [email, setEmail] = useState('test@gmail.com')
	const [password, setPassword] = useState('123456')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.UserReducer)

	// const [loginUser, { data, isLoading, error }] = useLoginUserMutation()

	// if (data) {
	// 	Cookies.set('UserToken', data.token)
	// 	dispatch(addUserData(data))
	// 	navigate('/')
	// }

	// if (error) {
	// 	console.log(error)
	// }

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (email.trim() == '' || password.trim() == '') {
			return alert('All fields are required')
		}
		try {
			setLoading(true)
			const loginRequest = await axios.post('/user/login', {
				email,
				password,
			})
			const loginData = await loginRequest.data
			dispatch(addUserData(loginData))
			Cookies.set('UserToken', loginData.token)
			navigate('/')
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<div className='h-screen w-screen'>
			<div className='grid lg:grid-cols-2 grid-cols-1 h-full'>
				<div className=' flex items-center justify-center'>
					<div className=' sm:w-3/5 w-full md:p-0 sm:p-10 p-7'>
						<form onSubmit={handleSubmit}>
							<h3 className='md:text-4xl text-3xl text-left font-bold'>
								Login into account
							</h3>
							<p className='text-lg mt-3 text-gray-500'>
								Use your credentials to access your account.
							</p>
							<div className='form-control mt-8 flex flex-col'>
								<label
									htmlFor='email'
									className='md:text-lg  font-medium '>
									Email
								</label>
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='border p-3 rounded-lg mt-2 outline-none '
									placeholder='Please enter you email'
								/>
							</div>
							<div className='form-control mt-3 flex flex-col'>
								<label
									htmlFor='password'
									className='md:text-lg font-medium'>
									Password
								</label>
								<input
									type='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='border p-3 rounded-lg mt-2 outline-none'
									placeholder='Please enter you password'
								/>
							</div>
							<button
								type='submit'
								className='w-full flex items-center justify-center cursor-pointer active:scale-[.99] bg-[#DACDF4] p-3 rounded-lg text-center mt-4 font-medium'>
								{loading && (
									<Icon
										icon='line-md:loading-loop'
										width='20'
										height='20'
										className={`mr-2`}
									/>
								)}
								Login
							</button>
							<div className='text-center mt-4  text-md'>
								Don't have an account?{' '}
								<Link to={'/register'} className='font-medium'>
									Register
								</Link>
							</div>
						</form>
					</div>
				</div>
				<div className='border lg:flex hidden items-center justify-center bg-[#EAE8E2]'>
					<img src='/register.svg' alt='' />
				</div>
			</div>
		</div>
	)
}

export default Login
