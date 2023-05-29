// Import style
import './assets/style/scss/style.scss'

import React, {useState} from "react";

import {addTodo, getTodo} from "./services/dbClient.ts";

import InputForm from "./components/InputForm.tsx";
import SignUp from "./components/SignUp.tsx";
import SignOut from "./components/SignOut.tsx";
import SignIn from "./components/SignIn.tsx";

import {ITodo} from "./types";
import {getAuth, signOut, User} from "firebase/auth";



const App = () => {
	const [data, setData] = useState<ITodo[]>([])
	const [user, setUser] = useState<User | undefined>()
// const [] = useState()

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
	const todos = await getTodo()
	if (!todos || todos.length === 0) {
		console.log('No todos')
		return
	}
	setData(todos)
} 
const sendTodo = async (todo: ITodo) => {
	await addTodo(todo)
	await getTodos()
}

	return (
		<div id="app">
			<h1>TODO</h1>
			<InputForm userId={user?.uid} onAddTodo={sendTodo}/>

			{data && (
				<ul>
					{data.map((t, index) => <li key={index}>{t.title}</li>)}
				</ul>
			)}

			<div>
			
				<SignUp/>				
				<SignIn onUserLogIn={userLogIn} onUser={user}/>
				<SignOut onUserLogOut={userLogOut} />
			</div>

		</div>
	)
}

export default App
