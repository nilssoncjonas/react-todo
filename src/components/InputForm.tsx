import React, {useState} from 'react';
import {ITodo} from "../types";
import {addTodo} from "../services/dbClient.ts";

const InputForm = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleSubmit = ( e: React.FormEvent ) => {
		e.preventDefault()
		const newTodo: ITodo = {
			title: newTodoTitle,
			completed: false,
			createdAt: new Date(Date.now()).toLocaleString()
		}
		addTodo(newTodo)
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