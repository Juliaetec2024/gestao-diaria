import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("");

  async function finalizarPedido() {
    const carrinho =
      JSON.parse(localStorage.getItem("carrinho")) || [];

    // 🔥 AQUI: pega o usuário logado
    const usuario =
      JSON.parse(localStorage.getItem("usuario"));

    if (!nome || !endereco || !pagamento) {
      alert("Preencha todos os campos.");
      return;
    }

    if (carrinho.length === 0) {
      alert("Carrinho vazio.");
      return;
    }

    const total = carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );

    try {
      await axios.post("http://localhost:5000/vendas/finalizar", {
        itens: carrinho,
        nome,
        endereco,
        pagamento,
        usuarioId: usuario?._id, // 🔥 ESSENCIAL
        data: new Date(),
      });

      localStorage.removeItem("carrinho");

      alert("Pedido realizado com sucesso!");

      navigate("/meus-pedidos");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao finalizar pedido");
    }
  }

  return (
    <div className="checkout">
      <div className="checkout-card">
        <h1>Finalizar Pedido</h1>

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />

        <select
          value={pagamento}
          onChange={(e) => setPagamento(e.target.value)}
        >
          <option value="">Forma de pagamento</option>
          <option>Pix</option>
          <option>Cartão</option>
          <option>Dinheiro</option>
        </select>

        <button className="btn-confirmar" onClick={finalizarPedido}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}

export default Checkout;