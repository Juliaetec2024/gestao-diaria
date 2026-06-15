import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Usuarios from "./pages/Usuarios";
import Movimentacao from "./pages/Movimentacao";
import Loja from "./pages/Loja";
import Carrinho from "./pages/Carrinho";
import Pedidos from "./pages/Pedidos";
import Perfil from "./pages/Perfil";
import MeusPedidos from "./pages/MeusPedidos";
import ProtectedRoute from "./components/ProtectedRoute";

const STAFF = ["Administrador", "Gerente"];
const CLIENTE = ["Cliente"];

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={STAFF}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/produtos"
          element={
            <ProtectedRoute allowedRoles={STAFF}>
              <Produtos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movimentacao"
          element={
            <ProtectedRoute allowedRoles={STAFF}>
              <Movimentacao />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={STAFF}>
              <Usuarios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute allowedRoles={STAFF}>
              <Pedidos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loja"
          element={
            <ProtectedRoute allowedRoles={[...CLIENTE, ...STAFF]}>
              <Loja />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carrinho"
          element={
            <ProtectedRoute allowedRoles={CLIENTE}>
              <Carrinho />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={CLIENTE}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute allowedRoles={CLIENTE}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meus-pedidos"
          element={
            <ProtectedRoute allowedRoles={CLIENTE}>
              <MeusPedidos />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
