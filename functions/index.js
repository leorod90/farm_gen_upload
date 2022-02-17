const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.checkUnique = functions.https.onCall((data, context) => {
  if (!context.auth) {
    //check if logged in
    throw new functions.https.HttpsError("unauthenticated", "please log in");
  }
  console.log(data);
  // admin.firestore().collection('farms').add({

  // })
});

exports.logActivities = functions.firestore
  .document("farms/{id}")
  .onCreate(async (snap, context) => {
    console.log(snap.data);
    throw new functions.https.HttpsError("already-exists", "Error");
    console.log(snap.data);
    const id = context.params.id;

    const farms = admin.firestore().collection("farms");
    console.log("--------------");
    console.log(farms);
  });
