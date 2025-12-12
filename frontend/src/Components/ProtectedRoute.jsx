//protected route component to restrict access to authenticated users only
import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
    const token = Cookies.get("jwt-authorization");

    if (!token) {
        return <Navigate to="/not-authorized" />;
    }
    const [currentUser, setCurrentUser] = useState(() => {
        if (!token) {
          return "";
        }
        //Decode token to extract admin status
        try {
          const decodedToken = jwtDecode(token);
          return {
            isAdmin: decodedToken.isAdmin,
          };
        } catch {
          return "";
        }
      });

     if(!currentUser.isAdmin) {
       return <Navigate to="/not-authorized" />
     }
         

    return <Component />;
};