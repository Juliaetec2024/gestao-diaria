import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cadastro() {
const navigate = useNavigate();

const [nome, setNome] =
useState("");

const [email, setEmail] =
useState("");

const [senha, setSenha] =
useState("");

async function cadastrar() {
try {
await axios.post(
"http://localhost:5000/usuarios/cadastro",
{
nome,
email,
senha,
}
);

  alert(
    "Usuário cadastrado com sucesso!"
  );

  navigate("/");
} catch (erro) {
  console.log(erro);

  alert(
    "Erro ao cadastrar usuário."
  );
}

}

return (
<div
style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
minHeight: "100vh",
background: "#f5f7fb",
}}
>
<div
style={{
width: "400px",
background: "white",
padding: "30px",
borderRadius: "12px",
boxShadow:
"0 2px 10px rgba(0,0,0,.1)",
}}
>
<h2
style={{
textAlign: "center",
color: "#1565c0",
marginBottom: "20px",
}}
>
Cadastrar Usuário </h2>

    <input
      type="text"
      placeholder="Nome"
      value={nome}
      onChange={(e) =>
        setNome(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    />

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    />

    <input
      type="password"
      placeholder="Senha"
      value={senha}
      onChange={(e) =>
        setSenha(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    />

    <button
      onClick={cadastrar}
      style={{
        width: "100%",
        padding: "12px",
        background: "#1565c0",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Cadastrar
    </button>
  </div>
</div>

);
}

export default Cadastro;
