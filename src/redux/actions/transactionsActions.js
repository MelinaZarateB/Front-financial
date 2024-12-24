import {
  GET_TRANSACTIONS,
  CREATE_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_TRANSACTIOS_FOR_DAY,
  GET_TRANSACTIONS_RANGE_DATE,
  ADD_MONEY
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para transacciones */

export const getTransactionsRangeDate = (subOfficeId, { dateFrom, dateTo }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
       // `http://localhost:3000/transactions/${subOfficeId}/dateRange/${dateFrom}/${dateTo}`
       `https://back-financiera.up.railway.app/transactions/${subOfficeId}/dateRange/${dateFrom}/${dateTo}`
      );
      if (data) {
        dispatch({
          type: GET_TRANSACTIONS_RANGE_DATE,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener las transacciones";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const addMoney = (id, addMoney) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
       // `http://localhost:3000/clients/${id}`,
       `https://back-financiera.up.railway.app/clients/${id}`,
        addMoney
      );
    /*  if (data) {
        Swal.fire({
          text: "La transaccion fue creada y se asigno saldo en guarda al cliente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }*/
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar agregar asignar saldo en guarda.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const createTransactions = (newTransaction, clientId = null) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        //"http://localhost:3000/transactions/",
        "https://back-financiera.up.railway.app/transactions/",
        newTransaction
      );

      if (data) {
        dispatch({
          type: CREATE_TRANSACTIONS,
          payload: data, // Now we're passing the entire data object
        });
        if (clientId === null) {
          Swal.fire({
            text: "La transacción ha sido creada.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }

        // If a client is selected, update their transactions
        else {
          try {
            await dispatch(updateClientTransactions(clientId, data._id));
            await dispatch(
              addMoney(clientId, { addMoney: data.targetAmount })
            );
            dispatch({
              type: ADD_MONEY,
              payload: true
            })
            Swal.fire({
              text: "La transacción ha sido creada y el saldo del cliente ha sido actualizado.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } catch (error) {
            const mensajeError =
              err.response?.data?.message ||
              "Ocurrió un error al intentar asignar saldo en guarda";
            console.error(mensajeError);
            Swal.fire({
              title: "Error",
              text: mensajeError,
              icon: "error",
            });
          }
        }
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "Ocurrió un error al intentar registrar la transacción";
      console.error(mensajeError);
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const updateClientTransactions = (clientId, transactionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(
       // `http://localhost:3000/clients/${clientId}/arrays`,
       `https://back-financiera.up.railway.app/clients/${clientId}/arrays`,
        {
          operation: "add",
          type: "transactions",
          elements: [transactionId],
        }
      );

      if (data) {
        dispatch({
          type: "UPDATE_CLIENT_TRANSACTIONS",
          payload: { clientId, transactionId },
        });

      /*  Swal.fire({
          text: "El saldo en guarda ha sido actualizado para el cliente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });*/
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "Ocurrió un error al intentar actualizar las transacciones del cliente";
      console.error(mensajeError);
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

/* Action para eliminar transacción */
export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      //const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        //`http://localhost:3000/transactions/${transactionId}`
        `https://back-financiera.up.railway.app/transactions/${transactionId}`
        /* {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }*/
      );
      if (data) {
        dispatch({
          type: DELETE_TRANSACTION,
          payload: true,
        });

        Swal.fire({
          title: "Eliminado",
          text: "La transaccion ha sido eliminada.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar eliminar la transacción";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getTransactions = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        //"http://localhost:3000/transactions"
        "https://back-financiera.up.railway.app/transactions");
      if (data) {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener las transacciones";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getTransactionsForDay = (subOfficeId, date) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
       // `http://localhost:3000/transactions/${subOfficeId}/forDay/${date}`
       `https://back-financiera.up.railway.app/transactions/${subOfficeId}/forDay/${date}`
      );
      if (data) {
        dispatch({
          type: GET_TRANSACTIOS_FOR_DAY,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar filtrar las transacciones";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getTransactionsForMonth = () => {};
