import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import produtosRoutes from "./routes/produtos.js";
import usuariosRoutes from "./routes/usuarios.js";
import movimentacoesRoutes from "./routes/movimentacoes.js";
import vendasRoutes from "./routes/vendas.js";
dotenv.config();
import pedidosRoutes from "./routes/pedidos.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/produtos", produtosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/movimentacoes",movimentacoesRoutes);
app.use("/vendas", vendasRoutes);
app.use("/pedidos", pedidosRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.log("Erro MongoDB:", err));

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Gestão Diária funcionando!",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});