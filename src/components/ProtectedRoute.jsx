import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const usuarioStr =
    localStorage.getItem("usuario");

  if (!usuarioStr) {
    return <Navigate to="/" />;
  }

  const usuario = JSON.parse(usuarioStr);

  if (
    allowedRoles &&
    !allowedRoles.includes(usuario.cargo)
  ) {
    if (usuario.cargo === "Cliente") {
      return <Navigate to="/loja" />;
    }
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
