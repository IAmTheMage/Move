import {takeLatest, put} from 'redux-saga/effects';
import firebase, {Database} from '../../env/firebase';
import fire from 'firebase';

function* endVideo() {
  const userInfo: fire.firestore.DocumentSnapshot<fire.firestore.DocumentData> = yield Database.collection('users').doc(firebase.auth().currentUser?.uid).get();
  const userData = userInfo.data();
  yield Database.collection('users').doc(firebase.auth().currentUser?.uid).set({
    ...userData,
    exercisesCompleted: userData?.exercisesCompleted + 1,
  })
}


function* videoSaga() {
  yield takeLatest('END_VIDEO', endVideo);
}

export default videoSaga;