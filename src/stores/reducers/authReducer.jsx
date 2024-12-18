const intialState = {
  isAuthenticated: false,
  role: null,
  uid: null,
  expiry: null,
  check: null,
  token: null,
  name: null,
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
        uid: action.payload.uid,
        check: action.payload.check,
        expiry: action.payload.expiry,
        token: action.payload.token,
        name: action.payload.name,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        uid: null,
        check: null,
        expiry: null,
        token: null,
        name: null,
      };
    default:
      return state;
  }
};

export default authReducer;
