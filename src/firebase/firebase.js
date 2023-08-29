import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

console.log("process.env.projectId", process.env.projectId);

export const firebaseConfig = {
  firebaseConfig: {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  },
};

console.log("firebaseConfig", firebaseConfig);

export const app = initializeApp(firebaseConfig);

export const messaging = async () => (await isSupported()) && getMessaging(app);
