import "./App.scss";
import HomePage from "./Components/HomePage/HomePageComponent";
import Footer from "./Components/Footer/FooterComponent";
import HeaderComponent from "./Components/Header/HeaderComponent";
import ProductTable from "./Components/ProductTable/ProductTableComponent";
import { Routes, Route } from "react-router-dom";
import BuyerPage from "./Components/Buyer/ProductList/BuyerComponent";
import ProductDetail from "./Components/Buyer/ProductDetail/ProductDetailComponent";
import CartDetail from "./Components/Buyer/CartDetail/CartDetailComponent";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext/CartContext";

function App() {
  const cartContext = useContext(CartContext);
  return (
    <>
      <div className="wrapper">
        <HeaderComponent />
        <div className="main-body">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route index path="seller" element={<ProductTable />} />
            <Route path="buyer" element={<BuyerPage />} />

            <Route
              path="/buyer/:productId"
              element={<ProductDetail products={cartContext.products} />}
            />
            <Route path="/buyer/cart" element={<CartDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
