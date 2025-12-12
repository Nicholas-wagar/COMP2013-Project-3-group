//protected route component to restrict access to authenticated users only
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
    const token = Cookies.get("jwt-authorization");

    if (!token) {
        return <Navigate to="/not-authorized" />;
    }
    return <Component />;
};