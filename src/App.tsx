// Import style
import './assets/style/scss/style.scss'

import {useState} from "react";

import {addTodo, deleteTodo, getTodo, updateTodo} from "./services/dbClient.ts";

import InputForm from "./components/InputForm.tsx";
import SignUp from "./components/SignUp.tsx";
import SignOut from "./components/SignOut.tsx";
import SignIn from "./components/SignIn.tsx";

import {ITodo} from "./types";
import {getAuth, signOut, User} from "firebase/auth";
import TodoList from "./components/TodoList.tsx";


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
			setData([])
			console.log('No todos')
			return
		}
		setData(todos)
	}
	const sendTodo = async (todo: ITodo) => {
		await addTodo(todo)
		await getTodos()
	}

	const delTodo = async (todo: ITodo) => {
		await deleteTodo(todo)
		await getTodos()
	}
	const togTodo = async (todo: ITodo) => {
		await updateTodo(todo)
		await getTodos()
	}
	const unfinishedTodos = data.filter(todo => !todo.completed)
	const finishedTodos = data.filter(todo => todo.completed)
	return (
		<div id="app">
			<h1>My ToDo App!</h1>
			<InputForm userId={user?.uid} onAddTodo={sendTodo}/>
			<div className="todo__container">
				
				{data.length > 0 && (
					<>
						<h2>Tasks</h2>
						<TodoList
							todos={unfinishedTodos}
							onToggle={togTodo}
							onDelete={delTodo}/>

						<TodoList
							todos={finishedTodos}
							onToggle={togTodo}
							onDelete={delTodo}/>
					</>
				)}
				
				{data.length === 0 && (
					<p>¯\_(ツ)_/¯ you have nothing to do!</p>
				)}
			</div>
			<div>
				<SignIn onUserLogIn={userLogIn} onUser={user}/>
				<SignUp/>
				<SignOut onUserLogOut={userLogOut}/>
			</div>

		</div>
	)
}

export default App
