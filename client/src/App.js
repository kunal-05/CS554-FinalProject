import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetailsPage from "./components/userDetails";
import EditUserDetailsPage from "./components/editProfile";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={UserDetailsPage} />
                <Route path="/edit" Component={EditUserDetailsPage} />
            </Routes>
        </Router>
    );
}

export default App;
