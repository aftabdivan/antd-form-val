import {getFirestore} from "@firebase/firestore";
import {initializeApp} from "firebase/app";

const firebaseConfig={
    apiKey: "AIzaSyAxhXBIzRnlVHGsXQndT3iwTr8e8cGY5sA",
  authDomain: "ant-d-regitration.firebaseapp.com",
  projectId: "ant-d-regitration",
  storageBucket: "ant-d-regitration.appspot.com",
  messagingSenderId: "766566102801",
  appId: "1:766566102801:web:16a53d05cd6655aa39feb0"
};

const app=initializeApp(firebaseConfig);
const db2=getFirestore(app)

export default db2;