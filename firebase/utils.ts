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

interface FarmInputProps {
  displayName: string;
  storeImage: string;
  storePhone: string;
  storeHours: {
    open: string;
    close: string;
  };
}
//methods

//AUTH
export const registerUser = async ({ authEmail, authPassword }: AuthProps) => {
  try {
    const data = await createUserWithEmailAndPassword(
      auth,
      authEmail,
      authPassword
    );
    return data.user.email;
  } catch (error) {
    console.log(error.message);
  }
};
export const signInUser = async ({ authEmail, authPassword }: AuthProps) => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      authEmail,
      authPassword
    );
    return data.user.email;
  } catch (error) {
    console.log(error.message);
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
export const realTimeGetFarm = async () => {
  let farms: any = [];
  await onSnapshot(farmsRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      farms.push({ id: doc.id, ...doc.data() });
    });
  });
  return farms;
};

export const getFarms = async () => {
  try {
    const data = await getDocs(farmsRef);
    //returns array
    const farms = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log(farms);
  } catch (error) {
    console.log(error.message);
  }
};

//add doc
export const addFarm = async (farmInput: FarmInputProps) => {
  try {
    addDoc(farmsRef, farmInput);
  } catch (error) {
    console.log(error.message);
  }
};
//delete doc
export const deleteFarm = async (id: string) => {
  const docRef = doc(db, "farms", id);

  await deleteDoc(docRef);
};
