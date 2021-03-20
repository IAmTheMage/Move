interface STATE {
  success?: boolean;
  fail?: string;
}

const INITIAL_STATE: STATE = {
  fail: ""
}

function USER_SIGNUP_SUCCESS(state = INITIAL_STATE,action: any) {
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

export default USER_SIGNUP_SUCCESS;