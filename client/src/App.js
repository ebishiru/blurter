import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignUp from "./Pages/SignUp/index";
import Home from "./Pages/Home";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/landingPage" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/landingPage" />} />
            </Routes>
        </Router>
    )
}

export default App;