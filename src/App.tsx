
import "./App.css";
import { Route, Routes} from "react-router-dom";
import { Home, Login } from "./components";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
