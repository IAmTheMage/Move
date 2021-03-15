interface STATE {
  success?: boolean;
  fail?: string;
}

const INITIAL_STATE: STATE = {
  fail: ""
}

function signUp(state = INITIAL_STATE,action: any) {
  switch(action.type) {
    case 'USER_SIGNUP_SUCCESS':
      state = {success: true, fail: ""};
      return state;
    case 'USER_SIGNUP_FAIL':
      state = {fail: "Algo deu errado, por favor tente novamente mais tarde", success: false};
      return state;
    default:
      return state;
  }
}

export default signUp;