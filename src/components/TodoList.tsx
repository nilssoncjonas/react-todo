import React from "react"
import {ITodo} from "../types";

interface IProp {
data: ITodo[]
}

const TodoList:React.FC<IProp> = ({ data }) => {
	console.log(data)
	return (
		<div>
			<ul>
				
			</ul>
		</div>
	)
}
export default TodoList