import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  handleEditProduct,
  _id,
  handleDeleteProduct,
}) {
  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      return "";
    }
    //Decode token to extract username and admin status
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

  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      {!currentUser || !currentUser.isAdmin ? null : (
        <div>
          <button
            id="edit-button"
            onClick={() =>
              handleEditProduct({ price, brand, productName, image, _id })
            }
          >
            Edit
          </button>
          <button
            className="RemoveButton"
            onClick={() => handleDeleteProduct(_id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
