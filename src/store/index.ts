import {createStore, combineReducers, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga';
import login from './reducers/loginreducer';
import loginSaga from './saga/loginsaga';
import signUp from './reducers/signupreducer';
import signUpSaga from './saga/signupsaga';
import resetPasswordModal from './reducers/resetPasswordModalReducer';
import resetPassword from './reducers/resetpasswordreducer';
import resetPasswordSaga from './saga/passwordresetsaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({login, signUp, resetPasswordModal, resetPassword});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(signUpSaga);
sagaMiddleware.run(resetPasswordSaga);

export default store;