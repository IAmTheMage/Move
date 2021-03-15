import firebase from '../env/firebase';

class LoginApi {
  static async UserLogin(payload: any){
    console.log("CHAMANDO...");
    try {
      await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
      console.log("DEU BOA");
    }
    catch {
      console.log("Error");
    }
    return "Safe";
  }
}

export default LoginApi;