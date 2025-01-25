import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar/NavBar";
import HomePage from "./component/HomePage/HomePage";
import LoginPage from "./component/LogInPage/LoginPage";
import "index.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
