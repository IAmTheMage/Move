interface STATE {
  success?: boolean;
  fail?: string;
}

const INITIAL_STATE: STATE = {
  fail: ""
}

function login(state = INITIAL_STATE,action: any) {
  switch(action.type) {
    case 'USER_LOGIN_SUCCESS':
      state = {success: true, fail: ""};
      return state;
    case 'USER_LOGIN_FAIL':
      state = {fail: "Algo deu errado, por favor tente novamente mais tarde", success: false};
      return state;
    case 'USER_LOGIN_EMAIL_NOT_VERIFIED':
      state = {success: false, fail: "Por favor verifique seu email para prosseguir"};
      return state;
    default:
      return state;
  }
}

export default login;