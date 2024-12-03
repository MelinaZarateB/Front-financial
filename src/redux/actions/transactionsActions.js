import { GET_TRANSACTIONS, CREATE_TRANSACTIONS, DELETE_TRANSACTION } from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para transacciones */
export const createTransactions = (transaction) => {
  return async (dispatch) => {
    try{
      const {data} = await axios.post(`http://localhost:3000/transactions/`, transaction)
      console.log(data)
      if (data) {
        dispatch({
          type: CREATE_TRANSACTIONS,
          payload: true
        })
        Swal.fire({
          text: "La transaccion ha sido creada.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

      }
    }catch(err){
      const mensajeError =
        err.response?.data?.message ||
        "Ocurrio un error al intentar registrar la transacción";
      Swal.fire({
        title: "Error",
        text: mensajeError, 
        icon: "error",
      });
    }
  }
}
/* Action para eliminar transacción */
export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = axios.detele(
        `http://localhost:3000/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        dispatch({
          type: DELETE_TRANSACTION,
          payload: true
        })
        
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
        err.response?.data?.message ||
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
      const { data } = await axios.get("http://localhost:3000/transactions");
      console.log(data);
      if (data) {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
