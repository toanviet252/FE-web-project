import { createContext, useState } from "react";
import { ProductData } from "../../shared/dataTable";

const addCartItem = (cartItems, productAdd) => {
  //Kiểm tra đã tồn tại sản phẩm trong cart chưa
  const existItem = cartItems.find((cartitem) => cartitem.id === productAdd.id);
  //Nếu đã có, tăng số lượng lên 1
  if (existItem) {
    return cartItems.map((item) =>
      item.id === productAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  //Nếu không, trả về một mảng chứa object item mới
  return [...cartItems, { ...productAdd, quantity: 1 }];
};

export const CartContext = createContext();
export const CardContextProvider = ({ children }) => {
  // eslint-disable-next-line
  const [products, setProducts] = useState(ProductData);
  //Open Cart
  const [isOpenCart, setIsOpenCart] = useState(false);
  const toogleCheckoutCart = () => {
    setIsOpenCart(!isOpenCart);
  };

  //Add item to Cart
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = (productAdd) => {
    setCartItems(addCartItem(cartItems, productAdd));
    setCount(count + 1);
  };
  const value = {
    products: products,
    isOpenCart: isOpenCart,
    toogleCheckoutCart: toogleCheckoutCart,
    count: count,
    addItemToCart: addItemToCart,
    cartItems: cartItems,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
