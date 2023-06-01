import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navbar";
import { AlgoType } from "./helpers/staticConstants";
import { NavContext } from "./providers/mainProviders";


function App() {
  const [navType, setNavtype] = useState(AlgoType.Balancer)
  return <div>
    <NavContext.Provider value={{
      navtype: navType,
      setNavType: setNavtype
    }} >
    <NavBar />
    </NavContext.Provider>
    <Outlet />
  </div>;
}

export default App;
