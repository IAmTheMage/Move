interface STATE {
  success?: boolean;
  fail?: boolean;
}

const INITIAL_STATE: STATE = {
  fail: false
}

function resetPassword(state = INITIAL_STATE,action: any) {
  switch(action.type) {
    case 'SEND_PASSWORD_RESET_EMAIL_SUCCESS':
      state = {success: true, fail: false};
      return state;
    case 'SEND_PASSWORD_RESET_EMAIL_FAIL':
      state = {fail: true, success: false};
      return state;
    default:
      return state;
  }
}

export default resetPassword;