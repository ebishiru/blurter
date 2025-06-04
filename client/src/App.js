import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp/index";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App;