import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBr_FomVzgrKiKeZFiuOmEtPmEsTSDC7tM",
    authDomain: "todolist-reminder-322fc.firebaseapp.com",
    databaseURL: "https://todolist-reminder-322fc.firebaseio.com",
    projectId: "todolist-reminder-322fc",
    storageBucket: "todolist-reminder-322fc.appspot.com",
    messagingSenderId: "80797969934"
};


firebase.initializeApp(config);


const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

export { db, firebase }
