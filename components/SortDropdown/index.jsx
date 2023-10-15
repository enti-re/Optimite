import { HomePageContext } from "@/containers/HomePage";
import React, { useCallback, useContext } from "react";

const SortDropdown = () => {
  const { sortProducts } = useContext(HomePageContext);
  return (
    <>
      <select
        className="bg-black"
        name="cars"
        id="cars"
        onChange={(event) => {
          sortProducts(event.target.value);
        }}
      >
        <option value="asc" selected disabled>
          Sort by Price
        </option>
        <option value="asc">High to Low</option>
        <option value="dsc">Low to High</option>
      </select>
    </>
  );
};

export default SortDropdown;
