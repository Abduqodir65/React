import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
    const isAuthenticated = useSelector(
        (state) => state.userAuth.isAuthenticated
    );

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
