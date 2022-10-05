import { createContext, useState } from "react";
import { ProductData } from "../../shared/dataTable";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const addToCard = () => {
    setCount(count + 1);
  };
  const [products, setProducts] = useState(ProductData);
  const value = {
    products: products,
    setProducts: setProducts,
    count: count,
    addToCard: addToCard,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
