import {
  CREATE_LOSTITEM_SUCCESS,
  CREATE_LOSTITEM_FAIL,
  CREATE_LOSTITEM_LOADING,
} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const user = AsyncStorage.getItem('user');

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LOSTITEM_SUCCESS:
      return {
        ...state,
        items: action.users,
      };
    case CREATE_LOSTITEM_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_LOSTITEM_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
  };
    

