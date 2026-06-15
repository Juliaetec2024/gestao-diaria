import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Produtos.css";
import {FaEye, FaEdit, FaTrash,} from "react-icons/fa";

function Produtos() {
  const [codigo, setCodigo] =
    useState("");

  const [nome, setNome] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [estoque, setEstoque] =
    useState("");

  const [preco, setPreco] =
    useState("");

  const [imagem, setImagem] =
    useState("");

  const [busca, setBusca] =
    useState("");

  const [filtroCategoria,
  setFiltroCategoria] =
  useState("");

  const [produtos, setProdutos] =
    useState([]);

  const [editando, setEditando] =
    useState(false);

  const [idProduto, setIdProduto] =
    useState("");

  const [
    produtoSelecionado,
    setProdutoSelecionado,
  ] = useState(null);

  const [modalAberto, setModalAberto] =
    useState(false);

  async function carregarProdutos() {
    try {
      const resposta = await axios.get(
        "http://localhost:5000/produtos"
      );

      setProdutos(resposta.data);
    } catch (erro) {
      console.log(erro);
    }
  }

  function limparFormulario() {
    setCodigo("");
    setNome("");
    setCategoria("");
    setEstoque("");
    setPreco("");
    setImagem("");

    setEditando(false);
    setIdProduto("");
  }

  async function salvarProduto() {
    if (
      !codigo ||
      !nome ||
      !categoria ||
      !estoque ||
      !preco
    ) {
      alert(
        "Preencha todos os campos."
      );

      return;
    }

    try {
      if (editando) {
        await axios.put(
          `http://localhost:5000/produtos/${idProduto}`,
          {
            codigo,
            nome,
            categoria,
            estoque,
            preco,
            imagem,
          }
        );

        alert(
          "Produto atualizado!"
        );
      } else {
        await axios.post(
          "http://localhost:5000/produtos",
          {
            codigo,
            nome,
            categoria,
            estoque,
            preco,
            imagem,
          }
        );

        alert(
          "Produto cadastrado!"
        );
      }

      limparFormulario();

      carregarProdutos();
    } catch (erro) {
      console.log(erro);

      alert(
        "Erro ao salvar produto."
      );
    }
  }

  function editarProduto(produto) {
    setIdProduto(produto._id);

    setCodigo(produto.codigo);
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setEstoque(produto.estoque);
    setPreco(produto.preco);
    setImagem(produto.imagem || "");

    setEditando(true);
  }

  function visualizarProduto(produto) {
    setProdutoSelecionado(produto);

    setModalAberto(true);
  }

  async function excluirProduto(id) {
    const confirmar =
      window.confirm(
        "Deseja excluir este produto?"
      );

    if (!confirmar) return;

    try {
      await axios.delete(
        `http://localhost:5000/produtos/${id}`
      );

      carregarProdutos();
    } catch (erro) {
      console.log(erro);

      alert(
        "Erro ao excluir produto."
      );
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const produtosFiltrados =
  produtos.filter((produto) => {

    const nomeOk =
      produto.nome
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        );

    const categoriaOk =
      filtroCategoria === ""
        ? true
        : produto.categoria ===
          filtroCategoria;

    return nomeOk && categoriaOk;
  });

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1>Produtos</h1>

          <div className="form-produto">
            <input
              placeholder="Código"
              value={codigo}
              onChange={(e) =>
                setCodigo(e.target.value)
              }
            />

            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
            />

            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value)
              }
            >
              <option value="">
                Selecione uma categoria
              </option>

              <option value="Alimentos">
                Alimentos
              </option>

              <option value="Bebidas">
                Bebidas
              </option>

              <option value="Limpeza">
                Limpeza
              </option>

              <option value="Higiene">
                Higiene
              </option>

              <option value="Eletrônicos">
                Eletrônicos
              </option>

              <option value="Papelaria">
                Papelaria
              </option>

              <option value="Outros">
                Outros
              </option>
            </select>

            <input
              type="number"
              placeholder="Estoque"
              value={estoque}
              onChange={(e) =>
                setEstoque(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Preço"
              value={preco}
              onChange={(e) =>
                setPreco(
                  e.target.value
                )
              }
            />

            <input
              placeholder="URL da Imagem"
              value={imagem}
              onChange={(e) =>
                setImagem(e.target.value)
              }
            />

            <button
              className="btn-salvar"
              onClick={salvarProduto}
            >
              {editando
                ? "Atualizar Produto"
                : "Salvar Produto"}
            </button>

            {editando && (
              <button
                className="btn-cancelar"
                onClick={
                  limparFormulario
                }
              >
                Cancelar
              </button>
            )}
          </div>

          <input
            className="campo-busca"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
          />

          <select
          className="campo-categoria"
          value={filtroCategoria}
          onChange={(e) =>
            setFiltroCategoria(
              e.target.value
            )
          }
        >
          <option value="">
            Todas as categorias
          </option>

          <option value="Alimentos">
            Alimentos
          </option>

          <option value="Bebidas">
            Bebidas
          </option>

          <option value="Limpeza">
            Limpeza
          </option>

          <option value="Higiene">
            Higiene
          </option>

          <option value="Eletrônicos">
            Eletrônicos
          </option>

          <option value="Papelaria">
            Papelaria
          </option>

          <option value="Outros">
            Outros
          </option>
        </select>

          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.map(
                (produto) => (
                  <tr
                    key={produto._id}
                  >
                    <td>
                      {produto.codigo}
                    </td>

                    <td>
                      {produto.nome}
                    </td>

                    <td>
                      {
                        produto.categoria
                      }
                    </td>

                    <td>
                    {produto.estoque <= 5 ? (
                      <span className="badge-baixo">
                        ⚠ Estoque Baixo ({produto.estoque})
                      </span>
                    ) : (
                      produto.estoque
                    )}
                  </td>

                    <td>
                      R$ {produto.preco}
                    </td>

                    <td>
                    <div className="acoes">

                      <button
                        className="btn-visualizar"
                        onClick={() =>
                          visualizarProduto(produto)
                        }
                        title="Visualizar"
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn-editar"
                        onClick={() =>
                          editarProduto(produto)
                        }
                        title="Editar"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn-excluir"
                        onClick={() =>
                          excluirProduto(produto._id)
                        }
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto &&
        produtoSelecionado && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Detalhes do Produto</h2>

            {produtoSelecionado.imagem && (
              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="modal-imagem"
              />
            )}

            <div className="modal-info">
              <strong>Código:</strong>
              {" "}
              {produtoSelecionado.codigo}
            </div>

            <div className="modal-info">
              <strong>Nome:</strong>
              {" "}
              {produtoSelecionado.nome}
            </div>

            <div className="modal-info">
              <strong>Categoria:</strong>
              {" "}
              {produtoSelecionado.categoria}
            </div>

            <div className="modal-info">
              <strong>Estoque:</strong>
              {" "}
              {produtoSelecionado.estoque}
            </div>

            <div className="modal-info">
              <strong>Preço:</strong>
              {" "}
              R$
              {" "}
              {produtoSelecionado.preco}
            </div>

            <button
              className="btn-fechar"
              onClick={() =>
                setProdutoSelecionado(null)
              }
            >
              Fechar
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default Produtos;