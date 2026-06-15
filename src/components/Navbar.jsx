import "../styles/Navbar.css";

function Navbar() {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  return (
    <div className="navbar-user">

      <span>
        Olá, {usuario?.nome} 👋
      </span>

      <small>
        {usuario?.cargo}
      </small>

    </div>
  );
}

export default Navbar;