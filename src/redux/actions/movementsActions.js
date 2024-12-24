import { GET_ALL_MOVEMENTS, DELETE_MOVEMENT, FILTER_MOVEMENT, CLEAN_FILTER  } from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";


export const cleanFilter = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_FILTER,
      payload: [],
    });
  };
};

export const filterMovement = (typeMovement) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
       // "http://localhost:3000/movements/filter",
       "https://back-financiera.up.railway.app/movements/filter",
        { type: typeMovement }
      );
      if (data) {
        dispatch({
          type: FILTER_MOVEMENT,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar filtrar los movimientos.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};


export const getAllMovements = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(//
      // "http://localhost:3000/movements"
      "https://back-financiera.up.railway.app/movements");
      if (data) {
        dispatch({
          type: GET_ALL_MOVEMENTS,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener los movimientos";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const deleteMovement = (movementId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        //`http://localhost:3000/movements/${movementId}`
        `https://back-financiera.up.railway.app/movements/${movementId}`
      );
      if (data) {
        dispatch({
          type: DELETE_MOVEMENT,
          payload: true,
        });
        Swal.fire({
          title: "Eliminado",
          text: "El movimiento ha sido eliminado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar eliminar un movimiento";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
