import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu_Q9E0qbWREdmA0xFA7650u3V_KIg7YI",
  authDomain: "e-commercal-intern.firebaseapp.com",
  projectId: "e-commercal-intern",
  storageBucket: "e-commercal-intern.appspot.com",
  messagingSenderId: "564648068535",
  appId: "1:564648068535:web:d553dd8fa4da12305d9432",
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.getCustomParameters({
  prompt: "Select_account",
});

export const auth = getAuth();
export const signIn = () => signInWithPopup(auth, provider);
