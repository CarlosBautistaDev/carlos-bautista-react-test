import { Link } from "react-router-dom";
import { useStore } from "../state/store";

const Navbar = () => {
  const { logout } = useStore();
  const isAuthenticated = !!localStorage.getItem("user"); 

  console.log(isAuthenticated);
  const logoutfull = () => {
    localStorage.clear();
    logout();
    window.location.href = "/products";
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    width: "100%",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#ffffff",
  };

  return (
    <nav style={navStyle}>
      {!isAuthenticated && (
        <Link to="/" style={linkStyle}>
          Inicio
        </Link>
      )}

      {isAuthenticated && (
        <>
          <Link to="/products" style={linkStyle}>
            Productos
          </Link>
          <Link to="/users" style={linkStyle}>
            Usuarios
          </Link>
          <button onClick={logoutfull} style={linkStyle}>
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
