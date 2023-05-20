import React from 'react'
import SiderBar from '../components/SiderBar'
import { Outlet } from 'react-router-dom'

const Home = () => {
	return (
		<div>
			<div
				id='full-screen-absoluter'
				className='fixed h-screen w-screen bg-black/[.5] hidden z-20'
			/>
			<div className='flex'>
				<SiderBar />
				<div className='w-full lg:pl-72 h-screen lg:px-8 px-5 '>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Home
