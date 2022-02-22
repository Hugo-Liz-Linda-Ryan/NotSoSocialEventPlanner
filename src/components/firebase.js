import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBiaEl6TBrkreyvbQsNANcHp-3gUpERxMM",
    // authDomain: "not-so-social-event-planner.firebaseapp.com",
    // projectId: "not-so-social-event-planner",
    // storageBucket: "not-so-social-event-planner.appspot.com",
    // messagingSenderId: "501155585160",
    // apiKey: "AIzaSyD9nyz8migShlDpDcALGEyxXt8arog9UjY",

    authDomain: "notsosocial-7c700.firebaseapp.com",
    databaseURL: "https://notsosocial-7c700-default-rtdb.firebaseio.com",
    projectId: "notsosocial-7c700",
    storageBucket: "notsosocial-7c700.appspot.com",
    messagingSenderId: "283746257345",
    appId: "1:283746257345:web:f3a49220cc5dc959ac0740"

};

firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
