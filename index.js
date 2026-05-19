const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount =
require("./serviceAccountKey.json");

admin.initializeApp({
  credential:
    admin.credential.cert(serviceAccount),

  databaseURL:
    "https://rto-1-4b543-default-rtdb.firebaseio.com"
});

app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

app.get("/send/:id", async (req, res) => {

  try {

    const androidID = req.params.id;

    const snapshot = await admin.database()
      .ref("FCM/" + androidID)
      .once("value");

    const token = snapshot.val();

    if (!token) {
      return res.send("TOKEN NOT FOUND");
    }

    return res.send(token);

  } catch (e) {

    return res.send(e.toString());
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running");
});
