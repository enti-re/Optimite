import React from "react";

const Header = ({ appName, children }) => {
  return (
    <div className="flex flex-row justify-between items-center px-8 fixed w-full bg-black text-slate-100 h-16">
      <div className="font-extrabold text-2xl">{appName}</div>
      <div>{children}</div>
    </div>
  );
};

export default Header;
