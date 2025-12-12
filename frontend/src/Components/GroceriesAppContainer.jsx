import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer() {
  /////////// States ///////////
  const [productQuantity, setProductQuantity] = useState();
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);
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

  //////////useEffect////////

  useEffect(() => {
    handleProductsFromDB();
  }, []);

  ////////Handlers//////////
  const initialProductQuantity = (prods) =>
    prods.map((prod) => {
      return { id: prod.id, quantity: 0 };
    });

  const handleProductsFromDB = async () => {
    try {
      await axios.get("http://localhost:3000/products").then((result) => {
        setProductList(result.data);
        setProductQuantity(initialProductQuantity(result.data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } else {
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
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEditProduct = (product) => {
    /*setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      _id: product._id,
    });
    setIsEditing(true);*/
    navigate("/edit-product", { state: product });
    setPostResponse("");
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then((result) => {
          console.log(result);
          setPostResponse(
            `${result.data.productName} deleted\n with id: ${result.data.id}`
          );
        });
      handleProductsFromDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = (productId) => {
    const product = productList.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  /////////Renderer
  return (
    <div>
      <div>
        <NavBar quantity={cartList.length} />
        <div className="GroceriesApp-Container">
          <div className="FilterPrice">
            <h3>Filter Price</h3>
            <form>
              <input
                type="radio"
                id="all"
                name="price"
                value="all"
              />
              <label htmlFor="all">Show All</label>
              <br></br>
              <input
                type="radio"
                id="1"
                name="price"
                value="1"
              />
              <label htmlFor="1">&lt; 1.00$</label>
              <br></br>
              <input
                type="radio"
                id="2"
                name="price"
                value="2"
              />
              <label htmlFor="2">&lt; 2.00$</label>
              <br></br>
              <input
                type="radio"
                id="4"
                name="price"
                value="4"
              />
              <label htmlFor="4">&lt; 4.00$</label>
              <br></br>
              <input
                type="radio"
                id="6"
                name="price"
                value="6"
              />
              <label htmlFor="6">&lt; 6.00$</label>
              <br></br>
              <input
                type="radio"
                id="9"
                name="price"
                value="9"
              />
              <label htmlFor="9">&lt; 9.00$</label>
            </form>
          </div>
          {!currentUser || !currentUser.isAdmin ? (
            <ProductsContainer
              products={productList}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
              handleAddToCart={handleAddToCart}
              productQuantity={productQuantity}
            />
          ) : (
            <ProductsContainer
              products={productList}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
              handleAddToCart={handleAddToCart}
              productQuantity={productQuantity}
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}
          <CartContainer
            cartList={cartList}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}
