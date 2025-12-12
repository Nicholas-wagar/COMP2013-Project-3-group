import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ quantity, handleLogout }) {
  // load user
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

  const navigate = useNavigate();

  return (
    <nav className="NavBar">
      <div className="NavBarTop">
        <div className="NavDiv NavUser">
          <h3>Hello, {currentUser.username}</h3>
        </div>
        <div className="NavDiv NavTitle">
          <h2>Groceries App 🍎</h2>
        </div>
        <div className="NavDiv NavCart">
          <img
            width="50px"
            src={
              quantity > 0
                ? "src/assets/cart-full.png"
                : "src/assets/cart-empty.png"
            }
          />
        </div>
      </div>
      <div>
        <div className="NavBtns">
          <button className="NavDiv NavLogoutBtn" 
          onClick={handleLogout}>Logout</button>
          {!currentUser || !currentUser.isAdmin ? null : (
            /*If admin, show add product button*/
            <button
              className="NavDiv NavProductBtn"
              onClick={() => navigate("/add-product")}
            >
              Add New Product
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
