// firebaseAdmin.js
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Load JSON using require
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
