import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  query,
  getDocs,
  getDoc,
  setDoc,
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
//Tạo một database
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.getCustomParameters({
  prompt: "Select_account",
});

//Doc chứa 3 tham số, tham số đầu tiên là database, tham số thứ 2 là tên của collection, tham số thứ 3 là data của người dùng chuyền vào collection đó
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); //Ở đây ta lấy uid do google cung cấp để dịnh danh user
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  //Kiểm tra xem người dùng đã có trên database hay chưa, nếu không tạo một users mới
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createDateUser = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createDateUser,
      });
    } catch (err) {
      console.log("error from create account", err);
    }
  }
  //Nếu đã tồn tại thì trả về thông tin users
  return userDocRef;
};

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
