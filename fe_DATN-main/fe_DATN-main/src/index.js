import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AppProvider } from "./context/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserProvider>    
            <AppProvider>    
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                </AppProvider>
        </UserProvider>
    </React.StrictMode>
);
