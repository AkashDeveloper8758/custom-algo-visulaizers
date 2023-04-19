import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navbar";


function App() {
  return <div>
    <NavBar />
    <Outlet />
  </div>;
}

export default App;
