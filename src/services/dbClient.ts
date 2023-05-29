import {collection, getDocs, addDoc, doc, setDoc, query, where} from "firebase/firestore";
import {User, updateProfile, getAuth} from "firebase/auth";
import {db} from "./firebase.ts";
import {ITodo} from "../types";

import { Firestore } from "firebase/firestore";

const auth = getAuth()
const user: User | null = auth.currentUser

export const getTodo = async (db: Firestore) => {
	try {
		const userTodos = query(collection(db, 'todos'), where('userId', '==', user?.uid));
		const querySnapshot = await getDocs(userTodos);
		return querySnapshot.docs.map(doc => doc.data()) as ITodo[]
	} catch (err) {
		console.log(err)
	}
}
export const addTodo = async (data: ITodo) => {
	try {
		const docRef = await addDoc(collection(db, 'todos'), data)
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
		if (!auth.currentUser) { return	}
		await updateProfile(auth.currentUser, {displayName: displayName})
	} catch (err) {
		console.log(err)
	}
}
