import { RootState } from '../store/store'
import { IUser } from '../types/User.types'
import axios from '../config/axios'
import { addUser } from '../store/slices/UserSlice'

export const populateAllPosts = (postsArray: any, bookmarks = []) => {
	let explorePosts = postsArray.filter((post: any) => {
		if (post?.postImg !== '') {
			return post
		}
	})
	console.log(explorePosts)

	let bookmarkArray: any = bookmarks

	if (window.innerWidth > 768) {
		let arr1 = []
		let arr2 = []
		let arr3 = []
		let exp1 = []
		let exp2 = []
		let exp3 = []
		let book1 = []
		let book2 = []
		let book3 = []

		for (let i = 0; i < postsArray.length; i++) {
			if (i % 3 === 0) {
				arr1.push(postsArray[i])
			} else if (i % 3 === 1) {
				arr2.push(postsArray[i])
			} else {
				arr3.push(postsArray[i])
			}
		}

		for (let i = 0; i < explorePosts.length; i++) {
			if (i % 3 === 0) {
				exp1.push(explorePosts[i])
			} else if (i % 3 === 1) {
				exp2.push(explorePosts[i])
			} else {
				exp3.push(explorePosts[i])
			}
		}

		for (let i = 0; i < bookmarkArray.length; i++) {
			if (i % 3 === 0) {
				book1.push(bookmarkArray[i])
			} else if (i % 3 === 1) {
				book2.push(bookmarkArray[i])
			} else {
				book3.push(bookmarkArray[i])
			}
		}

		let completeArray = [arr1, arr2, arr3]
		explorePosts = [exp1, exp2, exp3]
		bookmarkArray = [book1, book2, book3]

		return {
			completeArray,
			explorePosts,
			bookmarkArray,
		}
	}
	if (window.innerWidth >= 640 && window.innerWidth <= 768) {
		let arr1 = []
		let arr2 = []
		let exp1 = []
		let exp2 = []
		let book1 = []
		let book2 = []

		for (let i = 0; i < postsArray.length; i++) {
			if (i % 2 === 0) {
				arr1.push(postsArray[i])
			} else {
				arr2.push(postsArray[i])
			}
		}

		for (let i = 0; i < explorePosts.length; i++) {
			if (i % 2 === 0) {
				exp1.push(explorePosts[i])
			} else {
				exp2.push(explorePosts[i])
			}
		}
		for (let i = 0; i < bookmarkArray.length; i++) {
			if (i % 2 === 0) {
				book1.push(bookmarkArray[i])
			} else {
				book2.push(bookmarkArray[i])
			}
		}

		let completeArray = [arr1, arr2]
		explorePosts = [exp1, exp2]
		bookmarkArray = [book1, book2]
		return {
			completeArray,
			explorePosts,
			bookmarkArray,
		}
	}
	if (window.innerWidth < 640) {
		return {
			completeArray: [postsArray],
			explorePosts: [explorePosts],
			bookmarkArray: [bookmarkArray],
		}
	}
}

export const checkPostsLength = (posts: any): any => {
	if (posts) {
		let count = 0
		if (posts[0] && posts[0].length > 0) {
			count = count + posts[0].length
		}
		if (posts[1] && posts[1].length > 0) {
			console.log(posts[1])
			count = count + posts[1].length
		}
		if (posts[2] && posts[2].length > 0) {
			console.log(posts[2])
			count = count + posts[2].length
		}
		return count
	}
}
