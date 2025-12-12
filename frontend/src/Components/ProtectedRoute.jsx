//protected route component to restrict access to authenticated users only
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
    const token = Cookies.get("jwt-authorization");

    if (!token) {
        return <Navigate to="/not-authorized" />;
    }
    //Decode token to extract admin status
    let decodedToken;
    try {
    decodedToken = jwtDecode(token);
    } catch {
    // Token is invalid or missing
    return <Navigate to="/not-authorized" replace />;
    }
    
    const isAuth = decodedToken.isAdmin;
    
    return isAuth ? <Component /> : <Navigate to="/"/>;


};