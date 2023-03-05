import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp, tutorSignUp } from "../../../store/session";


function TutorSignUp() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [is_student, setStudent] = useState(false)
    const [credentials,setCredentials] = useState('')
    const [education, setEducation] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [errors, setErrors] = useState([]);
	const history = useHistory()

	const handleSubmit = async (e) => {
console.log(is_student)
		e.preventDefault();
		if (password === confirmPassword) {
            
			await dispatch(tutorSignUp(firstName, lastName, is_student, credentials, education, username, email, password));
	
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
		history.push('/')
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>

				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
                <label>
					Education
					<input
						type="text"
						value={education}
						onChange={(e) => setEducation(e.target.value)}
						required
					/>
				</label>
                <label>
					Credentials
					<input
						type="text"
						value={credentials}
						onChange={(e) => setCredentials(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>



				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default TutorSignUp;