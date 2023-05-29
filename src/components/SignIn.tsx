import React, {useState} from "react"
import {signInWithEmailAndPassword, User} from 'firebase/auth'
import {auth} from '../services/firebase.ts'

interface Prop {
	onUserLogIn: (user: User) => void,
	onUser: User | undefined,
}

const SignIn: React.FC<Prop> = ({onUserLogIn, onUser}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const cred = await signInWithEmailAndPassword(auth, email, password)
			onUserLogIn(cred.user)
			setEmail('')
			setPassword('')
			console.log('Logged in with UID: ',cred.user.uid)
		} catch (err) {
			console.log(err)
		}
	}


	return (
		<>
			
			<div className="form__container">
				<h2>Log In</h2>
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

					<input className="btn" type="submit" value="Log In"/>
				</form>
				<p>
					Don't have an account?
				</p>
			</div>

			{onUser && (
				<div>
					<p>Logged in as: {onUser.displayName}</p>
					<p>UID: {onUser.uid}</p>
					<p>Last logged in: {onUser.metadata.lastSignInTime}</p>
				</div>
			)}		

		</>
	)
}
export default SignIn