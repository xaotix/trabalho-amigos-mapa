import * as firebase from "firebase"
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCIFMu7wJRToJtalRI7qRk5yfFNQSKe9oU",
    authDomain: "xaotix-amigos.firebaseapp.com",
    databaseURL: "https://xaotix-amigos.firebaseio.com",
    projectId: "xaotix-amigos",
    storageBucket: "xaotix-amigos.appspot.com",
    messagingSenderId: "870183977099",
    appId: "1:870183977099:web:4de4f6a4552a7e4861548e"
};

const firebaseApp = firebase.app.length > 0 ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = firebaseApp.firestore()
//export default db;
export { db, firebase }


