import express from "express";
import Movimentacao from "../models/Movimentacao.js";
import Produto from "../models/Produto.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movimentacoes =
      await Movimentacao.find().sort({
        createdAt: -1,
      });

    res.json(movimentacoes);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      produto,
      tipo,
      quantidade,
    } = req.body;

    const produtoBanco =
      await Produto.findOne({
        nome: produto,
      });

    if (!produtoBanco) {
      return res.status(404).json({
        erro: "Produto não encontrado",
      });
    }

    const qtd = Number(quantidade);

    if (tipo === "Entrada") {
      produtoBanco.estoque += qtd;
    }

    if (tipo === "Saída") {
      if (
        produtoBanco.estoque < qtd
      ) {
        return res.status(400).json({
          erro:
            "Estoque insuficiente",
        });
      }

      produtoBanco.estoque -= qtd;
    }

    await produtoBanco.save();

    const movimentacao =
      await Movimentacao.create({
        produto,
        tipo,
        quantidade,
      });

    res.json(movimentacao);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movimentacao =
      await Movimentacao.findById(
        req.params.id
      );

    if (!movimentacao) {
      return res.status(404).json({
        erro: "Movimentação não encontrada",
      });
    }

    const produto =
      await Produto.findOne({
        nome: movimentacao.produto,
      });

    if (produto) {
      if (
        movimentacao.tipo ===
        "Entrada"
      ) {
        produto.estoque -=
          movimentacao.quantidade;
      }

      if (
        movimentacao.tipo ===
        "Saída"
      ) {
        produto.estoque +=
          movimentacao.quantidade;
      }

      await produto.save();
    }

    await Movimentacao.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem:
        "Movimentação excluída com sucesso",
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
});

export default router;