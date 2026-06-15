import mongoose from "mongoose";

const MovimentacaoSchema = new mongoose.Schema(
  {
    produto: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      required: true,
    },

    quantidade: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Movimentacao",
  MovimentacaoSchema
);