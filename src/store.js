import { createStore } from 'redux';
import GetUsers from './Services/GetUsers';

const initialState = {
  user: GetUsers(1),
  select: [],
};
// action es un objeto
const reducerUsuarios = (state = initialState, action) => {
  if (action.type === 'NEXT_PAGE') {
    return {
      ...state,
      user: GetUsers(action.count),
    };
  } else if (action.type === 'USER_SELECT') {
    return {
      ...state,
      select: action.id,
    };
  }
  return state;
};

export default createStore(reducerUsuarios);
