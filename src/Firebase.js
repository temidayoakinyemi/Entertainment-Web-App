import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtqNQJ_mApL9d3surBrJzEbFLya6vbKg0",
  authDomain: "entertainment-web-app-a5d84.firebaseapp.com",
  projectId: "entertainment-web-app-a5d84",
  storageBucket: "entertainment-web-app-a5d84.appspot.com",
  messagingSenderId: "488236835378",
  appId: "1:488236835378:web:9900f3d38d0b71491bd22b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Optional: export app if needed elsewhere
export default app;
