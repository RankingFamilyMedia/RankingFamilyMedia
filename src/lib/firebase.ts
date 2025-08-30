
import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "junglebeats-marketplace",
  "appId": "1:313355238358:web:4ad9c5bdd9a455d9e00277",
  "storageBucket": "junglebeats-marketplace.firebasestorage.app",
  "apiKey": "AIzaSyAw0RHPV14oqp9h-ZaU3ZuyoDs8izyI2Vg",
  "authDomain": "junglebeats-marketplace.firebaseapp.com",
  "measurementId": "G-VVK1XNT08N",
  "messagingSenderId": "313355238358"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };

