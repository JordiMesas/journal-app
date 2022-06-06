import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);
	
	
	const [formValues, handleInputChange] = useForm({
		name: 'Hernando',
		email: 'nando@gmail.com',
		password: '123456',
		password2: '123456',
	});

	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('name is required'));
			return false;
		}
		// Valida si el formato es de tipo email
		else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(
				setError(
					'Password should be at least 6 characters and match each other'
				)
			);
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className='auth__title mb-5'>Register</h3>

			<form onSubmit={handleRegister}>
				{
					msgError && 
					<div className='auth__alert-error'>{msgError}</div>
				}

				<input
					className='auth__input'
					type='text'
					placeholder='Name'
					name='name'
					autoComplete='off'
					onChange={handleInputChange}
					value={name}
				/>

				<input
					className='auth__input'
					type='text'
					placeholder='Email'
					name='email'
					autoComplete='off'
					onChange={handleInputChange}
					value={email}
				/>

				<input
					className='auth__input'
					type='password'
					placeholder='Password'
					name='password'
					autoComplete='off'
					onChange={handleInputChange}
					value={password}
				/>

				<input
					className='auth__input'
					type='password'
					placeholder='Confirm password'
					name='password2'
					autoComplete='off'
					onChange={handleInputChange}
					value={password2}
				/>

				<button className='btn btn-primary btn-block mb-5' type='submit'>
					Register
				</button>

				<Link className='link' to='/auth/login'>
					Already registered?
				</Link>
			</form>
		</>
	);
};

export default RegisterScreen;
