// Import style
import './assets/style/scss/style.scss'

import React, {useState} from "react";

import {db} from "./services/firebase";
import {getTodo} from "./services/dbClient.ts";

import InputForm from "./components/InputForm.tsx";
import SignUp from "./components/SignUp.tsx";
import LogIn from "./components/LogIn.tsx";

import {ITodo} from "./types";


const App = () => {
	const [data, setData] = useState<ITodo[] | null>(null)
	const [user, setUser] = useState('')

	const handelUserId = (userId: string) => {
		setUser(userId)
	}
	const onGetTodo = async () => {
		const todos = await getTodo(db)
		console.log('return',todos)
		setData(todos)
		console.log('setData',data)
	}	
	
	return (
		<div id="app">
			<h1>TODO</h1>
			<InputForm userId={user}/>
			<div>
				<h2>Get Todos</h2>
				<button onClick={onGetTodo}>Get Todos</button>
			</div>
			<SignUp/>
			<LogIn onHandelUserId={handelUserId}/>


		</div>
	)
}

export default App
