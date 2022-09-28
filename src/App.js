import "./App.scss";
import HomePage from "./Components/HomePage/HomePageComponent";
import Footer from "./Components/Footer/FooterComponent";
import HeaderComponent from "./Components/Header/HeaderComponent";
import ProductTable from "./Components/ProductTable/ProductTableComponent";
import { Routes, Route } from "react-router-dom";
import BuyerPage from "./Components/Buyer/BuyerComponent";

function App() {
  return (
    <>
      <div className="wrapper">
        <HeaderComponent />
        <div className="main-body">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route index path="seller" element={<ProductTable />} />
            <Route path="buyer" element={<BuyerPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
