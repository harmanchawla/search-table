import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDhm7ni5G69UYgMSiqxvRF9PJdhlco2ieY",
    authDomain: "rethink-efc70.firebaseapp.com",
    databaseURL: "https://rethink-efc70.firebaseio.com",
    projectId: "rethink-efc70",
    storageBucket: "rethink-efc70.appspot.com",
    messagingSenderId: "986283696519",
    appId: "1:986283696519:web:6bc699f1d9ac8bc5b03322",
    measurementId: "G-SQQ87C4YE6"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;