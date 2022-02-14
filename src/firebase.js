import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCxvAJRoIhdnVk-oMxH4TTe2mEujxJYIXY",
    authDomain: "unichat-9758e.firebaseapp.com",
    projectId: "unichat-9758e",
    storageBucket: "unichat-9758e.appspot.com",
    messagingSenderId: "191862734228",
    appId: "1:191862734228:web:4871eb40b646091151a381",
  })
  .auth();
