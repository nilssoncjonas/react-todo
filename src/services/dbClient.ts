import {collection, getDocs, addDoc, doc, setDoc, query, where} from "firebase/firestore";
import {User} from "firebase/auth";
import {db} from "./firebase.ts";
import {ITodo} from "../types";

export const getTodo = async (db, userId: string) => {
	try {
		const userTodo = query(collection(db, 'todos'), where('userId', '==', userId));
		const querySnapshot = await getDocs(userTodo);
		return querySnapshot.docs.map(doc => doc.data())
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
export const addUser = async (data: User) => {
	console.log(data)
	const user = {
		email: data.email,
		isVerified: data.emailVerified,
		uid: data.uid,
		createdAt: data.metadata.creationTime
	}
	try {
		const userRef = doc(db, 'users', data.uid)
		await setDoc(userRef, user)
	} catch (err) {
		console.log(err)
	}
}
