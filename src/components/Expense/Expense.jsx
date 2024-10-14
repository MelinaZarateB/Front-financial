import './Expense.css';

const expensesArray = [];

const Expense = () => {
    return(
        <section className='section-expense'>
            <div>
            <div className="container-table">
          <div className="tbl-container">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Moneda de pago</th>
                  <th>Moneda de compra</th>
                  <th>Tasa de cambio</th>
                  <th>Comisión</th>
                  <th>Sucursal</th>
                  <th colSpan="1"></th>
                </tr>
              </thead>
              <tbody>
                {expensesArray && expensesArray.length > 0 ? (
                  expensesArray.map((expense) => (
                    <tr >
                      <td data-table="Tipo">
                        <span
                        
                          data-field="type"
                        >
                        
                        </span>
                      </td>
                      <td data-table="Usuario"></td>
                      <td data-table="Fecha">
                       
                      </td>

                      <td data-table="Monto"></td>
                      <td data-table="Moneda de pago">
                        
                      </td>
                      <td data-table="Moneda de compra">
                      
                      </td>
                      <td data-table="Tasa de cambio">
                     
                      </td>
                      <td data-table="Comisión">
                        
                      </td>
                      <td data-table="Sucursal"></td>
                     
                        <td data-table="Estado">
                          <button
                            className="btn-trash"
                           
                          >
                            Eliminar
                          </button>
                        </td>
                  
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No hay egresos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
            </div>
        </section>
    )
}
export default Expense; 