"use client";

import React from "react";
import { cloudy } from "../utils/Icons";
import Search from "./Search";
import ModeToggle from "./darkMode/ModeToggle";

const Navbar = () => {
  return (
    <div className="w-full py-4 flex justify-between items-center">
      <div>{cloudy}</div>
      <div className="flex items-center shrink-0 gap-2">
        <Search />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
