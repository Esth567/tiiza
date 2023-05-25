import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS, SET_MESSAGE } from "./types";
import { userServices } from "../services/userServices";

export const fetchFoundItems = (email, user_id) => (dispatch) => {
  return userServices.fetchFoundItems(email, user_id).then(
    (data) => {
      dispatch({
        type: GETALL_REQUEST,
      });

      dispatch({
        type: GETALL_SUCCESS,
        payload: { res: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GETALL_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const fetchLostItems = (email) => (dispatch) => {
  return userServices.fetchLostItems(email).then(
    (data) => {
      dispatch({
        type: GETALL_REQUEST,
      });

      dispatch({
        type: GETALL_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GETALL_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


