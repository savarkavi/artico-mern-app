import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzNu1sR4WxVszXEUMA4UmGAyF_IxWg3CM",
  authDomain: "blogs-mern-app.firebaseapp.com",
  projectId: "blogs-mern-app",
  storageBucket: "blogs-mern-app.appspot.com",
  messagingSenderId: "910590960530",
  appId: "1:910590960530:web:65f24b47b501b46e3b174b",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });

  return user;
};
