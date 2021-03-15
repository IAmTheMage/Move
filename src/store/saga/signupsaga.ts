import { call, takeLatest, put } from 'redux-saga/effects';
import firebase from '../../env/firebase';
import fire from 'firebase';
import { Action } from 'redux';

interface Payload extends Action {
  email: string;
  name: string;
  password: string;
}

function* signUpWithEmailAndPassword(payload: Payload) {
  try {
    const {name, email, password} = payload;
    const user: fire.auth.UserCredential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    yield user.user?.updateProfile({
      displayName: name
    });
    yield user.user?.sendEmailVerification();
    yield put({type: 'USER_SIGNUP_SUCCESS'});
  }
  catch {
    yield put({type: 'USER_SIGNUP_FAIL'});
  }

}

function* signupSaga() {
  yield takeLatest("SIGNUP_WITH_EMAIL_AND_PASSWORD", signUpWithEmailAndPassword);
}

export default signupSaga;