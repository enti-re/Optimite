import React from "react";

const Input = ({ title, value, name, handleChange, error = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-24">{title}</div>
      <input
        autoComplete="off"
        className={`border-2 rounded-lg h-10 p-2 ${error ? "border-red" : ""}`}
        value={value}
        name={name}
        onChange={handleChange}
      />
      {error && title === "Price" && <div className="text-red-600">Price should be a number</div>}
      {error && title === "Image" && <div>image url invalid</div>}
    </div>
  );
};

export default Input;
