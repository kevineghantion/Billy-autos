import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    projectId: "salam-m",
    appId: "1:792591309338:web:5be9a202dc109a91d78fa3",
    storageBucket: "salam-m.firebasestorage.app",
    apiKey: "AIzaSyCoD7dcvFDTq-j0L1ZCLsFB5X2-U5_rcyQ",
    authDomain: "salam-m.firebaseapp.com",
    messagingSenderId: "792591309338",
    measurementId: "G-D0J9VGC4GZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
