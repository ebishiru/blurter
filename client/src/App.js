import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Pages/Main";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App;