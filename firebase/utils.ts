// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//init firebase
const app = initializeApp(firebaseConfig);
//init service
export const db = getFirestore(app);
export const auth = getAuth(app);

export const farmsRef = collection(db, "farms");

//Props
interface AuthProps {
  authEmail: string;
  authPassword: string;
}

//AUTH
export const registerUser = async ({ authEmail, authPassword }: AuthProps) => {
  try {
    const data = await createUserWithEmailAndPassword(
      auth,
      authEmail,
      authPassword
    );
    return data.user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const signInUser = async ({ authEmail, authPassword }: AuthProps) => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      authEmail,
      authPassword
    );
    return data.user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};
export const checkIfLoggedIn = async () => {
  const loggedIn = await onAuthStateChanged(auth, (currentUser) => currentUser);
  return loggedIn;
};
//FARM

//get doc
export const getHorizontalFarm = async () => {
  const q = query(farmsRef, orderBy("createdAt", "asc"));
  await onSnapshot(q, (snapshot) => {
    let farms: any = [];
    snapshot.docs.forEach((doc) => {
      farms.push({ id: doc.id, ...doc.data() });
    });
    console.log(farms);
  });
};

export const getVerticalFarm = async () => {};

//CRUD

//add doc
export const addFarm = async (values: any, uid: string) => {
  const { displayName, storeImage, storePhone, storeOpen, storeClose } = values;
  let nameTaken = false;
  const idName = displayName.replace(/ /g, "").toLowerCase();
  const data = await getDocs(farmsRef);
  const farms = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  nameTaken = farms.some((i) => i.idName == idName);

  if (nameTaken) {
    return alert("Name Taken!");
  } else {
    try {
      console.log(storeImage);
      await addDoc(farmsRef, {
        createdBy: uid,
        createdAt: serverTimestamp(),
        idName,
        displayName,
        storeImage,
        storePhone,
        storeHours: {
          open: storeOpen,
          close: storeClose,
        },
      });

      // });
    } catch (error) {
      console.log(error.message);
    }
  }
};

//delete doc
export const deleteFarm = async (id: string) => {
  const docRef = doc(db, "farms", id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};
