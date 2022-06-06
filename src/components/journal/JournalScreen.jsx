import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
// import { NothingSelected } from './components/NothingSelected'
import { Sidebar } from './components/Sidebar';
import { NothingSelected } from './components/NothingSelected';

const JournalScreen = () => {
	const { active } = useSelector((state) => state.notes);
	return (
		<div className='journal__main-content'>
			<Sidebar />

			<main>
				{active ? <NoteScreen /> : <NothingSelected />}
				
			</main>
		</div>
	);
};

export default JournalScreen;
