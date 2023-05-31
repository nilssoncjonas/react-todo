import React from "react"
import {ITodo} from "../types";
import TodoListItem from "./TodoListItem.tsx";

interface IProp {
	todos: ITodo[]
	onToggle: (todo: ITodo) => void
	onDelete: (todo: ITodo) => void
}

const TodoList: React.FC<IProp> = ({todos, onToggle, onDelete}) => {
	console.log(todos)
	return (
		<>
				<ul>
					{
						todos.map((todo, index) => (
							<TodoListItem
								todo={todo}
								key={index}
								onToggle={onToggle}
								onDelete={onDelete}/>
						))
					}
				</ul>
		</>
	)
}
export default TodoList