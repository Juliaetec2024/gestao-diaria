import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Pedidos.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  async function carregarPedidos() {
    try {
      const resposta = await axios.get("http://localhost:5000/pedidos");
      setPedidos(resposta.data);
    } catch (erro) {
      console.log("Erro ao carregar pedidos:", erro);
    }
  }

  function visualizarPedido(pedido) {
    setPedidoSelecionado(pedido);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setPedidoSelecionado(null);
  }

  function formatarData(data) {
    if (!data) return "Data inválida";

    const d = new Date(data);

    if (isNaN(d.getTime())) return "Data inválida";

    return d.toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
      <h1>📦 Pedidos</h1>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Pagamento</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id}>
              <td>{pedido.nome || "Sem nome"}</td>

              <td>
                R$ {Number(pedido.total || 0).toFixed(2)}
              </td>

              <td>{pedido.pagamento || "-"}</td>

              {/* 🔥 DATA CORRIGIDA AQUI */}
              <td>{formatarData(pedido.data || pedido.createdAt)}</td>

              <td>
                <button
                  className="btn-visualizar"
                  onClick={() => visualizarPedido(pedido)}
                >
                  👁
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalAberto && pedidoSelecionado && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Pedido</h2>

            <p>
              <strong>Cliente:</strong>{" "}
              {pedidoSelecionado.nome || "Sem nome"}
            </p>

            <p>
              <strong>Endereço:</strong>{" "}
              {pedidoSelecionado.endereco || "Sem endereço"}
            </p>

            <p>
              <strong>Pagamento:</strong>{" "}
              {pedidoSelecionado.pagamento || "-"}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              R$ {Number(pedidoSelecionado.total || 0).toFixed(2)}
            </p>

            <hr />

            <h3>Produtos</h3>

            {(pedidoSelecionado.itens || []).map((item, index) => (
              <div key={index} className="item-pedido">
                📦 {item.nome || "Produto"} - Quantidade:{" "}
                {item.quantidade || 0}
              </div>
            ))}

            <button className="btn-fechar" onClick={fecharModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </>
  );
}

export default Pedidos;