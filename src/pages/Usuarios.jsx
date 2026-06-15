import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Usuarios.css";

function Usuarios() {

  const [usuarios, setUsuarios] =
    useState([]);

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [cargo, setCargo] =
    useState("");

  const [usuarioEditando, setUsuarioEditando] =
    useState(null);

  async function carregarUsuarios() {

    const resposta =
      await axios.get(
        "http://localhost:5000/usuarios"
      );

    setUsuarios(resposta.data);
  }

  async function salvarEdicao() {

    await axios.put(
      `http://localhost:5000/usuarios/${usuarioEditando}`,
      {
        nome,
        email,
        cargo,
      }
    );

    limparFormulario();

    carregarUsuarios();
  }

  async function excluirUsuario(id) {

    if (
      !window.confirm(
        "Deseja excluir este usuário?"
      )
    ) {
      return;
    }

    await axios.delete(
      `http://localhost:5000/usuarios/${id}`
    );

    carregarUsuarios();
  }

  function editarUsuario(usuario) {

    setUsuarioEditando(
      usuario._id
    );

    setNome(usuario.nome);

    setEmail(usuario.email);

    setCargo(usuario.cargo);
  }

  function limparFormulario() {

    setUsuarioEditando(null);

    setNome("");

    setEmail("");

    setCargo("");
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1>
            Usuários
          </h1>

          {usuarioEditando && (

            <div className="form-usuario">

              <input
                value={nome}
                onChange={(e) =>
                  setNome(
                    e.target.value
                  )
                }
                placeholder="Nome"
              />

              <input
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Email"
              />

              <input
                value={cargo}
                onChange={(e) =>
                  setCargo(
                    e.target.value
                  )
                }
                placeholder="Cargo"
              />

              <button
                className="btn-salvar"
                onClick={
                  salvarEdicao
                }
              >
                Salvar
              </button>

              <button
                className="btn-cancelar"
                onClick={
                  limparFormulario
                }
              >
                Cancelar
              </button>

            </div>

          )}

          <table>

            <thead>

              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>

            </thead>

            <tbody>

              {usuarios.map(
                (usuario) => (

                  <tr
                    key={
                      usuario._id
                    }
                  >

                    <td>
                      {usuario.nome}
                    </td>

                    <td>
                      {usuario.email}
                    </td>

                    <td>
                      {usuario.cargo}
                    </td>

                    <td>

                      <button
                        className="btn-editar"
                        onClick={() =>
                          editarUsuario(
                            usuario
                          )
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn-excluir"
                        onClick={() =>
                          excluirUsuario(
                            usuario._id
                          )
                        }
                      >
                        Excluir
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default Usuarios;