import "./Clients.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientDetail from "../ClientDetail/ClientDetail";
import ModalPayment from "../../visuals/Modals/ModalPayment/ModalPayment";
import ModalDebt from "../../visuals/Modals/ModalDebt/ModalDebt";
import ModalAssignBalance from "../../visuals/Modals/ModalAssignBalance/ModalAssignBalance";
import ModalWithdrawBalance from "../../visuals/Modals/ModalWithdrawBalance/ModalWithdrawBalance";
import { getClients, createClients } from "@/redux/actions/clientsActions";
import SpinnerSmall from './../../utils/Spinner/SpinnerSmall';

const Clients = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null); // Estado para manejar el menú por cliente
  const [selectedClient, setSelectedClient] = useState({}) // Estado para manejar el cliente seleccionado
  const [showClientDetail, setShowClientDetail] = useState(false); // Estado para controlar la visualización de Clients o ClientDetail
  const [selectedModal, setSelectedModal] = useState(null); // Estado para controlar qué modal se debe abrir
  const [name, setName] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const clients = useSelector((state) => state.clients.clients);

  const [newClient, setNewClient] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const handleOpenModal = (modalType, clientId) => {
    //setSelectedClientId(clientId); // Guarda el ID del cliente en el estado
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

  const handleViewClientDetail = (clientId, clientName, clientLastname, clientTransactions, clientObservations) => {
   setSelectedClient({
    id: clientId,
    name: clientName,
    lastname: clientLastname,
    transactions: clientTransactions ,
    observations: clientObservations
   })
    setShowClientDetail(true); // Cambiar a la vista del detalle del cliente
  };

  const handleGoBack = () => {
    setShowClientDetail(false); // Volver a la vista de clientes
    setSelectedClient({}); // Limpiar el cliente seleccionado
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const changeForm = () => {
    setViewForm(!viewForm);
  };
  const handleChangeNewClient = (event) => {
    setNewClient({
      ...newClient,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendInputs = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createClients(newClient));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return (
    <section className="container-clients">
      {showClientDetail ? (
        // Si está habilitada la vista de detalle, mostrar ClientDetail
        <ClientDetail selectedClient={selectedClient} onGoBack={handleGoBack} />
      ) : (
        // Si no, mostrar la lista de clientes
        <>
            <div>
              <button
                className="btn-create-user"
                onClick={changeForm}
                style={{
                  borderBottomLeftRadius: viewForm ? "0px" : "4px",
                  borderBottomRightRadius: viewForm ? "0px" : "4px",
                }}
              >
                Registrar cliente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#06571f"
                  style={{
                    transform: viewForm ? "rotate(-90deg)" : "",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </button>

              <div className={`form-container ${viewForm ? "open" : ""}`}>
                <form
                  action=""
                  className="form-dashboard"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form-columns">
                    <div className="inputs-column">
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="name"
                          value={newClient.name}
                          onChange={handleChangeNewClient} />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Nombre
                        </label>
                      </div>
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="lastname"
                          value={newClient.lastname}
                          onChange={handleChangeNewClient} />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Apellido
                        </label>
                      </div>
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="phone"
                          value={newClient.phone}
                          onChange={handleChangeNewClient} />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Teléfono
                        </label>
                      </div>
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="email"
                          value={newClient.email}
                          onChange={handleChangeNewClient} />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Email
                        </label>
                      </div>
                  
                    </div>
                  </div>
                  <div
                    className="buttons-container"
                    style={{ display: "flex", gap: "5px", justifyContent: "end" }}
                  >
                    <button
                      className="btn-search-users"
                      onClick={handleSendInputs}
                      disabled={!newClient.name ||
                        !newClient.lastname ||
                        !newClient.email ||
                        !newClient.phone}
                    >
                      <label htmlFor="submit" className="label">
                        {" "}
                        {isSubmitting ? <SpinnerSmall /> : "Registrar"}
                      </label>

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
                    <button className="btn-search-users" onClick={changeForm}>
                      Cerrar{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="17px"
                        viewBox="0 -960 960 960"
                        width="17px"
                        fill="#06571f"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div><div>
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
                    value={name} />
                  <label htmlFor="email" className="label-input-dashboard">
                    Buscar cliente por nombre
                  </label>
                </div>
                <button className="btn-search-users">
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
                <button className="btn-clean">
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
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Saldo en guarda</th>
                        <th>Deuda total</th>
                        <th>Pagos total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients && clients.length > 0 ? (
                        clients.map((client) => (
                          <tr key={client._id}>
                            <td data-table="Nombre">
                              <span>{client.name}</span>
                            </td>
                            <td data-table="Apellido">
                              <span>{client.lastname}</span>
                            </td>
                            <td data-table="Telefono">
                              <span>{client.phone}</span>
                            </td>
                            <td data-table="Email">
                              <span>
                                {client.mail || 'N/A'}
                              </span>
                            </td>
                            <td data-table="Saldo en guarda">
                              <span>{client.money.toFixed(2)}</span>
                            </td>

                            <td data-table="Deuda total">
                              <span>{client.totalDebts.toFixed(2)}</span>
                            </td>
                            <td data-table="Pagos total">
                              <span>{client.totalPayments.toFixed(2)}</span>
                            </td>
                            <td>
                              {/* Modales */}
                              <ModalPayment
                                isOpen={isModalOpen && selectedModal === "payment"}
                                onClose={handleCloseModal}
                                onSubmit={handleSubmit}
                                clientId={selectedClient.id} // Pasa clientId al ModalPayment
                              />

                              <ModalDebt
                                isOpen={isModalOpen && selectedModal === "debt"}
                                onClose={handleCloseModal}
                                onSubmit={handleSubmit}
                                clientId={selectedClient.id} // Pasa clientId al ModalDebt también
                              />
                              <ModalAssignBalance
                                isOpen={isModalOpen && selectedModal === "assign-balance"}
                                onClose={handleCloseModal}
                                onSubmit={handleSubmit}
                                clientId={selectedClient.id} />
                              <ModalWithdrawBalance
                                isOpen={isModalOpen &&
                                  selectedModal === "withdraw-balance"}
                                onClose={handleCloseModal}
                                onSubmit={handleSubmit}
                                clientId={selectedClient.id} />

                              <div className="container-buttons-client">
                                <div>
                                  <button
                                    className="menu-button"
                                    type="button"
                                    aria-haspopup="menu"
                                    aria-expanded={openMenuId === client._id ? "true" : "false"}
                                    aria-controls={`menu-content-${client._id}`}
                                    onClick={() => handleToggleMenu(client._id)}
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
                                  {openMenuId === client._id && (
                                    <div
                                      role="menu"
                                      aria-orientation="vertical"
                                      data-state={openMenuId === client._id
                                        ? "open"
                                        : "closed"}
                                      className="menu-content"
                                      id={`menu-content-${client._id}`}
                                    >
                                      <div
                                        role="menuitem"
                                        className="menu-item"
                                        onClick={() => handleOpenModal("payment", client._id)}
                                      >
                                        Asignar Pago
                                      </div>
                                      <div
                                        role="menuitem"
                                        className="menu-item"
                                        onClick={() => handleOpenModal("debt", client._id)}
                                      >
                                        Agregar Deuda
                                      </div>
                                      <div
                                        role="menuitem"
                                        className="menu-item"
                                        onClick={() => handleOpenModal(
                                          "assign-balance",
                                          client._id
                                        )}
                                      >
                                        Asignar Saldo en Guarda
                                      </div>
                                      <div
                                        role="menuitem"
                                        className="menu-item"
                                        onClick={() => handleOpenModal(
                                          "withdraw-balance",
                                          client._id
                                        )}
                                      >
                                        Retirar Saldo en Guarda
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <button
                                  className="btn-detail-client"
                                  onClick={() => handleViewClientDetail(client._id, client.name, client.lastname, client.transactions, client.observations)} // Establece el cliente al hacer clic
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
            </div></>
      )}
    </section>
  );
};

export default Clients;
