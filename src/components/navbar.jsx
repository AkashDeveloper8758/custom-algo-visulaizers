import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AlgoType } from "../helpers/staticConstants";
import { NavContext } from "../providers/mainProviders";

const NavItem = ({ navTitle, routePath, navItemType }) => {
  const { navtype, setNavType } = useContext(NavContext);
  const isActive = navtype === navItemType;
  return (
    <div
      onClick={() => {
        setNavType(navItemType);
      }}
    >
      <Link to={routePath}>
        <div
          className={` p-4 font-semibold hover:bg-orange-300 ${
            isActive ? "bg-orange-300" : ""
          } `}
        >
          {navTitle}
        </div>
      </Link>
    </div>
  );
};

export const NavBar = () => {
  return (
    <div className="rounded-sm w-full flex  bg-slate-300 ">
      <NavItem
        navTitle={"Balancer"}
        routePath={"/balancer"}
        navItemType={AlgoType.Balancer}
      />
      <NavItem
        navTitle={"Knight Path"}
        routePath={"/horsePath"}
        navItemType={AlgoType.KnightPath}
      />
      <NavItem
        navTitle={"N Queens"}
        routePath={"/nqeens"}
        navItemType={AlgoType.NQueens}
      />
      <NavItem
        navTitle={"Path finding"}
        routePath={"/nqeens"}
        navItemType={AlgoType.PathFinderVisualizerr}
      />
      <NavItem
        navTitle={"Shortest path"}
        routePath={"/shortestPath"}
        navItemType={AlgoType.ShortestPath}
      />
    </div>
  );
};
