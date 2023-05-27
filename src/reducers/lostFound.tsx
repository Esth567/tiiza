import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS } from '../actions/types';

import AsyncStorage from '@react-native-async-storage/async-storage';

const user = AsyncStorage.getItem('user');

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GETALL_SUCCESS:
      return {
        ...state,
        items: payload.user,
      };
    case GETALL_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
}
