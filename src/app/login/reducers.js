import * as actions from "./actions";

const initState = {
  isLoading: false,
  error: false,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      const traplinkedData = {
        token: action.token,
      };
      localStorage.setItem('USER_INFO', JSON.stringify(traplinkedData));
      return {
        ...state,
        ...{
          token: action.token,
          error: action.error
        },
      };
      case actions.LOGIN_ERROR:
      return {
        ...state,
        ...{
          error: action.error,
        },
      };
    
    default:
      return state;
  }
}
