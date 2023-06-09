import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase.ts";
import { addUser } from "../services/dbClient.ts";


const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password)
			await addUser(user, displayName)
			setDisplayName('')
			setEmail('')
			setPassword('')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className="form__container">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>

					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="displayName"
						name="displayName"
						value={displayName}
						onChange={(event) => setDisplayName(event.target.value)}
						required
					/>
					
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>

					<input className="btn" type="submit" value="Sign Up"/>
				</form>
				<p>
				Already have an account?
				</p>
					
			</div>
		</>


	)
}
export default SignUp