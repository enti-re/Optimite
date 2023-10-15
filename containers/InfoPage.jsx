import React, { useContext } from "react";
import Header from "@/components/Header";
import { AppContext } from "@/pages/_app";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const InfoPage = () => {
  const { product } = useContext(AppContext);
  const router = useRouter();
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header appName={"Optimite Products"}>
        <Button
          title="Back"
          onClick={() => {
            router.back();
          }}
        />
      </Header>
      <div className="flex flex-row items-center gap-20 justify-center p-20 w-full h-full">
        <img src={product.image} width={400} height={400} />
        <div className="flex h-full w-full flex-col gap-4 justify-center items-start">
          <div className="text-7xl text-xl">{product.title}</div>
          <div>{product.description}</div>
          <div>
            <span className="font-medium">CATEGORY:</span>{" "}
            {product.category}
          </div>
          <div>
            <span className="font-medium">PRICE:</span> {product.price} Rs
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPage;
