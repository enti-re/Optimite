import React, { useContext, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { HomePageContext } from "@/containers/HomePage";

const AddProductPopup = ({
  handleProductChange,
  addProduct,
  onCancel,
  onSave,
  error,
}) => {
  return (
    <div className="w-80 flex flex-col gap-2">
      <div className="text-center text-2xl">Add Product</div>
      <Input
        title={"Image"}
        name={"image"}
        value={addProduct.image}
        error={error.image}
        handleChange={handleProductChange}
      />
      <Input
        title={"title"}
        name={"title"}
        value={addProduct.title}
        handleChange={handleProductChange}
      />
      <Input
        title={"Description"}
        name={"description"}
        value={addProduct.description}
        handleChange={handleProductChange}
      />
      <Input
        title={"Price"}
        name={"price"}
        value={addProduct.price}
        error={error.price}
        handleChange={handleProductChange}
      />
      <div className="flex gap-4">
        <Button title={"Cancel"} onClick={onCancel} />
        <Button
          title={"Save"}
          isDisable={
            addProduct.title.length === 0 ||
            addProduct.price.length === 0 ||
            addProduct.description.length === 0 ||
            addProduct.image.length === 0
          }
          onClick={onSave}
        />
      </div>
    </div>
  );
};

export default AddProductPopup;
