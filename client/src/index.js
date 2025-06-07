import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import AllBlurtsProvider from "./Context/AllBlurtsContext";
import CurrentUserProvider from "./Context/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <AllBlurtsProvider>
                <CurrentUserProvider>
                    <App />
                </CurrentUserProvider>
        </AllBlurtsProvider>
    </>
)