import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Config API
const firebaseConfig = {
  apiKey: "AIzaSyAFnEOVTVVwgS28hH3fPMqQGXl-Ga9kdHU",
  authDomain: "chat-app-server-v1.firebaseapp.com",
  projectId: "chat-app-server-v1",
  storageBucket: "chat-app-server-v1.appspot.com",
  messagingSenderId: "607329097266",
  appId: "1:607329097266:web:c626fd125f3ffee33bce2b",
};
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

const provider = new GoogleAuthProvider();
provider.getCustomParameters({
  prompt: "Select_account",
});
export const auth = getAuth();

// Sign in method
export const signInWithGoogleAcc = () => signInWithPopup(auth, provider);
export const signInWithEmailAndPass = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();
//create document users
// 1) create by Google Account
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfor = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email, photoURL, uid, phoneNumber } = userAuth;
    const createDateUser = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createDateUser,
        uid,
        phoneNumber,
        ...additionalInfor,
      });
    } catch (err) {
      console.log("Error from create users:", err);
    }
  }
  return userDocRef;
};
//2) Create by Email, Password from User data
export const createUserByEmailAndPass = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
