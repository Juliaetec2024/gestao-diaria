import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/Dashboard.css";

function Dashboard() {
  const [totalProdutos, setTotalProdutos] =
    useState(0);

  const [totalEstoque, setTotalEstoque] =
    useState(0);

  const [valorTotal, setValorTotal] =
    useState(0);

  const [estoqueBaixo, setEstoqueBaixo] =
    useState(0);

  const [entradas, setEntradas] =
    useState(0);

  const [saidas, setSaidas] =
    useState(0);

  const [
    ultimasMovimentacoes,
    setUltimasMovimentacoes,
  ] = useState([]);

  async function carregarResumo() {
    try {
      const resposta =
        await axios.get(
          "http://localhost:5000/produtos/estatisticas/resumo"
        );

      setTotalProdutos(
        resposta.data.totalProdutos
      );

      setTotalEstoque(
        resposta.data.totalEstoque
      );

      setValorTotal(
        resposta.data.valorTotal
      );
    } catch (erro) {
      console.log(erro);
    }
  }

  async function carregarDashboard() {
    try {
      const resposta =
        await axios.get(
          "http://localhost:5000/produtos/estatisticas/dashboard"
        );

      setEstoqueBaixo(
        resposta.data.estoqueBaixo
      );

      setEntradas(
        resposta.data.entradas
      );

      setSaidas(
        resposta.data.saidas
      );

      setUltimasMovimentacoes(
        resposta.data.movimentacoes
      );
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    carregarResumo();
    carregarDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1>Dashboard</h1>

          <div className="cards">
            <div className="card">
              <h3>Total Produtos</h3>

              <p>{totalProdutos}</p>
            </div>

            <div className="card">
              <h3>Total Estoque</h3>

              <p>{totalEstoque}</p>
            </div>

            <div className="card">
              <h3>Valor Total</h3>

              <p>
                {valorTotal.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </p>
            </div>
          </div>

          <div className="cards">
            <div className="card alerta">
              <h3>Estoque Baixo</h3>

              <p>{estoqueBaixo}</p>
            </div>

            <div className="card entrada">
              <h3>Entradas</h3>

              <p>{entradas}</p>
            </div>

            <div className="card saida">
              <h3>Saídas</h3>

              <p>{saidas}</p>
            </div>
          </div>

          <div className="ultimas">
            <h2>
              Últimas Movimentações
            </h2>

            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                </tr>
              </thead>

              <tbody>
                {ultimasMovimentacoes.map(
                  (mov) => (
                    <tr key={mov._id}>
                      <td>
                        {mov.produto}
                      </td>

                      <td>
                        {mov.tipo}
                      </td>

                      <td>
                        {mov.quantidade}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;