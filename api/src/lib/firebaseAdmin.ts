import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
const serviceAccount = require("../../secret/firebase-service-account.json");

const firebaseAdminApp =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount),
  });

export const adminAuth = getAuth(firebaseAdminApp);
