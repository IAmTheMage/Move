import { call, takeLatest, put } from 'redux-saga/effects';
import firebase from '../../env/firebase';
import fire from 'firebase';
import { Action } from 'redux';

interface Payload extends Action{
  email: string
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

function* resetPasswordSaga() {
  yield takeLatest('SEND_PASSWORD_RESET_EMAIL', sendPasswordResetEmail);
}

export default resetPasswordSaga;