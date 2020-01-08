//import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
//use default axios if you have an api from somewhere else(guaranteed to use another api)
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};