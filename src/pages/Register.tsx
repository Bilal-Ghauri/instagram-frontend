import React, { ChangeEvent, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useRegisterUserMutation } from '../store/api/userApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUserData } from '../store/slices/UserSlice'
import Cookies from 'js-cookie'

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	})
	const { name, email, password } = userData

	const [registerUser, { data, isLoading, error }] = useRegisterUserMutation()

	if (data) {
		Cookies.set('UserToken', data?.token)
		dispatch(addUserData(data))
		navigate('/')
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (name.trim() == '' || email.trim() == '' || password.trim() == '') {
			return alert('All fields are required')
		}
		try {
			const payload = await registerUser({
				name,
				email,
				password,
			}).unwrap()
			setUserData({
				name: '',
				email: '',
				password: '',
			})
		} catch (error: any) {}
	}

	return (
		<div className='h-screen w-screen'>
			<div className='grid lg:grid-cols-2 grid-cols-1 h-full'>
				<div className=' flex items-center justify-center'>
					<div className=' sm:w-3/5 w-full md:p-0 sm:p-10 p-7'>
						<form onSubmit={handleSubmit}>
							<h3 className='md:text-4xl text-3xl text-left font-bold'>
								Create New Account.
							</h3>
							<p className='text-lg mt-3 text-gray-500'>
								Add your credentials to create a new account.
							</p>
							<div className='form-control mt-8 flex flex-col'>
								<label
									htmlFor='name'
									className='md:text-lg  font-medium '>
									Name
								</label>
								<input
									type='text'
									name='name'
									value={name}
									onChange={handleChange}
									className='border p-3 rounded-lg mt-2 outline-none '
									placeholder='Please enter you email'
								/>
							</div>
							<div className='form-control mt-2 flex flex-col'>
								<label
									htmlFor='email'
									className='md:text-lg  font-medium '>
									Email
								</label>
								<input
									type='email'
									name='email'
									value={email}
									onChange={handleChange}
									className='border p-3 rounded-lg mt-2 outline-none  '
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
									name='password'
									value={password}
									onChange={handleChange}
									className='border p-3 rounded-lg mt-2 outline-none'
									placeholder='Please enter you password'
								/>
							</div>
							<button
								type='submit'
								className='w-full flex items-center justify-center cursor-pointer active:scale-[.99] bg-[#DACDF4] p-3 rounded-lg text-center mt-4 font-medium'>
								{isLoading && (
									<Icon
										icon='line-md:loading-loop'
										width='20'
										height='20'
										className={`mr-2`}
									/>
								)}{' '}
								Register
							</button>
							<div className='text-center mt-4  text-md'>
								Already have an account?{' '}
								<Link to={'/login'} className='font-medium'>
									Login
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

export default Register
