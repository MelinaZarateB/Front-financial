import "./Clients.css";
import { useState } from "react";
import ClientDetail from "../ClientDetail/ClientDetail";
import ModalPayment from "../../visuals/Modals/ModalPayment/ModalPayment";
import ModalDebt from "../../visuals/Modals/ModalDebt/ModalDebt";
import ModalAssignBalance from "../../visuals/Modals/ModalAssignBalance/ModalAssignBalance";
import ModalWithdrawBalance from "../../visuals/Modals/ModalWithdrawBalance/ModalWithdrawBalance";

const clientsDetail = [
  {
    _id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    balanceInStore: 1500.0,
    totalDebt: 5000.0,
    totalPayments: 2000.0,
  },
  {
    _id: 2,
    firstName: "Ana",
    lastName: "González",
    balanceInStore: 200.0,
    totalDebt: 1200.0,
    totalPayments: 800.0,
  },
  {
    _id: 3,
    firstName: "Carlos",
    lastName: "Martínez",
    balanceInStore: 800.0,
    totalDebt: 3000.0,
    totalPayments: 1000.0,
  },
];

const Clients = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null); // Estado para manejar el menú por cliente
  const [selectedClientId, setSelectedClientId] = useState(""); // Estado para manejar el cliente seleccionado
  const [showClientDetail, setShowClientDetail] = useState(false); // Estado para controlar la visualización de Clients o ClientDetail
  const [selectedModal, setSelectedModal] = useState(null); // Estado para controlar qué modal se debe abrir
  const [name, setName] = useState("");

  const handleOpenModal = (modalType, clientId) => {
    setSelectedClientId(clientId); // Guarda el ID del cliente en el estado
    setSelectedModal(modalType); // Establece el tipo de modal
    setModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setSelectedModal(null); // Resetea el tipo de modal cuando se cierra
    setModalOpen(false); // Cierra el modal
  };

  const handleSubmit = (amount, description) => {
    console.log("Pago confirmado:", amount, description);
    setModalOpen(false); // Cerrar modal después de enviar los datos
  };

  const handleToggleMenu = (clientId) => {
    setOpenMenuId(openMenuId === clientId ? null : clientId); // Toggle el estado del menú
  };

  const handleViewClientDetail = (clientId) => {
    setSelectedClientId(clientId); // Establecer el cliente seleccionado al hacer clic
    setShowClientDetail(true); // Cambiar a la vista del detalle del cliente
  };

  const handleGoBack = () => {
    setShowClientDetail(false); // Volver a la vista de clientes
    setSelectedClientId(null); // Limpiar el cliente seleccionado
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <section className="container-clients">
      {showClientDetail ? (
        // Si está habilitada la vista de detalle, mostrar ClientDetail
        <ClientDetail clientId={selectedClientId} onGoBack={handleGoBack} />
      ) : (
        // Si no, mostrar la lista de clientes
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "3px",
            }}
          >
            <div className="input-box-dashboard">
              <input
                type="text"
                className="input-field-dashboard"
                name="email"
                onChange={handleChange}
                value={name}
              />
              <label htmlFor="email" className="label-input-dashboard">
                Buscar cliente por nombre
              </label>
            </div>
            <button  className="btn-search-users">
              Buscar{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#06571f"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </button>
            <button
              className="btn-clean"
         
            >
              Limpiar{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="rgba(255, 255, 255, 0.83)"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </button>
          </div>
          <div className="container-table">
            <div className="tbl-container">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Saldo en guarda</th>
                    <th>Deuda total</th>
                    <th>Pagos total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientsDetail && clientsDetail.length > 0 ? (
                    clientsDetail.map((detail) => (
                      <tr key={detail._id}>
                        <td data-table="Nombre">
                          <span>{detail.firstName}</span>
                        </td>
                        <td data-table="Apellido">
                          <span>{detail.lastName}</span>
                        </td>
                        <td data-table="Saldo en guarda">
                          <span>{detail.balanceInStore}</span>
                        </td>

                        <td data-table="Deuda total">
                          <span>{detail.totalDebt}</span>
                        </td>
                        <td data-table="Pagos total">
                          <span>{detail.totalPayments}</span>
                        </td>
                        <td>
                          {/* Modales */}
                          <ModalPayment
                            isOpen={isModalOpen && selectedModal === "payment"}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            clientId={selectedClientId} // Pasa clientId al ModalPayment
                          />

                          <ModalDebt
                            isOpen={isModalOpen && selectedModal === "debt"}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            clientId={selectedClientId} // Pasa clientId al ModalDebt también
                          />
                          <ModalAssignBalance
                            isOpen={
                              isModalOpen && selectedModal === "assign-balance"
                            }
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            clientId={selectedClientId}
                          />
                          <ModalWithdrawBalance
                            isOpen={
                              isModalOpen &&
                              selectedModal === "withdraw-balance"
                            }
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            clientId={selectedClientId}
                          />

                          <div className="container-buttons-client">
                            <div>
                              <button
                                className="menu-button"
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={
                                  openMenuId === detail._id ? "true" : "false"
                                }
                                aria-controls={`menu-content-${detail._id}`}
                                onClick={() => handleToggleMenu(detail._id)}
                              >
                                <span className="sr-only">Open menu</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-ellipsis"
                                >
                                  <circle cx="12" cy="12" r="1"></circle>
                                  <circle cx="19" cy="12" r="1"></circle>
                                  <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                              </button>

                              {/* Menú específico de este cliente */}
                              {openMenuId === detail._id && (
                                <div
                                  role="menu"
                                  aria-orientation="vertical"
                                  data-state={
                                    openMenuId === detail._id
                                      ? "open"
                                      : "closed"
                                  }
                                  className="menu-content"
                                  id={`menu-content-${detail._id}`}
                                >
                                  <div
                                    role="menuitem"
                                    className="menu-item"
                                    onClick={() =>
                                      handleOpenModal("payment", detail._id)
                                    }
                                  >
                                    Asignar Pago
                                  </div>
                                  <div
                                    role="menuitem"
                                    className="menu-item"
                                    onClick={() =>
                                      handleOpenModal("debt", detail._id)
                                    }
                                  >
                                    Agregar Deuda
                                  </div>
                                  <div
                                    role="menuitem"
                                    className="menu-item"
                                    onClick={() =>
                                      handleOpenModal(
                                        "assign-balance",
                                        detail._id
                                      )
                                    }
                                  >
                                    Asignar Saldo en Guarda
                                  </div>
                                  <div
                                    role="menuitem"
                                    className="menu-item"
                                    onClick={() =>
                                      handleOpenModal(
                                        "withdraw-balance",
                                        detail._id
                                      )
                                    }
                                  >
                                    Retirar Saldo en Guarda
                                  </div>
                                </div>
                              )}
                            </div>
                            <button
                              className="btn-detail-client"
                              onClick={() => handleViewClientDetail(detail._id)} // Establece el cliente al hacer clic
                            >
                              Ver detalle
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No hay transacciones disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Clients;
