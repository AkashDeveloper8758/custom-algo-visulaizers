import { createContext } from "react";
import { AlgoType } from "../helpers/staticConstants";

export const NavContext = createContext({
    navtype: AlgoType.Balancer,
    setNavType: (navType)=>{}
})