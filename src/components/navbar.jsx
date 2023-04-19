import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ navTitle, routePath }) => {
  return (
    <div>
      <Link to={routePath}>
        <div className=" p-4 font-semibold hover:bg-orange-200 ">
          {navTitle}
        </div>
      </Link>
    </div>
  );
};

export const NavBar = () => {
  return (
    <div className="rounded-sm w-full flex  bg-slate-300 ">
      <NavItem navTitle={"Balancer"} routePath={"/balancer"} />
      <NavItem navTitle={"Knight Path"} routePath={"/horsePath"} />
      <NavItem navTitle={"N Queens"} routePath={"/nqeens"} />
    </div>
  );
};
