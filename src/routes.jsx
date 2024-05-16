import { createBrowserRouter, createHashRouter, redirect,Route  } from "react-router-dom";
import Balancer from "./algos/balancer";
import KnightPath from "./algos/knightPath";
import Nqueens from "./algos/nQueens";
import PathFinder from "./algos/pathFinder";
import ThiefAway from "./algos/thiefAway";
import App from "./App";


export const mainRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
    
    children: [
      
      {
        path: "/",
        loader: () => {
          return redirect("balancer");
        },
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
      {
        path: "thiefAway",
        element: <ThiefAway />,
      },
    ],
  },
]);
