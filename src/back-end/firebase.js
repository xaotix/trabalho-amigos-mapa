import * as firebase from "firebase"
import firestore from 'firebase/firestore'

const firebaseConfig = {
/*removido por questoes de segurança*/
};

const firebaseApp = firebase.app.length > 0 ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = firebaseApp.firestore()
//export default db;
export { db, firebase }


