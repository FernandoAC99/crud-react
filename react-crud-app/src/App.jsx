import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EditarUsuario from './components/EditarUsuario';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            usuario ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLoginSuccess={setUsuario} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            usuario ? (
              <Dashboard nombreUsuario={usuario.nombre} onLogout={() => setUsuario(null)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/editar/:id"
          element={
            usuario ? (
              <EditarUsuario />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
