import axios from "axios";
import Swal from "sweetalert2";
import {
  CREATE_INCOME,
  GET_INCOMES,
  FILTER_INCOME,
  CLEAN_FILTER,
  ADD_PAYMENT
} from "../action-types";

export const addMoney = (id, addMoney) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        //`http://localhost:3000/clients/${id}`,
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
        "Ocurrio un error al intentar agregar un pago al cliente.";
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

export const filterIncome = (typeIncome) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        //"http://localhost:3000/movements/filter",
        "https://back-financiera.up.railway.app/movements/filter",
        { category: "ingreso", type: typeIncome }
      );
      if (data) {
        dispatch({
          type: FILTER_INCOME,
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

export const getIncomes = (ingreso) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        //"http://localhost:3000/movements/filter",
        "https://back-financiera.up.railway.app/movements/filter",
        { category: "ingreso" }
      );
      if (data) {
        dispatch({
          type: GET_INCOMES,
          payload: data,
        });
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

export const createIncome = (newIncome, clientId = null) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
       // "http://localhost:3000/movements",
       "https://back-financiera.up.railway.app/movements",
        newIncome
      );
      if (data) {
        dispatch({
          type: CREATE_INCOME,
          payload: true,
        });
        if (clientId === null) {
          Swal.fire({
            text: "El ingreso ha sido creado.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          try {
            await dispatch(updateClientMovements(clientId, data._id));
            await dispatch(addMoney(clientId, { addMoney: data.amount }));
            dispatch({
              type: ADD_PAYMENT,
              payload: true
            })
            Swal.fire({
              text: "El ingreso ha sido creado y se asigno el pago al cliente.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } catch (error) {
            const mensajeError =
              err.response?.data?.message ||
              "Ocurrió un error al intentar asignar el pago al cliente.";
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
        "Ocurrio un error al intentar registrar el ingreso.";
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
        //`http://localhost:3000/clients/${clientId}/arrays`,
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
      console.error(mensajeError);
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
