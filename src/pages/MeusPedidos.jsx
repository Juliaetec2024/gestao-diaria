import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MeusPedidos.css";

function MeusPedidos() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const resposta = await axios.get("http://localhost:5000/pedidos");

        // filtra apenas pedidos do usuário logado
        const meusPedidos = resposta.data.filter(
          (pedido) => pedido.usuarioId === usuario?._id
        );

        setPedidos(meusPedidos);
      } catch (erro) {
        console.log(erro);
      }
    }

    carregarPedidos();
  }, []);

  function formatarData(pedido) {
    const dataRef = pedido.data || pedido.createdAt;
    if (!dataRef) return "Data inválida";

    const d = new Date(dataRef);
    if (isNaN(d.getTime())) return "Data inválida";

    return d.toLocaleDateString("pt-BR");
  }

  return (
    <div className="meus-pedidos">
      <div className="meus-pedidos-acoes">
        <button onClick={() => navigate("/loja")}>
          🛍 Voltar à Loja
        </button>

        <button onClick={() => navigate("/")}>
          🏠 Página Inicial
        </button>
      </div>

      <h2>Meus Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>Você ainda não fez pedidos.</p>
      ) : (
        pedidos.map((pedido) => (
          <div className="pedido-card" key={pedido._id}>
            <h3>Pedido {pedido._id}</h3>

            <p>
              <strong>Data:</strong> {formatarData(pedido)}
            </p>

            <p>
              <strong>Itens:</strong>
            </p>

            <ul>
              {pedido.itens?.map((item, index) => (
                <li key={index}>
                  {item.nome} x{item.quantidade}
                </li>
              ))}
            </ul>

            <p>
              <strong>Total:</strong> R$ {pedido.total}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MeusPedidos;
