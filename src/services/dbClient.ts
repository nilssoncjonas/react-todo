import {addDoc, collection, doc, Firestore, getDocs, query, setDoc, where} from "firebase/firestore";
import {getAuth, updateProfile, User} from "firebase/auth";
import {db} from "./firebase.ts";
import {ITodo} from "../types";

const getCurrentUser =  () => {
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
	} catch (err) {
		console.log(err)
	}
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
		if (!user) { return	}
		await updateProfile(user, {displayName: displayName})
	} catch (err) {
		console.log(err)
	}
}
