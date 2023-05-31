import {addDoc, updateDoc, collection, doc, getDocs, query, setDoc, where, deleteDoc} from "firebase/firestore";
import {getAuth, updateProfile, User} from "firebase/auth";
import {db} from "./firebase.ts";
import {ITodo} from "../types";


const getCurrentUser = () => {
	const auth = getAuth()
	return auth.currentUser
}

export const getTodo = async () => {

	try {
		const user = await getCurrentUser()
		if (!user) {
			console.log('User not signed in')
			return
		}
		const userTodos = query(collection(db, 'todos'), where('userId', '==', user?.uid));
		const querySnapshot = await getDocs(userTodos);
		return querySnapshot.docs.map(doc => doc.data()) as ITodo[]
	} catch (err) {
		console.log(err)
	}
}
export const addTodo = async (todo: ITodo) => {
	try {
		const docRef = await addDoc(collection(db, 'todos'), todo)
		console.log(docRef.id)
		const newId = docRef.id
		const idRef = doc(db, 'todos', docRef.id)
		await updateDoc(idRef,
			{id: newId}
		)
	} catch (err) {
		console.log(err)
	}
}

export const updateTodo = async (todo: ITodo) => {
	const data = {
		completed: !todo.completed
	}
	await updateDoc(doc(db, 'todos', todo.id), data)
} 

export const deleteTodo = async (todo: ITodo) => {
	await deleteDoc(doc(db, 'todos', todo.id))
}

export const addUser = async (data: User, displayName: string) => {
	const newUser = {
		email: data.email,
		isVerified: data.emailVerified,
		uid: data.uid,
		createdAt: data.metadata.creationTime,
		displayName: displayName
	}
	try {
		const userRef = doc(db, 'users', data.uid)
		await setDoc(userRef, newUser)
		const user = await getCurrentUser()
		if (!user) {
			return
		}
		await updateProfile(user, {displayName: displayName})
	} catch (err) {
		console.log(err)
	}
}
