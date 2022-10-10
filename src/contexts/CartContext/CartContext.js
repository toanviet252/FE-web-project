import { message, Modal } from "antd";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getProductsAndDocuments } from "../../utils/firebase/firebase";

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
//Hàm giảm số lượng product add
const removeCartItem = (cartItems, productRemove) => {
  //Kiểm tra đã tồn tại sản phẩm trong cart chưa
  const existItem = cartItems.find(
    (cartitem) => cartitem.id === productRemove.id
  );
  console.log("existItem", existItem);
  //Nếu đã có, giảm số lượng lên 1
  if (existItem) {
    if (existItem.quantity > 1) {
      return cartItems.map((item) =>
        item.id === productRemove.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    // Nếu số lượng = 1, xóa khỏi giỏ hàng
    return cartItems.filter((item) => item.id !== productRemove.id);
  }
};

export const CartContext = createContext();
export const CardContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //Lấy data từi Firestore và set vào products
  useEffect(() => {
    (async () => {
      setProducts(await getProductsAndDocuments());
    })();
  }, []);

  console.log(products);
  // useEffect(() => {
  //   addCollectionAndDocuments("products", ProductData);
  // }, []);

  //Các hàm thêm, sửa, xóa trong table
  const addProduct = useCallback((newProduct) => {
    setProducts((products) => [...products, newProduct]);
  }, []);
  const deleteProduct = useCallback((id) => {
    setProducts((products) => products.filter((ele) => id !== ele.id));
  }, []);
  const editProduct = useCallback((newRecord) => {
    setProducts((pre) => {
      return pre.map((product) => {
        if (product.id === newRecord.id) return newRecord;
        return product;
      });
    });
  }, []);

  //Open Cart
  const [isOpenCart, setIsOpenCart] = useState(false);
  const toogleCheckoutCart = () => {
    setIsOpenCart(!isOpenCart);
  };

  //Add item to Cart
  const [cartItems, setCartItems] = useState([]);
  // Variable to count product on cart
  const count = useMemo(
    () => cartItems.reduce((sum, cur) => sum + cur.quantity, 0),
    [cartItems]
  );
  const addItemToCart = (productAdd) => {
    setCartItems(addCartItem(cartItems, productAdd));
  };
  //Remove item from Cart
  const removeItemFromCart = (productRemove) => {
    setCartItems(removeCartItem(cartItems, productRemove));
  };
  //Delete item
  const deleteItem = (id) => {
    Modal.confirm({
      title: "Bạn có muốn sản phẩm khỏi giỏ hàng?",
      onOk: () => {
        setCartItems((products) => products.filter((ele) => id !== ele.id));
        message.info(`Đã xóa!`);
      },
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
    });
  };

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const newTotal = cartItems.reduce((total, curr) => {
      return total + curr.quantity * curr.cost;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const value = {
    products,
    addProduct,
    deleteProduct,
    editProduct,
    isOpenCart,
    toogleCheckoutCart,
    count,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    deleteItem,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
