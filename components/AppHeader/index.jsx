import React, { useContext } from "react";
import Button from "../Button";
import SortDropdown from "../SortDropdown";
import { HomePageContext } from "@/containers/HomePage";

const AppHeader = () => {
  const { handlePopupVisibility } = useContext(HomePageContext);

  return (
    <div className="flex flex-row gap-4">
      <SortDropdown />
      <Button title={"Add Product"} onClick={handlePopupVisibility} />
    </div>
  );
};

export default AppHeader;
