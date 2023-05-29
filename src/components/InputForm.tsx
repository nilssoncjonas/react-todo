import React, {useState} from 'react';
import {ITodo} from "../types";
import {addTodo} from "../services/dbClient.ts";

interface Prop {
	userId: string
}

const InputForm: React.FC<Prop> = ({userId}) => {
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const newTodo: ITodo = {
			title: newTodoTitle,
			completed: false,
			createdAt: new Date(Date.now()).toLocaleString(),
			userId: userId
		}
		console.log(newTodo)
		try {
			await addTodo(newTodo)

		} catch (err) {
			console.log(err)
		}
	setNewTodoTitle('')
	}

	return (
		<div className="input__form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="..."
					onChange={e => setNewTodoTitle(e.target.value)}
					value={newTodoTitle}
				/>
				<button>Lägg till</button>
			</form>
		</div>
	);
}

export default InputForm;