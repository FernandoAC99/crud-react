import { useState } from 'react';
import userIcon from '../assets/userIcon.jpg';


const usuarios = [
    {
        id: 1,
        nombre: 'Fernando',
        correo: 'fernando@gmail.com',
        password: '1234'
    },
    {
        id: 2,
        nombre: 'Sharon',
        correo: 'sharon@gmail.com',
        password: '12345'
    }
];


function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const usuarioEncontrado = usuarios.find(
            (u) => u.correo === email && u.password === password
        );

        if (usuarioEncontrado) {
            setEmail('');
            setPassword('');
            onLoginSuccess(usuarioEncontrado);
            // Aqui debo redirigir al Dashboard
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg rounded p-4 w-100" style={{ maxWidth: '400px' }}>
                <h2 className="mb-4 text-center">¡ Bienvenido !</h2>
                <img
                    src={userIcon}
                    alt="Icono de usuario"
                    className="mx-auto d-block mb-4"
                    style={{ maxWidth: '40%' }}
                />
                <p className="text-muted text-center mb-4">
                    Ingresa a continuación tus credenciales
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                type={mostrarPassword ? 'text' : 'password'}
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setMostrarPassword(!mostrarPassword)}
                                tabIndex={-1}
                            >
                                <i className={`bi ${mostrarPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={!email || !password}
                    >
                        Iniciar sesión
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;
