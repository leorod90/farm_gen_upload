const functions = require("firebase-functions");

//test
exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  console.log(number);
  response.send(number.toString());
});

//redirect
exports.redirectToHome = functions.https.onRequest((request, response) => {
  response.redirect("/");
});

exports.redirectToList = functions.https.onRequest((request, response) => {
  response.redirect("/List");
});

//callable
exports.sayHello = functions.https.onCall((data, context) => {
  return `hello world`;
});

