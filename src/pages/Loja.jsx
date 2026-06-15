import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Loja.css";
import { useNavigate } from "react-router-dom";

function Loja() {

  const navigate =
    useNavigate();

  const usuario =
    JSON.parse(localStorage.getItem("usuario"));

  const [produtos, setProdutos] =
    useState([]);

  async function carregarProdutos() {

    try {

      const resposta =
        await axios.get(
          "http://localhost:5000/produtos"
        );

      setProdutos(resposta.data);

    } catch (erro) {
      console.log(erro);
    }
  }

  function adicionarCarrinho(produto) {

    if (usuario?.cargo !== "Cliente") {
      alert(
        "Apenas clientes podem adicionar produtos ao carrinho."
      );
      return;
    }

    const carrinho =
      JSON.parse(
        localStorage.getItem(
          "carrinho"
        )
      ) || [];

    const existente =
      carrinho.find(
        (item) =>
          item._id ===
          produto._id
      );

    if (existente) {

      if (
        existente.quantidade >=
        produto.estoque
      ) {

        alert(
          `Quantidade máxima disponível: ${produto.estoque}`
        );

        return;
      }

      existente.quantidade++;

    } else {

      carrinho.push({
        ...produto,
        quantidade: 1,
      });
    }

    localStorage.setItem(
      "carrinho",
      JSON.stringify(carrinho)
    );
    alert(
    "Produto adicionado ao carrinho!"
    );
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="loja">

      <div className="topo-loja">

        <h1>
          🛍 Loja Virtual
        </h1>

        <div className="loja-acoes">
          {usuario?.cargo === "Cliente" ? (
            <>
              <button
                className="btn-carrinho"
                onClick={() =>
                  navigate("/meus-pedidos")
                }
              >
                📦 Meus Pedidos
              </button>

              <button
                className="btn-carrinho"
                onClick={() =>
                  navigate("/carrinho")
                }
              >
                🛒 Ver Carrinho
              </button>

              <button
                className="btn-carrinho"
                onClick={() => {
                  localStorage.removeItem("usuario");
                  navigate("/");
                }}
              >
                🚪 Sair
              </button>
            </>
          ) : (
            <button
              className="btn-carrinho"
              onClick={() => navigate("/dashboard")}
            >
              ⬅ Voltar ao Dashboard
            </button>
          )}
        </div>

      </div>

      <div className="produtos-grid">

        {produtos.map(
          (produto) => (

            <div
              className="produto-card"
              key={produto._id}
            >

              <img
                src={
                  produto.imagem ||
                  "https://placehold.co/250x150?text=Sem+Imagem"
                }
                alt={produto.nome}
                className="produto-imagem"
              />

              <h3>
                {produto.nome}
              </h3>

              <p>
                Categoria:
                {" "}
                {produto.categoria}
              </p>

              <p>
                Estoque:
                {" "}
                {produto.estoque}
              </p>

              <h2>
                {Number(
                  produto.preco
                ).toLocaleString(
                  "pt-BR",
                  {
                    style:
                      "currency",
                    currency:
                      "BRL",
                  }
                )}
              </h2>

              {usuario?.cargo === "Cliente" && (
                <button
                  className="btn-comprar"
                  onClick={() =>
                    adicionarCarrinho(
                      produto
                    )
                  }
                  disabled={
                    produto.estoque <= 0
                  }
                >
                  {produto.estoque <= 0
                    ? "Sem Estoque"
                    : "Adicionar ao Carrinho"}
                </button>
              )}

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Loja;