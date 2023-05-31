import React from "react"
import {ITodo} from "../types";

interface IProp {
data: ITodo[]
}

const TodoList:React.FC<IProp> = ({ data }) => {
	console.log(data)
	return (
		<div className="todo__container">
			<p><span>Incomplete</span><span>Complete</span></p>
			<div className="todo__wrap">
				{data && (
					<>
					
					<ul>
						{data.filter((f) => f.completed === false).map((t, index) => <li key={index}>{t.title}</li>)}
					</ul>	
						
					<ul>
						{data.filter((f) => f.completed === true).map((t, index) => <li key={index} className="completed">{t.title}</li>)}
					</ul>
					
					</>
				)}
			</div>
			
		</div>
	)
}
export default TodoList