import "./App.css";
//import products from "./data/products";
//import GroceriesAppContainer from "./Components/GroceriesAppContainer";
//  <GroceriesAppContainer products={products} />
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import CreateUserPage from "./Components/CreateUserPage";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import PageNotFound from "./Components/PageNotFound";
import NotAuthorized from "./Components/NotAuthorized";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/main" element={<ProtectedRoute Component={GroceriesAppContainer} />} />
          <Route path="/add-product" element={<ProtectedRoute Component={AddProduct} />} />
          <Route path="/edit-product" element={<ProtectedRoute Component={EditProduct} />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
