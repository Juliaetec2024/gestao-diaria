import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("usuario");
  }, []);

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

async function fazerLogin() {

  try {

    const resposta =
      await axios.post(
        "http://localhost:5000/usuarios/login",
        {
          email,
          senha,
        }
      );

    localStorage.setItem(
      "usuario",
      JSON.stringify(
        resposta.data.usuario
      )
    );

    const usuario =
      resposta.data.usuario;

    if (
      usuario.cargo ===
      "Cliente"
    ) {

      navigate("/loja");

    } else {

      navigate("/dashboard");

    }

  } catch {

    alert(
      "Email ou senha inválidos."
    );

  }
}

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Gestão Diária</h1>

        <p>
          Controle completo do estoque
        </p>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <button
          onClick={fazerLogin}
        >
          Entrar
        </button>

        <div className="link-cadastro">
          <Link to="/cadastro">
            Criar conta
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;