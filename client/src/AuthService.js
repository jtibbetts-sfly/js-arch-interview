import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

const AuthContext = createContext(null);
const initialState = {};

function authRreducer(state, action) {
  switch (action.type) {
  case SET_AUTH:
    return action.payload;
  case CLEAR_AUTH:
    return {};
  default:
    throw new Error();
  }
}

async function authenticate(username, password) {
  return fetch('http://localhost:3001/authenticate', {method: 'POST', body: JSON.stringify({username, password})}).then(async (res) => {
    if (res.status === 200) {
      return await res.json()
    } else {
      const data = await res.json();
      throw new Error(data.msg);
    }
  });
}

function useAuthReducer() {
  return useReducer(authRreducer, initialState);
}

function useAuth() {
  const [user, dispatch] = useContext(AuthContext);
  const setAuth = useCallback((data) => dispatch({type: SET_AUTH, payload: data}), [dispatch]);
  const clearAuth = useCallback(() => dispatch({type: CLEAR_AUTH}), [dispatch]);
  const headers = useMemo(() => ({Authorization: `Bearer ${user.token}`}), [user.token]);
  const authenticated = useMemo(() => !!user.token, [user.token]);
  return {user, setAuth, clearAuth, headers, authenticate, authenticated};
}

export {
  useAuthReducer,
  useAuth,
  AuthContext,
}