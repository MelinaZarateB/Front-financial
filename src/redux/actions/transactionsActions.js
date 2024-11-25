import { GET_TRANSACTIONS } from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para transacciones */
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
        Swal.fire({
          title: "Eliminado",
          text: "La transaccion ha sido eliminada.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {}
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
