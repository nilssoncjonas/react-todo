
// Import style
import './assets/style/scss/style.scss'
import InputForm from "./components/InputForm.tsx";
import React, {useEffect, useState} from "react";
import {db} from "./services/firebase";

import { DocumentData} from "firebase/firestore";
import {getTodo} from "./services/dbClient.ts";
import SignUp from "./components/SignUp.tsx";
import LogIn from "./components/LogIn.tsx";



const App = () => {
	const [data, setData] = useState<DocumentData[] | null>(null)
	const [ user, setUser] = useState('')
	
	
	const handelUserId = (userId: string) => {
		setUser(userId)
	}
	useEffect(() => {	
			getTodo(db)
				.then(r => {
					setData(r)
					console.log(r)
				} )
				.catch( err => console.log(err))
	}, [])
	
	return (
	<div id="app">
	<h1>TODO</h1>	
	<InputForm userId={user} />
	{/*<TodoList data={todos} />*/}
	<SignUp />
	<LogIn onHandelUserId={handelUserId} />
	</div>
  )
}

export default App
