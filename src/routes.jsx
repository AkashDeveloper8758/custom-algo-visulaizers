import { createBrowserRouter } from "react-router-dom";
import Balancer from "./algos/balancer";
import KnightPath from "./algos/knightPath";
import Nqueens from "./algos/nQueens";
import App from "./App";


export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
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
    ]
  },
  
]);