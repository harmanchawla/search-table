const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccount.json");
const data = require("./people.json");

const collectionKey = "dummyPeople"; //name of the collection

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rethink-efc70.firebaseio.com"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}
