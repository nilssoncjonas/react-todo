import {collection, getDocs, addDoc, doc, setDoc} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { db } from "./firebase.ts";
import { ITodo } from "../types";

export const  getTodo = async (db) =>  {
	const todoCol = collection(db, 'todo');
	const todoSnapshot = await getDocs(todoCol);
	return todoSnapshot.docs.map(doc => doc.data());
}

export const addTodo = async (data: ITodo) => {
	try {
		const docRef = await addDoc(collection(db, 'todo'), data)
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
