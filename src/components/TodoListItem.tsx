import React from "react"
import {ITodo} from "../types";

interface IProp {
	todo: ITodo
	onToggle: (todo: ITodo) => void
	onDelete: (todo: ITodo) => void
}

const TodoListItem: React.FC<IProp> = ({todo, onToggle, onDelete}) => {
	return (
		<li className={todo.completed ? 'completed' : ''}>
			<span className="todo-title">{todo.title}</span>
			<span className="ms-1">
			<span className="todo-toggle" role="button" onClick={() => onToggle(todo)}>{todo.completed ? '☑️' : '⬜'}</span>
			<span className="todo-delete" role="button" onClick={() => onDelete(todo)}>🗑️</span>
		</span>
		</li>

	)
}
export default TodoListItem