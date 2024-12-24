import {
  GET_CLIENTS,
  CREATE_CLIENTS,
  DELETE_CLIENTS,
  UPDATE_CLIENTS,
  ADD_MONEY,
  SUBTRACT_MONEY,
  ADD_PAYMENT,
  ADD_DEBT,
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

export const addPayment = (id, addPayment) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        //`http://localhost:3000/clients/${id}`,
        `https://back-financiera.up.railway.app/clients/${id}`,
        addPayment
      );
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar agregar el pago al cliente.";
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
      if (data) {
        Swal.fire({
          text: "Se asigno saldo en guarda al cliente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar agregar asignar el pago.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const subtractMoney = (id, subtractMoney) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
       // `http://localhost:3000/clients/${id}`,
       `https://back-financiera.up.railway.app/clients/${id}`,
        subtractMoney
      );
      if (data) {
        Swal.fire({
          text: "Se retiro saldo al cliente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {}
  };
};

export const updateMoneyClients = ({ id, money }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        //`http://localhost:3000/clients/${id}`,
        `https://back-financiera.up.railway.app/clients/${id}`, {
        money: money,
      });
      dispatch({
        type: UPDATE_CLIENTS,
        payload: data,
      });
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar actualizar el cliente.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const updateClients = (id, clientUpdate) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
       // `http://localhost:3000/clients/${id}`,
       `https://back-financiera.up.railway.app/clients/${id}`,
        clientUpdate
      );
      dispatch({
        type: UPDATE_CLIENTS,
        payload: data,
      });
      if (data) {
        Swal.fire({
          text: "El cliente ha sido actualizado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar actualizar el cliente.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const deleteClients = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
       // `http://localhost:3000/clients/${id}`
       `https://back-financiera.up.railway.app/clients/${id}`
      );
      if (data) {
        dispatch({
          type: DELETE_CLIENTS,
          payload: true,
        });
        Swal.fire({
          text: "El cliente ha sido eliminado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar borrar el cliente.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const createClients = (newClient) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
       // "http://localhost:3000/clients",
       "https://back-financiera.up.railway.app/clients",
        newClient
      );
      if (data) {
        dispatch({
          type: CREATE_CLIENTS,
          payload: data,
        });
        Swal.fire({
          text: "El cliente ha sido creado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar crear el cliente.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getClients = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        //"http://localhost:3000/clients/"
        "https://back-financiera.up.railway.app/clients");
      if (data) {
        dispatch({
          type: GET_CLIENTS,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener los clientes.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
