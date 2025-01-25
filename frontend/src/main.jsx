import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId='752242068993-rnj7qsj5rbqo1ogkhj6vm9b710jss3se.apps.googleusercontent.com'>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GoogleOAuthProvider>
    </StrictMode>,
)
