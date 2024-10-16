import "./Income.css";
import { useState } from "react";

const incomesArray = [
    {
      _id: 1,
      tipo: "Venta de productos",
      usuario: "Juan",
      descripcion: "Ingreso por la venta de productos electrónicos",
      monto: 25000.0,
      fecha: "2024-10-14T14:30:00",
      sucursal: "Sucursal Central",
    },
    {
      id: 2,
      tipo: "Pago de clientes",
      usuario: "María",
      descripcion: "Cobro de facturas pendientes de clientes",
      monto: 8200.5,
      fecha: "2024-10-14T09:15:00",
      sucursal: "Sucursal Norte",
    },
    {
      id: 3,
      tipo: "Inversión externa",
      usuario: "Carlos",
      descripcion: "Ingreso por inversión de un socio capitalista",
      monto: 15000.0,
      fecha: "2024-10-13T16:45:00",
      sucursal: "Sucursal Sur",
    },
    {
      id: 4,
      tipo: "Renta de propiedad",
      usuario: "Ana",
      descripcion: "Ingreso por alquiler de espacio comercial",
      monto: 6000.0,
      fecha: "2024-10-12T12:00:00",
      sucursal: "Sucursal Central",
    },
    {
      id: 5,
      tipo: "Servicio de consultoría",
      usuario: "Luis",
      descripcion: "Pago por servicios de consultoría empresarial",
      monto: 4500.25,
      fecha: "2024-10-11T08:00:00",
      sucursal: "Sucursal Este",
    },
    {
      id: 6,
      tipo: "Venta de software",
      usuario: "Sofía",
      descripcion: "Ingreso por la venta de licencias de software",
      monto: 5800.0,
      fecha: "2024-10-10T10:30:00",
      sucursal: "Sucursal Oeste",
    },
    {
      id: 7,
      tipo: "Devolución de impuestos",
      usuario: "Pedro",
      descripcion: "Ingreso por devolución de impuestos",
      monto: 4000.0,
      fecha: "2024-10-09T11:15:00",
      sucursal: "Sucursal Central",
    },
  ];
  

const Income = () => {
  const [type, setType] = useState("");
  const[selectType, setSelectType] = useState('')

  const handleChangeType = (event) => {
    setSelectType(event.target.value)


  }

  // Calcular el total de los montos
  const total = incomesArray.reduce((acc, income) => acc + income.monto, 0);

  return (
    <section className="section-expense">
      <div>
        <button className="btn-create-user">
          Registrar ingreso
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#06571f"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>
      </div>
      <div>
        <div className="container-search-purchase">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '3px' }}>
            <div className="input-box-dashboard">
            <input
              type="text"
              className="input-field-dashboard"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="label-input-dashboard">Buscar ingreso por tipo</label>
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
                fill="#06571f"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="container-table">
          <div className="tbl-container">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Usuario</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Sucursal</th>
                  <th colSpan="1"></th>
                </tr>
              </thead>
              <tbody>
                {incomesArray && incomesArray.length > 0 ? (
                  incomesArray.map((income) => (
                    <tr key={income._id}>
                      <td data-table="Tipo">{income.tipo}</td>
                      <td data-table="Usuario">{income.usuario}</td>
                      <td data-table="Descripción">{income.descripcion}</td>
                      <td data-table="Monto">$ {income.monto.toFixed(2)}</td>
                      <td data-table="Fecha">
                        {new Date(income.fecha)
                          .toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(",", "")}
                      </td>
                      <td data-table="Sucursal">{income.sucursal}</td>

                      <td>
                        <button className="btn-trash">Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No hay egresos disponibles
                    </td>
                  </tr>
                )}

                {/* Fila para el total */}
                <tr>
                  <td colSpan="4" style={{ textAlign: "right" }}>
                    <strong> Total: $ {total.toFixed(2)}</strong>
                  </td>
                  <td colSpan="3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Income;
