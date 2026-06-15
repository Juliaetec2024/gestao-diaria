import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBox,
  FaExchangeAlt,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  function sair() {
    localStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <div className="sidebar">

      <h2>Gestão Diária</h2>

      <nav>

        <Link to="/dashboard">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/produtos">
          <FaBox />
          Produtos
        </Link>

        <Link to="/movimentacao">
          <FaExchangeAlt />
          Movimentação
        </Link>

        <li>
          <Link to="/pedidos">
            📦 Pedidos
          </Link>
        </li>

        <li>
          <Link to="/loja">
            🛍 Ir para Loja
          </Link>
        </li>

        {usuario?.cargo ===
          "Administrador" && (
          <Link to="/usuarios">
            <FaUsers />
            Usuários
          </Link>
        )}

        <button
          className="btn-sair"
          onClick={sair}
        >
          <FaSignOutAlt />
          Sair
        </button>

      </nav>

    </div>
  );
}

export default Sidebar;