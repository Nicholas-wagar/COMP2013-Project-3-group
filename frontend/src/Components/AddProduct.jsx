import ProductForm from "./ProductForm";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function AddProduct() {
  // States
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const navigate = useNavigate();
  // ha
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/add-product", formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      // navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        formData={formData}
        isEditing={false}
      />
      <Link to="/main">click to go back to main</Link>
    </div>
  );
}
