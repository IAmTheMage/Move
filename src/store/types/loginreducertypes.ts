import {Action} from 'redux';

export interface Login extends Action {
  email:string;
  password:string;
}