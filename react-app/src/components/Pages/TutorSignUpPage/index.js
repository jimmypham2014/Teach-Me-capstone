import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp, tutorSignUp } from "../../../store/session";
import './TutorSignUpPage.css'


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
		<div className='sign_up_container'>

			<div>
			<h1>Personal Info</h1>
			<h5>Tell us a bit about yourself. This information will appear on your public profile, so that potential students can get to know you better.</h5>
			</div>

			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>

				<div className ='full_name' id='detail_container'>

					<label className='detail'> Full Name </label>

						<div className='first_last'>
							<div>
							<input
							type="text"
							value={firstName}
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
							required
							/>
							</div>

							<div>
							<input
							type="text"
							value={lastName}
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
							required
							/>
							</div>
						
					</div>

					<div></div>
				
				</div>

				<div className='email_container' id='detail_container' >

					<div className='email'>
						Email
					</div>
					
					<div className='email_input'>
						<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						/>
					</div>
		
				</div>



				<div id='detail_container' >
                <label>Education</label>
					<div>
					<input
						type="text"
						value={education}
						onChange={(e) => setEducation(e.target.value)}
						required
					/>
					</div>
			
				</div>


				<div id='detail_container'>
                <div>Credentials</div>
					<div>
					<input
						type="text"
						value={credentials}
						onChange={(e) => setCredentials(e.target.value)}
						required
					/>
					</div>
				</div>

				<div id='detail_container'>
				<div>Username</div>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				

				</div>

				<div id='detail_container'>
				<div>Password</div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				
				</div>

				<div id='detail_container'>
				<div>Confirm Password</div>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				

				</div>



				<button className='become_a_tutor_signup' type="submit"><span>Sign Up</span></button>
			</form>
			</div>
	);
}

export default TutorSignUp;