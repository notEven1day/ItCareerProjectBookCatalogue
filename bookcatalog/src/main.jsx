import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // React 18's new root API
import { Provider } from 'react-redux'; // Redux provider to wrap the app
import './index.css'; // Your global styles
import App from './App'; // Path to your main App component
import store from './store'; // Path to your Redux store

// Initialize the React app and wrap with Redux Provider
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}> {/* Wrap your App with the Redux Provider */}
            <App />
        </Provider>
    </StrictMode>
);