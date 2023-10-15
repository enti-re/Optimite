import React from "react";

const Button = ({ title, onClick, isDisable = false }) => {
  return (
    <button
      className={`${
        isDisable ? "cursor-not-allowed bg-lime-100 text-zind-100" : "cursor-pointer bg-lime-300"
      }  text-black rounded-lg p-2 font-medium`}
      disabled={isDisable}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
