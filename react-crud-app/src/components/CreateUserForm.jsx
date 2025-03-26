import { useState } from 'react';
import axios from 'axios';

function CreateUserForm({ onUsuarioCreado }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true);
        setError(null);

        const nuevoUsuario = {
            name: nombre,
            email: email
        };

        axios
            .post('https://jsonplaceholder.typicode.com/users', nuevoUsuario)
            .then((res) => {
                setNombre('');
                setEmail('');
                setEnviando(false);
                alert('Usuario creado con éxito');
                onUsuarioCreado(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError('Error al crear usuario');
                setEnviando(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h5 className="mb-3">Agregar nuevo usuario</h5>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control w-50"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control w-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn btn-success" disabled={enviando}>
                {enviando ? 'Creando...' : 'Crear usuario'}
            </button>
        </form>
    );
}

export default CreateUserForm;
