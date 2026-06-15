import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Movimentacao.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Movimentacao() {
  const [produtos, setProdutos] =
    useState([]);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const [movimentacoes, setMovimentacoes] =
    useState([]);

  const [produto, setProduto] =
    useState("");

  const [tipo, setTipo] =
    useState("Entrada");

  const [quantidade, setQuantidade] =
    useState("");

  const [busca, setBusca] =
    useState("");

  const [filtroTipo, setFiltroTipo] =
  useState("");

  const [dataInicial, setDataInicial] =
    useState("");

  const [dataFinal, setDataFinal] =
    useState("");

  async function carregarProdutos() {
    const resposta =
      await axios.get(
        "http://localhost:5000/produtos"
      );

    setProdutos(resposta.data);
  }

  async function carregarMovimentacoes() {
    const resposta =
      await axios.get(
        "http://localhost:5000/movimentacoes"
      );

    setMovimentacoes(
      resposta.data
    );
  }

  async function registrarMovimentacao() {
    if (
      !produto ||
      !tipo ||
      !quantidade
    ) {
      alert(
        "Preencha todos os campos."
      );
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/movimentacoes",
        {
          produto,
          tipo,
          quantidade,
        }
      );

      setProduto("");
      setTipo("Entrada");
      setQuantidade("");

      carregarMovimentacoes();
      carregarProdutos();

      alert(
        "Movimentação registrada!"
      );
    } catch (erro) {
      console.log(erro);

      alert(
        erro.response?.data?.erro ||
          "Erro ao registrar movimentação."
      );
    }
  }

  function exportarExcel() {
  const dados = movimentacoesFiltradas.map(
    (movimentacao) => ({
      Produto: movimentacao.produto,
      Tipo: movimentacao.tipo,
      Quantidade: movimentacao.quantidade,
      Data: new Date(
        movimentacao.createdAt
      ).toLocaleDateString("pt-BR"),
    })
  );

  const planilha =
    XLSX.utils.json_to_sheet(dados);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    planilha,
    "Movimentações"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

  const arquivo = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    arquivo,
    "relatorio_movimentacoes.xlsx"
  );
}

function exportarPDF() {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Relatório de Movimentações",
    14,
    20
  );

  autoTable(doc, {
    startY: 30,

    head: [[
      "Produto",
      "Tipo",
      "Quantidade",
      "Data"
    ]],

    body: movimentacoesFiltradas.map(
      (movimentacao) => [
        movimentacao.produto,
        movimentacao.tipo,
        movimentacao.quantidade,
        new Date(
          movimentacao.createdAt
        ).toLocaleDateString(
          "pt-BR"
        ),
      ]
    ),
  });

  doc.save(
    "relatorio_movimentacoes.pdf"
  );
}

  useEffect(() => {
    carregarProdutos();
    carregarMovimentacoes();
  }, []);

  const movimentacoesFiltradas =
  movimentacoes.filter(
    (movimentacao) => {

      const produtoOk =
        movimentacao.produto
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          );

      const tipoOk =
        filtroTipo === ""
          ? true
          : movimentacao.tipo ===
            filtroTipo;

      const dataMov =
        new Date(
          movimentacao.createdAt
        );

      const inicioOk =
        dataInicial === ""
          ? true
          : dataMov >=
            new Date(dataInicial);

      const fimOk =
        dataFinal === ""
          ? true
          : dataMov <=
            new Date(
              dataFinal +
                "T23:59:59"
            );

      return (
        produtoOk &&
        tipoOk &&
        inicioOk &&
        fimOk
      );
    }
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1>
            Movimentação de Estoque
          </h1>

          <div className="card-movimentacao">

            <h2>
              Nova Movimentação
            </h2>

            <div className="form-movimentacao">

              <select
                value={produto}
                onChange={(e) =>
                  setProduto(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Selecione um produto
                </option>

                {produtos.map(
                  (produto) => (
                    <option
                      key={
                        produto._id
                      }
                      value={
                        produto.nome
                      }
                    >
                      {produto.nome}
                    </option>
                  )
                )}
              </select>

              <select
                value={tipo}
                onChange={(e) =>
                  setTipo(
                    e.target.value
                  )
                }
              >
                <option>
                  Entrada
                </option>

                <option>
                  Saída
                </option>
              </select>

              <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(
                    e.target.value
                  )
                }
              />

              <button
                className="btn-registrar"
                onClick={
                  registrarMovimentacao
                }
              >
                Registrar
              </button>

            </div>
          </div>

          <div className="card-movimentacao">

            <h2>
              Histórico
            </h2>

            <div className="filtros">

          <input
            className="campo-busca"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) =>
              setBusca(
                e.target.value
              )
            }
          />

          <select
            className="campo-filtro"
            value={filtroTipo}
            onChange={(e) =>
              setFiltroTipo(
                e.target.value
              )
            }
          >
            <option value="">
              Todos os tipos
            </option>

            <option value="Entrada">
              Entrada
            </option>

            <option value="Saída">
              Saída
            </option>
          </select>

          <input
            type="date"
            className="campo-filtro"
            value={dataInicial}
            onChange={(e) =>
              setDataInicial(
                e.target.value
              )
            }
          />

          <input
            type="date"
            className="campo-filtro"
            value={dataFinal}
            onChange={(e) =>
              setDataFinal(
                e.target.value
              )
            }
          />
          
          {
         (
            usuario?.cargo === "Gerente" ||
            usuario?.cargo === "Administrador"
          ) && (
            <>
              <button
                className="btn-exportar"
                onClick={exportarExcel}
              >
                Exportar Excel
              </button>

              <button
                className="btn-exportar-pdf"
                onClick={exportarPDF}
              >
                Exportar PDF
              </button>
            </>
          )
          }

          </div>

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>

                  {movimentacoesFiltradas.map(
                    (
                      movimentacao
                    ) => (
                      <tr
                        key={
                          movimentacao._id
                        }
                      >
                        <td>
                          {
                            movimentacao.produto
                          }
                        </td>

                        <td
                          className={
                            movimentacao.tipo ===
                            "Entrada"
                              ? "tipo-entrada"
                              : "tipo-saida"
                          }
                        >
                          {
                            movimentacao.tipo
                          }
                        </td>

                        <td>
                          {
                            movimentacao.quantidade
                          }
                        </td>

                        <td>
                          {new Date(
                            movimentacao.createdAt
                          ).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Movimentacao;