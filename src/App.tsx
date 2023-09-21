import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./components";
import AuthDetails from "./context/userAuthContext";

function App() {
  return (
    <div className="App">
      <AuthDetails />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
