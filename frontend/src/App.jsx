import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar/NavBar"; // Navigation bar
import { HomePage } from "./component/HomePage/HomePage";
import LoginPage from "./component/LogInPage/LoginPage";
import ChatBot from "./component/ChatBot/ChatBot";
import FindDoctor from "./component/findDoctor/findDoctor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<LoginPage />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
      </Routes>
    </>
  );
}

export default App;
