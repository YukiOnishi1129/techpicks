import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON as string)),
  });
}

export const db = getFirestore();
