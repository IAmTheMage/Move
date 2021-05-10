import { call, takeLatest, put } from 'redux-saga/effects';
import firebase from '../../env/firebase';
import fire from 'firebase';
import { Action } from 'redux';

interface Payload extends Action{
  email: string
}

interface ChangePasswordPayload extends Action {
  currentPassword: string;
  newPassword: string;
}

function* sendPasswordResetEmail(payload: Payload) {
  const {email} = payload;
  try {
    yield firebase.auth().sendPasswordResetEmail(email);
    yield put({type: 'SEND_PASSWORD_RESET_EMAIL_SUCCESS'});
  }
  catch {
    yield put({type: 'SEND_PASSWORD_RESET_EMAIL_FAIL'});
  }
}

function* changePassword(payload: ChangePasswordPayload) {
  const {currentPassword, newPassword} = payload;
  const resp: fire.auth.UserCredential = yield firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser?.email || "", currentPassword);
  if(resp.user?.uid) {
    yield firebase.auth().currentUser?.updatePassword(newPassword);
    yield put({type: 'CHANGE_PASSWORD_SUCCESS'});
  }
  else {
    yield put({type: 'CHANGE_PASSWORD_FAIL'});
  }
}

function* resetPasswordSaga() {
  yield takeLatest('SEND_PASSWORD_RESET_EMAIL', sendPasswordResetEmail);
  yield takeLatest('CHANGE_PASSWORD', changePassword);
}

export default resetPasswordSaga;