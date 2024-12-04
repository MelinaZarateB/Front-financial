import { GET_ALL_MOVEMENTS, DELETE_MOVEMENT } from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

export const getAllMovements = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3000/movements");
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
        `http://localhost:3000/movements/${movementId}`
      );
      if (data) {
        dispatch({
          type: DELETE_MOVEMENT,
          payload: true,
        });
        Swal.fire({
          title: "Eliminado",
          text: "El movimiento ha sido eliminada.",
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
