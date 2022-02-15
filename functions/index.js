const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
//redirect
exports.redirectToHome = functions.https.onRequest((request, response) => {
  response.redirect("/");
});

exports.redirectToList = functions.https.onRequest((request, response) => {
  response.redirect("/List");
});

//callable

//filter
exports.checkUnique = functions.firestore
  .document("/farms/{documentId}")
  .onCreate((snapshot, context) => {
    console.log(snapshot.data());
    return Promise.resolve();
  });
// exports.checkUnique = functions.https.onRequest((req, res) => {
//   var stuff = [];
//   var db = admin.firestore();
//   db.collection("Users")
//     .doc("7vFjDJ63DmhcQiEHwl0M7hfL3Kt1")
//     .collection("blabla")
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         var newelement = {
//           id: doc.id,
//           xxxx: doc.data().xxx,
//           yyy: doc.data().yyy,
//         };
//         stuff = stuff.concat(newelement);
//       });
//       res.send(stuff);
//       return "";
//     })
//     .catch((reason) => {
//       res.send(reason);
//     });
//   if (Promise.resolve()) {
//   }
// });
