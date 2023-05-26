import React, {useState} from "react"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../services/firebase.ts";


const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user
				console.log(user)
			})
			.catch((err) => {
				console.log(err.code)
			})
	}

	return (
		<>
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit}>

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

					<input type="submit" value="Sign Up"/>
				</form>
			</div>
		</>


	)
}
export default SignUp