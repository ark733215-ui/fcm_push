const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rto-1-4b543-default-rtdb.firebaseio.com"
});

app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

app.get("/test", async (req, res) => {

  try {

    await admin.database().ref("test").set("hello");

    res.send("FIREBASE CONNECTED");

  } catch (e) {

    res.send(e.toString());

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running");
});
