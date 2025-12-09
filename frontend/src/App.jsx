//import "./App.css";
//import products from "./data/products";
//import GroceriesAppContainer from "./Components/GroceriesAppContainer";
//  <GroceriesAppContainer products={products} />
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import CreateUserPage from "./Components/CreateUserPage";
import AddProduct from "./Components/AddProduct";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/main" element={<GroceriesAppContainer />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
