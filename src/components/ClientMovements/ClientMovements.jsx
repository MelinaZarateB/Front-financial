import './ClientMovements.css';

const ClientMovements = ({ movements, id }) => {
    return(
        <section>
      <div className="container-table">
        <div className="tbl-container">
          <table className="tbl">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Usuario</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Moneda</th>
                <th>Fecha</th>
                <th>Sucursal</th>
              </tr>
            </thead>
            <tbody>
              {movements && movements.length > 0 ? (
                movements.map((movements) => (
                  <tr key={movements._id || id}>
                    <td> <span>{movements.type || "N/A"}</span></td>
                    <td>{movements.user.username || "N/A"}</td>
                    <td data-table="Descripción">
                      <span>{movements.description || "N/A"}</span>
                    </td>
                    <td data-table="Monto">
                      <span> {movements.amount || "N/A"}</span>
                    </td>
              
                    <td data-table="Moneda">
                      <span>{movements.currency.name || "N/A"}</span>
                    </td>
                  
                    <td data-table="Fecha">
                      <span>
                        {new Date(movements.createdAt)
                          .toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(",", "")}
                      </span>
                    </td>
                    <td>{movements.sub_office.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No hay movimientos disponibles para este cliente
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    )

}
export default ClientMovements;