import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBiaEl6TBrkreyvbQsNANcHp-3gUpERxMM",
    authDomain: "not-so-social-event-planner.firebaseapp.com",
    projectId: "not-so-social-event-planner",
    storageBucket: "not-so-social-event-planner.appspot.com",
    messagingSenderId: "501155585160",
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
