import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD3zOQ3GKQsOAZ23SupJMui6Ux_e-NznDU",
    authDomain: "grpac-f0036.firebaseapp.com",
    projectId: "grpac-f0036",
    storageBucket: "grpac-f0036.appspot.com",
    messagingSenderId: "288306732773",
    appId: "1:288306732773:web:3cab47751ef92300f07e0c",
    measurementId: "G-FGH3L9P123"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);