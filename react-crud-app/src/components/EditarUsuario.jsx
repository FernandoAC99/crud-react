import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                setUsuario(res.data);
                setNombre(res.data.name);
                setEmail(res.data.email);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Error al cargar el usuario');
                setCargando(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true);
        setError(null);

        const datosActualizados = {
            ...usuario,
            name: nombre,
            email: email
        };

        axios
            .put(`https://jsonplaceholder.typicode.com/users/${id}`, datosActualizados)
            .then(() => {
                alert('Usuario actualizado (simulado)');
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error(err);
                setError('Error al actualizar');
                setEnviando(false);
            });
    };

    if (cargando) return <p className="text-center">Cargando usuario...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="container py-4">
            <div className="card shadow-lg rounded p-4 w-100">

                <h3 className="mb-4">Editar usuario</h3>

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="btn btn-primary" disabled={enviando}>
                        {enviando ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditarUsuario;
