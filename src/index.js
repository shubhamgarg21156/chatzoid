import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { ToggleClassContextProvider } from './context/ToggleClassContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <ChatContextProvider>
      <ToggleClassContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ToggleClassContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
);