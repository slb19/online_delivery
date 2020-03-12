import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from "./context/auth/AuthState.js"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <AuthState>
        <App />
        </AuthState>
        , document.getElementById('root'));

serviceWorker.unregister();
