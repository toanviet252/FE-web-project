import "./App.scss";
import HomePage from "./Components/HomePage/HomePageComponent";
import Footer from "./Components/Footer/FooterComponent";
import HeaderComponent from "./Components/Header/HeaderComponent";
import ProductTable from "./Components/ProductTable/ProductTableComponent";
import { Routes, Route } from "react-router-dom";
import BuyerPage from "./Components/Buyer/ProductList/BuyerComponent";
import { ProductData } from "./shared/dataTable";
import ProductDetail from "./Components/Buyer/ProductDetail/ProductDetailComponent";
import CartDetail from "./Components/Buyer/CartDetail/CartDetailComponent";

function App() {
  return (
    <>
      <div className="wrapper">
        <HeaderComponent />
        <div className="main-body">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              index
              path="seller"
              element={<ProductTable dataProduct={ProductData} />}
            />
            <Route
              path="buyer"
              element={<BuyerPage dataProduct={ProductData} />}
            />

            <Route
              path="/buyer/:productId"
              element={<ProductDetail products={ProductData} />}
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
