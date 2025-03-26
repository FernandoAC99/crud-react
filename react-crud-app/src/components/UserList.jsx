import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function UserList() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    const [mostrandoModal, setMostrandoModal] = useState(false);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                setUsuarios(res.data);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Error al cargar usuarios');
                setCargando(false);
            });
    }, []);

    if (cargando) return <p className="text-center">Cargando usuarios...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <><div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Usuario</th>
                        <th>Teléfono</th>
                        <th>Ciudad</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.username}</td>
                            <td>{u.phone}</td>
                            <td>{u.address.city}</td>
                            <td>
                                <Link to={`/editar/${u.id}`} className="btn btn-primary btn-sm me-2">
                                    <i className="bi bi-pencil-square"></i>
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setUsuarioAEliminar(u);
                                        setMostrandoModal(true);
                                    }}
                                >
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            {mostrandoModal && usuarioAEliminar && (
                <>
                    {/*Fondo borroso prueba */}
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            zIndex: 999,
                        }}
                    />

                    {/* Modal para confirmar */}
                    <div
                        className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg p-4"
                        style={{ zIndex: 1000, maxWidth: '400px', width: '100%' }}
                    >
                        <h5 className="text-center mb-3">¿Eliminar a <strong>{usuarioAEliminar.name}</strong>?</h5>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-secondary" onClick={() => setMostrandoModal(false)}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    axios
                                        .delete(`https://jsonplaceholder.typicode.com/users/${usuarioAEliminar.id}`)
                                        .then(() => {
                                            alert('Usuario eliminado (simulado)');
                                            setUsuarios((prev) => prev.filter((u) => u.id !== usuarioAEliminar.id));
                                            setMostrandoModal(false);
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            alert('Error al eliminar');
                                        });
                                }}
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UserList;
