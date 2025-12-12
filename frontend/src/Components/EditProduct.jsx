import ProductForm from "./ProductForm";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
  //load user
  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      return "";
    }
    //Decode token to extract username + admin status
    try {
      const decodedToken = jwtDecode(jwtToken);
      return {
        username: decodedToken.username,
        isAdmin: decodedToken.isAdmin,
      };
    } catch {
      return "";
    }
  });

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  //if not a user or admin
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/not-authorized");
    } 
  }, [currentUser, navigate]);
  //product data
  const stateFormData = location.state;
  const [postResponse, setPostResponse] = useState("");
  const isEditing = true;
  const [formData, setFormData] = useState({
    productName: stateFormData.productName,
    brand: stateFormData.brand,
    image: stateFormData.image,
    price: stateFormData.price,
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      handleUpdateProduct(stateFormData._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={true}
      />
      <br />
      <br />
      <br />
      <Link to="/main">Click here to go back to main page</Link>
    </div>
  );
}