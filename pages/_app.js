import "@/styles/globals.css";
import { createContext, useState } from "react";

export const AppContext = createContext();
export default function App({ Component, pageProps }) {
  const [product, setProduct] = useState({});
  const handleProduct = (data) => setProduct(data);
  return (
    <AppContext.Provider value={{ product, handleProduct }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
