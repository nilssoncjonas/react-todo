import React, {useState} from 'react';

const InputForm = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleSubmit = ( e: React.FormEvent ) => {
		e.preventDefault()
		console.log(newTodoTitle)
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