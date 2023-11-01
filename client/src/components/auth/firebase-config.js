import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore"

const config = {
    apiKey: "AIzaSyCZ1q_uU_z2vv7g4v-QTr6UL4y0I56reMg",
    authDomain: "blood-donor-9b76a.firebaseapp.com",
    projectId: "blood-donor-9b76a",
    storageBucket: "blood-donor-9b76a.appspot.com",
    messagingSenderId: "239610073004",
    appId: "1:239610073004:web:0374a47e2e3b555840b409",
    measurementId: "G-B2V2SR1JPH"
}

const app = initializeApp(config);

export const db = getFirestore(app);
export default app;