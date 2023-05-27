import React, {useState} from "react"
import {signInWithEmailAndPassword, User} from 'firebase/auth'
import {auth} from '../services/firebase.ts'

interface Prop {
	onHandelUserId: (user: string) => void
}

const LogIn: React.FC<Prop> = ({onHandelUserId}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState<User | null>(null)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const cred = await signInWithEmailAndPassword(auth, email, password)
			onHandelUserId(cred.user.uid)
			setUser(cred.user)
			console.log(cred.user)
			console.log(cred.user.uid)

		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			<div>
				<h1>Log In ➡️</h1>
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

					<input type="submit" value="Log In"/>
				</form>
			</div>

			{user && (
				<div>
					<p>Logged in as: {user.email}</p>
					<p>Last logged in: {user.metadata.lastSignInTime}</p>
				</div>
			)}
			

		</>
	)
}
export default LogIn