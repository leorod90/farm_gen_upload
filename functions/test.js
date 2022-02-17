//check unique
// exports.checkUnique = functions.https.onRequest((req, res) => {
//   if (req.method !== "GET") {
//     return res.status(405).send(`${req.method} is not allowed. Use GET.`);
//   }

//   if (!req.query.hasOwnProperty("username")) {
//     return res.status(400).send("No username provided.");
//   }

//   // Source: https://stackoverflow.com/a/52850529/2758318
//   const isValidDocId = (id) =>
//     id && /^(?!\.\.?$)(?!.*__.*__)([^/]{1,1500})$/.test(id);

//   // Document Ids should be non-empty strings
//   if (!isValidDocId(req.query.username)) {
//     return res.status(400).send("Invalid username string.");
//   }

//   db.collection("usernames")
//     .doc(req.query.username)
//     .get()
//     .then((doc) => {
//       /** If doc exists, the username is unavailable */
//       return res.status(200).send(!doc.exists);
//     })
//     .catch((error) => handleError(req, res));
// });

// enforce uniqueness on username
// app.post("/:farms", (req, res) => {
//   console.log("test");
// ensure user supplied a username to attempt on
// if (req.params.username.length <= 3) {
//   return res.status(400).json({
//     status: 400,
//     message: "username must be at least 4 characters",
//   });
// }

// let username = req.params.username.trim().toLowerCase();
// let unameRef = usernames.doc(username);
// let unameQuery = usernames.where("uid", "==", req.user.uid);
// let userRef = users.doc(req.user.uid);

// db.runTransaction((tx) => {
//   return (
//     tx
//       .get(unameRef)
//       .then((unameDoc) => {
//         // check if usernmae is already assigned to the current user
//         if (unameDoc.exists && unameDoc.data.uid === req.user.uid) {
//           return Promise.reject({
//             status: 400,
//             code: "USERNAME_OWNED_BY_REQUESTER",
//           });
//         }

//         // if its not assigned and exists someone else owns it
//         if (unameDoc.exists) {
//           return Promise.reject({ status: 400, code: "USERNAME_TAKEN" });
//         }

//         return Promise.resolve();
//       })

//       // query usernamaes
//       .then(() => tx.get(unameQuery))

//       // allow a user to change their username by deleting a previously set one
//       // ensure user only has one username by deleting any references found
//       .then((querySnapshot) => {
//         return Promise.all(
//           querySnapshot.docs.map((doc) => tx.delete(doc.ref))
//         );
//       })

//       // assign the username to the authenticated user
//       .then(() => tx.set(unameRef, { uid: req.user.uid }, { merge: true }))

//       // write their new username to the user record for easy access
//       // username has been modified to ensure uniqueness trimmed & lowercased
//       .then(() => tx.set(userRef, { username: username }, { merge: true }))
//   );
// })
//   .then(() => {
//     res.json({
//       username: username, // return the formatted username
//       message: "successfully acquired username",
//     });
//   })
//   .catch((err) => {
//     return res.status(err.code || 500).json(err);
//   });
// });

// module.exports = functions.https.onRequest(app);
