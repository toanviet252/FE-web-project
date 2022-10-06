import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  query,
  getDocs,
} from "firebase/firestore";

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
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.getCustomParameters({
  prompt: "Select_account",
});

export const addCollectionAndDocuments = async (collectKey, objectsToAdd) => {
  const collectionRef = collection(db, collectKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.name);
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getProductsAndDocuments = async () => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((docSnapshot) => {
    return docSnapshot.data();
  });
  return products;
};

export const auth = getAuth();
export const signIn = () => signInWithPopup(auth, provider);
