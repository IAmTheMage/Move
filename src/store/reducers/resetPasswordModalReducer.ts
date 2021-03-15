import { Action } from "redux";

interface STATE {
  isOpen: boolean;
}

const INITIAL_STATE: STATE = {
  isOpen: false
}

function resetPasswordModal(state = INITIAL_STATE, action: Action) {
  switch(action?.type) {
    case 'OPEN_RESETPASSWORD_MODAL':
      state = {isOpen: true};
      return state;
    case 'CLOSE_RESETPASSWORD_MODAL':
      state = {isOpen: false};
      return state;
    default:
      return state;
  }
}

export default resetPasswordModal;