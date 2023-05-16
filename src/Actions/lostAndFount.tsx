import { CREATE_LOSTITEM_SUCCESS, CREATE_LOSTITEM_FAIL, CREATE_FOUNDITEM_SUCCESS, CREATE_FOUNDITEM_FAIL } from './types';

import lostFoundServices from '../services/lostFound.service';

export const lostItem =
  (
    item_name,
    discovery_location,
    date_found,
    pickup_location,
    item_type,
    item_color,
    description
  ) =>
  (dispatch) => {
    return lostFoundServices
      .lostItem(
        item_name,
        discovery_location,
        date_found,
        pickup_location,
        item_type,
        item_color,
        description
      )
      .then(
        (response) => {
          dispatch({
            type: CREATE_FOUNDITEM_SUCCESS,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });

          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch({
            type: CREATE_FOUNDITEM_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject();
        }
      );
  };

