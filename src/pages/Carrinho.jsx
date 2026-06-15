import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Carrinho.css";

function Carrinho() {

  const navigate = useNavigate();

  const [carrinho, setCarrinho] =
    useState([]);

  function carregarCarrinho() {

    const itens =
      JSON.parse(
        localStorage.getItem("carrinho")
      ) || [];

    setCarrinho(itens);
  }

  function aumentar(index) {

    const novoCarrinho =
      carrinho.map(
        (item, i) => {

          if (i !== index)
            return item;

          if (
            item.quantidade >=
            item.estoque
          ) {

            alert(
              `Estoque máximo disponível: ${item.estoque}`
            );

            return item;
          }

          return {
            ...item,
            quantidade:
              item.quantidade + 1,
          };
        }
      );

    setCarrinho(
      novoCarrinho
    );

    localStorage.setItem(
      "carrinho",
      JSON.stringify(
        novoCarrinho
      )
    );
  }

  function diminuir(index) {

    const novoCarrinho =
      carrinho.map(
        (item, i) => {

          if (i !== index)
            return item;

          if (
            item.quantidade <= 1
          ) {
            return item;
          }

          return {
            ...item,
            quantidade:
              item.quantidade - 1,
          };
        }
      );

    setCarrinho(
      novoCarrinho
    );

    localStorage.setItem(
      "carrinho",
      JSON.stringify(
        novoCarrinho
      )
    );
  }

  function remover(index) {

    const novoCarrinho =
      carrinho.filter(
        (_, i) =>
          i !== index
      );

    setCarrinho(
      novoCarrinho
    );

    localStorage.setItem(
      "carrinho",
      JSON.stringify(
        novoCarrinho
      )
    );
  }

  async function finalizarCompra() {

  try {

    await axios.post(
      "http://localhost:5000/vendas/finalizar",
      {
        itens: carrinho,
      }
    );

    alert(
      "Compra realizada com sucesso!"
    );

    localStorage.removeItem(
      "carrinho"
    );

    setCarrinho([]);

    navigate("/loja");

  } catch (erro) {

    alert(
      erro.response?.data?.mensagem ||
      "Erro ao finalizar compra"
    );

  }
}

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const total =
    carrinho.reduce(
      (soma, item) =>
        soma +
        (
          Number(item.preco) *
          Number(item.quantidade)
        ),
      0
    );

  return (
    <div className="carrinho">

      <h1>
        🛒 Meu Carrinho
      </h1>

      <button
        className="btn-voltar"
        onClick={() =>
          navigate("/loja")
        }
      >
        ← Continuar Comprando
      </button>

      {carrinho.length === 0 ? (

        <p>
          Carrinho vazio.
        </p>

      ) : (

        <>
          {carrinho.map(
            (
              produto,
              index
            ) => (

              <div
                key={index}
                className="item-carrinho"
              >

                <div>

                  <h3>
                    {produto.nome}
                  </h3>

                  <p>
                    R$
                    {" "}
                    {Number(
                      produto.preco
                    ).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </p>

                  <small>
                    Estoque disponível:
                    {" "}
                    {produto.estoque}
                  </small>

                </div>

                <div className="quantidade">

                  <button
                    onClick={() =>
                      diminuir(
                        index
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {
                      produto.quantidade
                    }
                  </span>

                  <button
                    onClick={() =>
                      aumentar(
                        index
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="btn-remover"
                  onClick={() =>
                    remover(
                      index
                    )
                  }
                >
                  Remover
                </button>

              </div>

            )
          )}

          <h2 className="total-carrinho">
        Total: R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </h2>

          <button
            className="btn-finalizar"
            onClick={() => {
                console.log("BOTÃO CLICADO");
                navigate("/checkout");
            }}
            >
            Finalizar Compra
            </button>
        </>
    )}
    </div>
  );
}

export default Carrinho;