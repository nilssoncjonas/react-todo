
// Import style
import './assets/style/scss/style.scss'
import InputForm from "./components/InputForm.tsx";
import {useEffect, useState} from "react";
import {db} from "./services/firebase";

import { DocumentData} from "firebase/firestore";
import {getTodo} from "./services/dbClient.ts";
import SignUp from "./components/SignUp.tsx";



const App = () => {
	const [data, setData] = useState<DocumentData[] | null>(null)

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
	<InputForm />
	{/*<TodoList data={todos} />*/}
	<SignUp />
	</div>
  )
}

export default App
