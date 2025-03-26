import { useState } from 'react';
import CreateUserForm from './CreateUserForm';
import UserList from './UserList';

function Dashboard({ nombreUsuario, onLogout }) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tab, setTab] = useState('listar');

    return (
        <div className="container py-4">
            <div className="card shadow-lg rounded p-4 w-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Hola, {nombreUsuario} 👋</h2>
                    <button className="btn btn-outline-danger" onClick={() => setMostrarModal(true)}>
                        Salir <i class="bi bi-box-arrow-right"></i>
                    </button>
                </div>
                <p className="text-muted text-center mb-4">
                    Ahora cuentas con acceso al sistema de gestión de usuarios.
                </p>

                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${tab === 'listar' ? 'active' : ''}`}
                            onClick={() => setTab('listar')}
                        >
                            Listar
                        </button>
                    </li>
                    <li className="nav-item">

                        <button
                            className={`nav-link ${tab === 'registrar' ? 'active' : ''}`}
                            onClick={() => setTab('registrar')}
                        >
                            Registrar
                        </button>
                    </li>

                </ul>

                <div className="tab-content">
                    {tab === 'registrar' && (
                        <div className="tab-pane active">
                            <CreateUserForm onUsuarioCreado={(u) => console.log('Creado:', u)} />
                        </div>
                    )}
                    {tab === 'listar' && (
                        <div className="tab-pane active">
                            <UserList />
                        </div>
                    )}
                </div>

                {/* Modal para cerrar la sesión */}
                {mostrarModal && (
                    <>
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100"
                            style={{
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(5px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                zIndex: 999,
                            }}
                        />
                        <div
                            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg p-4"
                            style={{ zIndex: 1000, maxWidth: '400px', width: '100%' }}
                        >
                            <h5 className="text-center mb-3">¿Quieres salir de la sesión?</h5>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                                    Cancelar
                                </button>
                                <button className="btn btn-danger" onClick={onLogout}>
                                    Sí, cerrar sesión
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
