import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  pagamento: String,
  itens: Array,
  total: Number,
  usuarioId: String, 
  data: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Pedido", PedidoSchema);