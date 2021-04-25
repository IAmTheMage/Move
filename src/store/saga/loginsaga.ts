import {call, takeLatest, put} from 'redux-saga/effects';
import {Login} from '../types/loginreducertypes';
import Api from '../../actions/login';
import firebase from '../../env/firebase';
import fire from 'firebase';

function* loginWithEmailAndPassword(payload: Login) {
  try {
    const {email, password} = payload;
    const user: fire.auth.UserCredential = yield firebase.auth().signInWithEmailAndPassword(email, password);
    if(user.user?.emailVerified) {
      yield put({type: 'USER_LOGIN_SUCCESS'});
    }
    else {
      yield put({type: 'USER_LOGIN_EMAIL_NOT_VERIFIED'});
    }
  }
  catch(e) {
    yield put({type: 'USER_LOGIN_FAIL', error: e});
  }
}

function* loginSaga() {
 yield takeLatest("USER_LOGIN_REQUEST", loginWithEmailAndPassword);
}

export default loginSaga;