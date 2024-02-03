import React, { useEffect, useState, useMemo } from 'react'
import {
	handleHideSideBar,
	handleShowSideBar,
} from '../../utils/document.utils.d'
import { Icon } from '@iconify/react'
import AddPost from './AddPost'
import NotificationModel from './NotificationModel'
import axios from '../../config/axios'
import { IUser } from '../../types/User.types'

import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom'
import { components } from 'react-select'

const AppBar = () => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const [mobileSize, setMobileSize] = useState(false)
	const [hideIcons, setHideIcons] = useState(false)
	const [openModel, setOpenModel] = useState(false)
	const [selectStyle, setSelectStyle] = useState('w-96')
	const [inputValue, setInputValue] = useState('')
	const [searchUsers, setSearchUsers] = useState([])

	// const searchUserApi = async () => {
	//   axios
	//     .post("/user/find/user", { name: inputValue })
	//     .then((res) => setSearchUsers(res.data));
	// };

	useEffect(() => {
		// searchUserApi();
	}, [inputValue])

	window.addEventListener('click', (e: MouseEvent) => {
		let target = e.target as HTMLDivElement
		if (target.id == 'add-post') {
			target.style.display = 'none'
		}

		if (target?.id === 'full-screen-absoluter') {
			handleHideSideBar('sideBar')
			handleHideSideBar('notification-offCanvas')
		}

		e.target?.addEventListener('click', (event) => {
			if (!target?.classList.contains('input-text')) {
				setIsOpen(false)
			}
		})
	})

	const applyStyles = () => {
		if (window.innerWidth < 640) {
			setHideIcons(false)
			setSelectStyle('w-64 hidden')
			setMobileSize(true)
		} else {
			setHideIcons(true)
			setSelectStyle('w-80')
			setMobileSize(false)
		}
	}

	useEffect(() => {
		applyStyles()
	}, [])

	window.onresize = applyStyles

	const customStyles = {
		option: (baseStyles: any, state: any) => ({
			...baseStyles,
			display: 'flex',
			alignItems: 'center',
			fontSize: '20px',
			cursor: 'pointer',
		}),
		optionImg: {
			width: 40,
			height: 40,
			borderRadius: '50%',
			marginRight: 10,
		},
	}

	const optionWithImage = (props: any) => {
		return (
			<components.Option {...props}>
				<img
					src={
						props.data.profilePicture ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXH0iM58q-QakVgcQO-IGB05iAJBkEeh6KQ&usqp=CAU'
					}
					style={customStyles.optionImg}
				/>
				{props.data.label}
			</components.Option>
		)
	}

	const loadOptions = async (userName: string) => {
		try {
			const response = await axios.post(`/user/find/user`, {
				name: userName,
			})
			const data = await response.data
			return data.map((option: any) => ({
				value: option._id,
				label: option.name,
				profilePicture: option.profilePicture,
			}))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex sticky top-0 left-0 bg-white lg:py-5 py-3 z-20 items-center justify-between'>
			<div className='flex items-center mr-4'>
				{!hideIcons && (
					<Icon
						icon='ei:navicon'
						width='25'
						height='25'
						className={
							'text-primary-dark cursor-pointer mr-4 lg:hidden block'
						}
						onClick={() => {
							handleShowSideBar('sideBar')
						}}
					/>
				)}

				{mobileSize && (
					<div
						onClick={() => setHideIcons(!hideIcons)}
						className='rounded-full cursor-pointer bg-gray-200 '>
						<Icon
							icon={
								hideIcons == true
									? 'ic:round-arrow-back'
									: 'material-symbols:search'
							}
							width={'20'}
							height={'20'}
							className={hideIcons == true ? 'm-1' : 'm-2'}
						/>
					</div>
				)}

				{mobileSize && hideIcons && (
					<AsyncSelect
						loadOptions={loadOptions}
						className={'w-64 ml-4'}
						styles={customStyles}
						components={{ Option: optionWithImage }}
						onChange={(e: any) => {
							navigate(`/profile/${e.value}`)
						}}
					/>
				)}

				<>
					<AsyncSelect
						loadOptions={loadOptions}
						className={selectStyle}
						styles={customStyles}
						components={{ Option: optionWithImage }}
						onChange={(e: any) => {
							navigate(`/profile/${e.value}`)
						}}
					/>
				</>
			</div>

			<div className='flex items-center'>
				{mobileSize && !hideIcons && (
					<div className='flex items-center'>
						<Icon
							icon='jam:messages-f'
							width='33'
							height='33'
							className={'text-gray-500 cursor-pointer mr-5'}
						/>
						<Icon
							icon='material-symbols:notifications'
							width='33'
							height='33'
							className={'text-gray-500 cursor-pointer'}
							onClick={() => setOpenModel(true)}
						/>
						<button
							onClick={() => {
								const documentElement =
									document.getElementById('add-post')

								if (documentElement) {
									documentElement.style.display = 'flex'
								}
							}}
							className='bg-primary flex items-center md:px-7 px-3  md:py-4 py-3 font-medium rounded-xl text-white active:scale-[.98] ml-5'>
							<Icon
								icon='el:plus-sign'
								height={'20'}
								className='mr-2'
								width={'20'}
							/>{' '}
							Add Post
						</button>
					</div>
				)}

				{!mobileSize && (
					<div className='flex items-center'>
						<Icon
							icon='jam:messages-f'
							width='33'
							height='33'
							className={'text-gray-500 cursor-pointer mr-5'}
						/>
						<Icon
							icon='material-symbols:notifications'
							width='33'
							height='33'
							className={'text-gray-500 cursor-pointer'}
							onClick={() => setOpenModel(true)}
						/>
						<button
							onClick={() => {
								const documentElement =
									document.getElementById('add-post')

								if (documentElement) {
									documentElement.style.display = 'flex'
								}
							}}
							className='bg-primary flex items-center md:px-7 px-3  md:py-4 py-3 font-medium rounded-xl text-white active:scale-[.98] ml-5'>
							<Icon
								icon='el:plus-sign'
								height={'20'}
								className='mr-2'
								width={'20'}
							/>{' '}
							Add Post
						</button>
					</div>
				)}

				<NotificationModel
					openModel={openModel}
					setOpenModel={setOpenModel}
				/>

				<AddPost />
			</div>
		</div>
	)
}

export default AppBar
