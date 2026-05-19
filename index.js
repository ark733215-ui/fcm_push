const express = require("express");
const admin = require("firebase-admin");

const app = express();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({

  credential:
    admin.credential.cert(serviceAccount),

  databaseURL:
    "https://rto-1-4b543-default-rtdb.firebaseio.com/"
});

app.get("/", (req, res) => {

  res.send("SERVER RUNNING");

});

app.get("/send/:id", async (req, res) => {

  try {

    const deviceId = req.params.id;

    console.log("DEVICE ID:", deviceId);

    // GET TOKEN FROM FIREBASE

    const snapshot =
      await admin.database()
      .ref("FCM/" + deviceId)
      .once("value");

    const token = snapshot.val();

    console.log("TOKEN:", token);

    if (!token) {

      return res.send("TOKEN NOT FOUND");
    }

    // SEND PUSH

    const message = {

      token: token,

      data: {
        action: "wake"
      },

      android: {
        priority: "high"
      }
    };

    const response =
      await admin.messaging()
      .send(message);

    console.log(response);

    return res.send("PUSH SENT");

  } catch (e) {

    console.log(e);

    return res.send(e.toString());
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("SERVER STARTED");

});
