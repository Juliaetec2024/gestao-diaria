import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
    },

    nome: {
      type: String,
      required: true,
    },

    categoria: {
      type: String,
      required: true,
    },

    estoque: {
      type: Number,
      required: true,
      default: 0,
    },

    preco: {
      type: Number,
      required: true,
      default: 0,
    },

    imagem: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Produto",
  ProdutoSchema
);