import React, {useState} from "react"
import {getAuth, signInWithEmailAndPassword, signOut, User} from 'firebase/auth'
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
			console.log('Logged in with UID: ',cred.user.uid)

		} catch (err) {
			console.log(err)
		}
	}

	const logOut = async () => {
		try {
			await signOut(getAuth())
			console.log('logged out')
			setUser(null)
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
					<p>Logged in as: {user.displayName}</p>
					<p>UID: {user.uid}</p>
					<p>Last logged in: {user.metadata.lastSignInTime}</p>
				</div>
			)}
			
				<h2>Sign Out</h2>
				<button onClick={logOut}>Sign Out</button>
			

		</>
	)
}
export default LogIn