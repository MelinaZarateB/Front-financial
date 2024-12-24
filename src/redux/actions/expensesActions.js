import axios from "axios";
import Swal from "sweetalert2";
import {
  CREATE_EXPENSE,
  GET_EXPENSES,
  FILTER_EXPENSE,
  CLEAN_FILTER,
  ADD_DEBT,
} from "../action-types";

export const subtractMoney = (id, subtractMoney) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        //`http://localhost:3000/clients/${id}`,
        `https://back-financiera.up.railway.app/clients/${id}`,
        subtractMoney
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
        "Ocurrio un error al intentar agregar deuda al cliente.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const cleanFilter = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_FILTER,
      payload: [],
    });
  };
};

export const filterExpense = (typeExpense) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
       // "http://localhost:3000/movements/filter",
       "https://back-financiera.up.railway.app/movements/filter",
        { category: "egreso", type: typeExpense }
      );
      if (data) {
        dispatch({
          type: FILTER_EXPENSE,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar filtrar los egresos.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getExpenses = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
       //"http://localhost:3000/movements/filter",
       "https://back-financiera.up.railway.app/movements/filter",
        { category: "egreso" }
      );
      if (data) {
        dispatch({ type: GET_EXPENSES, payload: data });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener los egresos.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const createExpense = (newExpense, clientId = null) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
       // "http://localhost:3000/movements",
       "https://back-financiera.up.railway.app/movements",
        newExpense
      );
      if (data) {
        dispatch({
          type: CREATE_EXPENSE,
          payload: true,
        });
        if (clientId === null) {
          Swal.fire({
            text: "El egreso ha sido creado.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          try {
            await dispatch(updateClientMovements(clientId, data._id));
            await dispatch(
              subtractMoney(clientId, { subtractMoney: data.amount })
            );
            dispatch({
              type: ADD_DEBT,
              payload: true,
            });

            Swal.fire({
              text: "El egreso ha sido creado y se asigno la deuda al cliente.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } catch (error) {
            const mensajeError =
              err.response?.data?.message ||
              "Ocurrió un error al intentar asignar la deuda al cliente.";
            console.error(mensajeError);
            Swal.fire({
              title: "Error",
              text: mensajeError,
              icon: "error",
            });
          }
        }
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar registrar el egreso.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const updateClientMovements = (clientId, movementId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(
       // `http://localhost:3000/clients/${clientId}/arrays`,
       `https://back-financiera.up.railway.app/clients/${clientId}/arrays`,
        {
          operation: "add",
          type: "movements",
          elements: [movementId],
        }
      );

      if (data) {
        dispatch({
          type: "UPDATE_CLIENT_TRANSACTIONS",
          payload: { clientId, movementId },
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
        "Ocurrió un error al intentar actualizar los movimientos del cliente";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
