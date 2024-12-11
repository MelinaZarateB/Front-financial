import "./ClientObservations.css";

const ClientObservations = ({observations, id}) => {
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
              {observations && observations.length > 0 ? (
                observations.map((observation) => (
                  <tr key={observation.id || id}>
                    <td>{observation.description || "N/A"}</td>
                    <td>{observation.user || "N/A"}</td>
                    <td>
                      {observation.createdAt
                        ? new Date(observation.createdAt)
                            .toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false, // Para formato 24 horas
                            })
                            .replace(",", "")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No hay observaciones disponibles para este cliente
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientObservations;
