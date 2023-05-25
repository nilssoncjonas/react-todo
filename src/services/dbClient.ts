import {collection, getDocs, addDoc,} from "firebase/firestore";
import {db} from "./firebase.ts";
import {ITodo} from "../types";

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