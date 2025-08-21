import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ isLoggedIn, isAuthReady, children }) {
  const location = useLocation();

  if (!isAuthReady) return null;

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAuthReady: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
