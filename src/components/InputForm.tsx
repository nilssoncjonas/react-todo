import React, {useState} from 'react';
import {ITodo} from "../types";


interface Prop {
	userId: string | undefined,
	onAddTodo: (todo: ITodo) => void
}

const InputForm: React.FC<Prop> = ({userId, onAddTodo}) => {
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const newTodo: ITodo = {
			title: newTodoTitle,
			completed: false,
			createdAt: new Date(Date.now()).toLocaleString(),
			userId: userId
		}
		onAddTodo(newTodo)
		setNewTodoTitle('')
	}

	return (
		<div className="form__container">
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