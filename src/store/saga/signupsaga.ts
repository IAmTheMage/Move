import { takeLatest, put } from 'redux-saga/effects';
import firebase, {Database} from '../../env/firebase';
import fire from 'firebase';
import { Action } from 'redux';

interface Payload extends Action {
  email: string;
  name: string;
  password: string;
}

function getDateInBrasilFormat() {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  return `${day > 10 ? day : "0" + day.toString()}/${month + 1 > 10 ? month + 1 : "0" + month.toString()}/${year}`;
}

function* signUpWithEmailAndPassword(payload: Payload) {
  try {
    const {name, email, password} = payload;
    const user: fire.auth.UserCredential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    yield Database.collection('users').doc(user.user?.uid).set({
      date: getDateInBrasilFormat(),
      seriesCompleted: 0,
      exercisesCompleted: 0,
    })
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