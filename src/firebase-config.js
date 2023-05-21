import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Configuring setup
const env = process.env;
const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
// Exporting db
export const db = getFirestore(app);
