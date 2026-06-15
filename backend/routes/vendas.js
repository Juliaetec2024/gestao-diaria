import express from "express";

import Produto from "../models/Produto.js";
import Movimentacao from "../models/Movimentacao.js";
import Pedido from "../models/Pedido.js";

const router = express.Router();

router.post(
  "/finalizar",
  async (req, res) => {

    try {

      const {
        itens,
        nome,
        endereco,
        pagamento,
        usuarioId,
        data,
      } = req.body;

      let total = 0;

      for (const item of itens) {

        const produto =
          await Produto.findById(
            item._id
          );

        if (!produto) {
          continue;
        }

        if (
          produto.estoque <
          item.quantidade
        ) {

          return res.status(400).json({
            mensagem:
              `Estoque insuficiente para ${produto.nome}`,
          });
        }

        produto.estoque -=
          item.quantidade;

        await produto.save();

        total +=
          Number(produto.preco) *
          Number(item.quantidade);

        await Movimentacao.create({

          produto:
            produto.nome,

          tipo:
            "Saída",

          quantidade:
            item.quantidade,

        });

      }

      await Pedido.create({

        nome,

        endereco,

        pagamento,

        itens,

        total,

        usuarioId,

        data: data || new Date(),

      });

      res.json({

        mensagem:
          "Compra finalizada com sucesso",

      });

    } catch (erro) {

      res.status(500).json({
        erro:
          erro.message,
      });

    }

  }
);

export default router;