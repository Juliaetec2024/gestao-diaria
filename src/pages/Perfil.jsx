import { useEffect, useState } from "react";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(user);
  }, []);

  if (!usuario) {
    return <h2>Carregando...</h2>;
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
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1565c0" }}>
          Meu Perfil
        </h2>

        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Cargo:</strong> {usuario.cargo}</p>
      </div>
    </div>
  );
}

export default Perfil;