// Import style
import './assets/style/scss/style.scss'

import React, {useState} from "react";

import {db} from "./services/firebase";
import {addTodo, getTodo} from "./services/dbClient.ts";

import InputForm from "./components/InputForm.tsx";
import SignUp from "./components/SignUp.tsx";
import LogInOut from "./components/LogInOut.tsx";

import {ITodo} from "./types";
import {getAuth, signOut, User} from "firebase/auth";


const App = () => {
	const [data, setData] = useState<ITodo[]>([])
	const [user, setUser] = useState<User | undefined>()

	const userLogIn = async (user: User) => {
		setUser(user)
		await getTodos()
	}

	const userLogOut = async () => {
		try {
			await signOut(getAuth())
			console.log('logged out')
			setUser(undefined)
			setData([])
		} catch (err) {
			console.log(err)
		}
	}
 const getTodos = async () => {
	const todos = await getTodo(db)
	if (!todos || todos.length === 0) {
		console.log('No todos')
		return
	}
	setData(todos)
} 
const sendTodo = async (todo: ITodo) => {
		await addTodo(todo)
}

	return (
		<div id="app">
			<h1>TODO</h1>
			<InputForm userId={user?.uid} onAddTodo={sendTodo}/>

			{data && (
				<p>{data.map((t, index) => <span key={index}>{t.title}</span>)}</p>
			)}

			<div>

				<SignUp/>
				<LogInOut onUserLogIn={userLogIn} onUser={user} onUserLogOut={userLogOut}/>

			</div>

		</div>
	)
}

export default App
