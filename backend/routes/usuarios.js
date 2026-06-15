import express from "express";
import Usuario from "../models/Usuario.js";

const router = express.Router();

router.post(
"/cadastro",
async (req, res) => {
try {
const usuario =
await Usuario.create({
nome: req.body.nome,
email: req.body.email,
senha: req.body.senha,
cargo: "Cliente",
});

  res.json(usuario);
} catch (error) {
  res.status(500).json(error);
}

}
);

router.post(
"/login",
async (req, res) => {
try {
const usuario =
await Usuario.findOne({
email: req.body.email,
});

  if (!usuario) {
    return res.status(400).json({
      mensagem:
        "Usuário não encontrado",
    });
  }

  if (
    usuario.senha !==
    req.body.senha
  ) {
    return res.status(400).json({
      mensagem: "Senha inválida",
    });
  }

  res.json({
    mensagem: "Login realizado",
    usuario,
  });
} catch (error) {
  res.status(500).json(error);
}

}
);

router.post(
  "/criar-admin",
  async (req, res) => {
    try {
      const admin =
        await Usuario.create({
          nome: "Administrador",
          email: "admin@gestao.com",
          senha: "123456",
          cargo: "Administrador",
        });

      res.json(admin);
    } catch (erro) {
      res.status(500).json({
        erro: erro.message,
      });
    }
  }
);

router.post(
  "/criar-gerente",
  async (req, res) => {
    try {
      const gerente =
        await Usuario.create({
          nome: "Gerente",
          email: "gerente@gestao.com",
          senha: "123456",
          cargo: "Gerente",
        });

      res.json(gerente);
    } catch (erro) {
      res.status(500).json({
        erro: erro.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
try {
const usuarios =
await Usuario.find().select(
"-senha"
);
res.json(usuarios);

} catch (erro) {
res.status(500).json({
erro: erro.message,
});
}
});

router.put("/:id", async (req, res) => {
try {
const usuario =
await Usuario.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
}
);
res.json(usuario);

} catch (erro) {
res.status(500).json({
erro: erro.message,
});
}
});

router.delete("/:id", async (req, res) => {
try {
await Usuario.findByIdAndDelete(
req.params.id
);

res.json({
  mensagem:
    "Usuário excluído com sucesso",
});

} catch (erro) {
res.status(500).json({
erro: erro.message,
});
}
});

export default router;
