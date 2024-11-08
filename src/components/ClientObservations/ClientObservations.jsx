import "./ClientObservations.css";

const observaciones = [
  {
    observacion:
      "Pago de deuda realizado correctamente. Se ha saldado el total pendiente.",
    usuario: "Ana Rodríguez",
    createdAt: "2024-11-05T14:30:00",
  },
  {
    observacion:
      "Aún queda un saldo pendiente por pagar.",
    usuario: "Luis Fernández",
    createdAt: "2024-11-06T08:00:00",
  },
  {
    observacion:
      "El saldo en guarda por cambio de cheque fue registrado, pero aún no se ha procesado completamente.",
    usuario: "Carlos López",
    createdAt: "2024-11-06T10:45:00",
  },
];

const ClientObservations = () => {
  return (
    <section>
      <div className="container-table">
        <div
          className="tbl-container"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <div className="textarea-box-dashboard">
              <textarea
                className="textarea-field-dashboard"
                name="description"
                placeholder=" "
              ></textarea>
              <label className="label-textarea-dashboard">
                Nueva observación
              </label>
            </div>
            <button className="btn-search-users">
              Agregar observación{" "}
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
          </div>
          <div>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Observación</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {observaciones.map((observacion, index) => (
                  <tr key={index}>
                    <td>{observacion.observacion}</td>
                    <td>{observacion.usuario}</td>
                    <td> {new Date(observacion.createdAt)
                              .toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Para formato 24 horas
                              })
                              .replace(",", "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientObservations;

