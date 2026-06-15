import express from "express";
import Produto from "../models/Produto.js";
import Movimentacao from "../models/Movimentacao.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();

    res.json(produtos);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const produto = await Produto.create(
      req.body
    );

    res.json(produto);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.get("/estatisticas/resumo", async (req, res) => {
  try {
    const produtos = await Produto.find();

    const totalProdutos =
      produtos.length;

    const totalEstoque =
      produtos.reduce(
        (total, produto) =>
          total + Number(produto.estoque),
        0
      );

    const valorTotal =
      produtos.reduce(
        (total, produto) =>
          total +
          Number(produto.preco) *
            Number(produto.estoque),
        0
      );

    res.json({
      totalProdutos,
      totalEstoque,
      valorTotal,
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const produto =
      await Produto.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(produto);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Produto.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Produto excluído com sucesso",
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.get("/estatisticas/dashboard", async (req, res) => {
  try {
    const produtos = await Produto.find();

    const movimentacoes =
      await Movimentacao.find()
        .sort({ createdAt: -1 })
        .limit(5);

    const estoqueBaixo =
      produtos.filter(
        (produto) => produto.estoque <= 5
      ).length;

    const entradas =
      await Movimentacao.countDocuments({
        tipo: "Entrada",
      });

    const saidas =
      await Movimentacao.countDocuments({
        tipo: "Saída",
      });

    res.json({
      estoqueBaixo,
      entradas,
      saidas,
      movimentacoes,
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

export default router;