import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './components/NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote } from '../../actions/notes';

export const NoteScreen = () => {
	//note que va cambianto de store
	const { active: note } = useSelector((state) => state.notes);
	const dispatch = useDispatch();
	const [formValues, handleInputChange, reset] = useForm(note);
	const { body, title } = formValues;

	// id de note actual del componente
	const activeId = useRef(note.id);

	useEffect(() => {
		if (note.id !== activeId.current) {
			reset(note);
			activeId.current = note.id;
		}
	}, [note, reset]);

	useEffect(() => {
		dispatch(activeNote(formValues.id, {...formValues}));
	}, [formValues, dispatch]);

	return (
		<div className='notes__main-content'>
			<NotesAppBar />
			<div className='notes__content'>
				<input
					type='text'
					placeholder='Some awesome title'
					className='notes__title-input'
					autoComplete='off'
					name='title'
					value={title}
					onChange={handleInputChange}
				/>
				<textarea
					placeholder='what happened today?'
					className='notes__textarea'
					autoComplete='off'
					name='body'
					value={body}
					onChange={handleInputChange}
				></textarea>
				
				{note.url && (
					<div className='notes__image'>
						<img
							src={note.url}
							alt='image'
						/>
					</div>
				)}
			</div>
		</div>
	);
};
