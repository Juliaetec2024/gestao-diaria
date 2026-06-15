import mongoose from "mongoose";

const UsuarioSchema =
  new mongoose.Schema(
    {
      nome: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      cargo: {
        type: String,
        default: "Cliente",
      },

      senha: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Usuario",
  UsuarioSchema
);