import React, { createContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import Product from "@/components/Product";
import AppHeader from "@/components/AppHeader";
import AddProductPopup from "@/components/AddProductPopup";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

export const HomePageContext = createContext();

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [error, setError] = useState({
    image: false,
    title: false,
    description: false,
    price: false,
  });
  const [addProduct, setAddProduct] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const productsRes = await res.json();
        const productArray =
          JSON.parse(localStorage.getItem("productArray")) ?? [];
        if (productArray.length > 0)
          setProducts([...productsRes, ...productArray]);
        else setProducts([...productsRes]);
        setIsAddPopupVisible(false);
        setError({ title: false, image: false });
        setLoader(false);
      } catch (err) {
        alert("Unable to fetch data");
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    setAddProduct({ ...addProduct, [event.target.name]: event.target.value });
  };

  const handleChangeClose = () => {
    setIsAddPopupVisible(false);
    setError({
      price: false,
      image: false,
    });
    setAddProduct({
      image: "",
      title: "",
      description: "",
      price: "",
    });
  };

  const handlePopupVisibility = () => {
    setIsAddPopupVisible(true);
  };

  const sortProducts = (order) => {
    const productsArr = products;
    let sortedProducts = [];
    if (order === "dsc")
      sortedProducts = productsArr.sort((a, b) => a.price - b.price);
    else sortedProducts = productsArr.sort((a, b) => b.price - a.price);
    setProducts([...sortedProducts]);
  };

  const handleSaveProduct = async () => {
    if (isNaN(addProduct.price)) {
      setError((prevState) => {
        return { ...prevState, price: true };
      });
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(addProduct),
    });
    const newProduct = await res.json();
    setProducts([
      ...products,
      { ...addProduct, id: newProduct.id + addProduct.title },
    ]);
    const productArray = JSON.parse(localStorage.getItem("productArray")) ?? [];
    if (productArray.length > 0) {
      localStorage.setItem(
        "productArray",
        JSON.stringify([
          ...productArray,
          { ...addProduct, id: newProduct.id + addProduct.title },
        ])
      );
    } else
      localStorage.setItem(
        "productArray",
        JSON.stringify([{ ...addProduct, id: newProduct.id }])
      );

    handleChangeClose();
    setAddProduct({
      image: "",
      title: "",
      description: "",
      price: "",
    });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => {
      if (product.id !== id) return product;
    });
    setProducts(updatedProducts);
    const productArray = JSON.parse(localStorage.getItem("productArray")) ?? [];
    if (productArray !== null) {
      const updatedLocalStorage = productArray.filter((product) => {
        if (product.id !== id) return product;
      });
      localStorage.setItem("productArray", JSON.stringify(updatedLocalStorage));
    }
  };

  const renderProducts = products.map((product) => {
    return (
      <Product
        key={product.id}
        onDelete={handleDeleteProduct}
        product={product}
      />
    );
  });

  if (loader) return <Loader />;

  return (
    <HomePageContext.Provider
      value={{ handlePopupVisibility, handleProductChange, sortProducts }}
    >
      <div
        className={`flex flex-col w-screen h-screen ${
          isAddPopupVisible && "overflow-hidden"
        }`}
      >
        <Header appName={"PRODUCTS"}>
          <AppHeader />
        </Header>
        <div className="grid grid-cols-4 bg-black gap-8 p-20">
          {renderProducts}
        </div>
        {isAddPopupVisible && (
          <Modal
            setIsModal={setIsAddPopupVisible}
            closeModal={handleChangeClose}
          >
            <AddProductPopup
              onSave={handleSaveProduct}
              onCancel={handleChangeClose}
              handleProductChange={handleProductChange}
              addProduct={addProduct}
              error={error}
            />
          </Modal>
        )}
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
