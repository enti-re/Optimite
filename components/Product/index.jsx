import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash } from "react-feather";
import { AppContext } from "@/pages/_app";

const Product = ({ product, onDelete }) => {
  const { handleProduct } = useContext(AppContext);
  return (
    <div className="flex flex-col border-2 w-90 h-90 justify-center items-center p-8 rounded-lg bg-white ">
      <Link href={`/info/${product.id}`}>
        <div className="h-48">
          <img src={product.image} width={120} height={200} />
        </div>
      </Link>
      <div className="flex flex-col justify-center items-end p-4 gap-4 w-full h-full">
        <Link href={`/info/${product.id}`}>
          <div
            className="text-center white-space font-medium underline"
            onClick={() => {
              handleProduct(product);
            }}
          >
            {product.title}
          </div>
        </Link>
        <div className="flex flex-row justify-between w-full">
          <div>{product.price + " Rs"}</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              onDelete(product.id);
            }}
          >
            <Trash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
