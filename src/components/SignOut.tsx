import React from "react"

interface IProp {
onUserLogOut: () => void
}

const SignOut: React.FC<IProp> = ({ onUserLogOut }) => {
	return (
		<>
			<div className="form__container">
				<h2>Sign Out</h2>
				<button className="btn" onClick={onUserLogOut}>Sign Out</button>
			</div>
		</>
	)
}
export default SignOut