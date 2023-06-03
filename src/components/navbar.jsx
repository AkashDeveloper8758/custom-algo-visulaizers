import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlgoType } from "../helpers/staticConstants";
import { NavContext } from "../providers/mainProviders";

const NavItem = ({ navTitle, routePath, navItemType }) => {
  const { navtype, setNavType } = useContext(NavContext);
  const location = useLocation()

  useEffect(()=>{
    let newLocation = Array.from(location.pathname).splice(1).join('')
    console.log('nav type :',newLocation)
    setNavType(newLocation)
  },[location.pathname])
  

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
        routePath={"balancer"}
        navItemType={AlgoType.Balancer}
      />
      <NavItem
        navTitle={"Knight Path"}
        routePath={"horsePath"}
        navItemType={AlgoType.KnightPath}
      />
      <NavItem
        navTitle={"N Queens"}
        routePath={"nqeens"}
        navItemType={AlgoType.NQueens}
      />
      <NavItem
        navTitle={"Path finding"}
        routePath={"pathFinder"}
        navItemType={AlgoType.PathFinderVisualizerr}
      />
     
    </div>
  );
};
