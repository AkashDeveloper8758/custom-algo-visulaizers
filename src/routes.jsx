import { createBrowserRouter, redirect } from "react-router-dom";
import Balancer from "./algos/balancer";
import KnightPath from "./algos/knightPath";
import Nqueens from "./algos/nQueens";
import PathFinder from "./algos/pathFinder";
import App from "./App";


export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/",
        loader:()=>{
          return redirect('balancer')
        }
      },
      {
        path: "balancer",
        element: <Balancer />,
      },
      {
        path: "horsePath",
        element: <KnightPath />,
      },
      {
        path: "nqeens",
        element: <Nqueens />,
      },
      {
        path: "pathFinder",
        element: <PathFinder />,
      },
    ]
  },
  
]);