import express from "express";
import Pedido from "../models/Pedido.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const pedido = await Pedido.create({
      nome: req.body.nome,
      endereco: req.body.endereco,
      pagamento: req.body.pagamento,
      itens: req.body.itens,
      total: req.body.total,
      usuarioId: req.body.usuarioId, 
      data: req.body.data || new Date(),
    });

    res.json(pedido);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ data: -1 });
    res.json(pedidos);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

export default router;