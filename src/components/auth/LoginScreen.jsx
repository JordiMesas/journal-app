import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

const LoginScreen = () => {
	// da acceso al dispatch normal

	const dispatch = useDispatch();	
	const { loading, msgError } = useSelector((state) => state.ui);
	
	const [formValues, handleInputChange] = useForm({
		email: 'jordimesas54@gmail.com',
		password: '123456',
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startLoginEmailPassword(email, password));
		}
	};

	const handleGoogleLogin = () => {
		dispatch(startGoogleLogin());
	};

	const isFormValid = () => {
		if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (password.length < 5) {
			dispatch(setError('Password should be at least 6 characters'));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className='auth__title mb-5'>Login</h3>

			<form onSubmit={handleLogin}>
				{msgError && <div className='auth__alert-error'>{msgError}</div>}
				<input
					className='auth__input'
					type='text'
					placeholder='email'
					name='email'
					autoComplete='off'
					value={email}
					onChange={handleInputChange}
				/>

				<input
					className='auth__input'
					type='password'
					placeholder='password'
					name='password'
					autoComplete='off'
					value={password}
					onChange={handleInputChange}
				/>

				<button className='btn btn-primary btn-block' type='submit' disabled={loading}>
					Login
				</button>

				<hr />

				<div className='auth__social-networks'>
					<p>Login with social networks</p>
					<div className='google-btn' onClick={handleGoogleLogin}>
						<div className='google-icon-wrapper'>
							<img
								className='google-icon'
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
								alt='google button'
							/>
						</div>
						<p className='btn-text'>
							<b>Sign in with google</b>
						</p>
					</div>
				</div>

				<Link className='link' to='/auth/register'>
					Create new account
				</Link>
			</form>
		</>
	);
};

export default LoginScreen;
