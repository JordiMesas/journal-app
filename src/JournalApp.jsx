import React from 'react';
// cumple la misma función que el useContext
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './routers/AppRouter';

const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default JournalApp
