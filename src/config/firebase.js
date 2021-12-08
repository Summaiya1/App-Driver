import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  getDocs,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdjpcjPpRmzfi98v8HfLvtBytwpKdQIyw",
  authDomain: "carsist-5c761.firebaseapp.com",
  projectId: "carsist-5c761",
  storageBucket: "carsist-5c761.appspot.com",
  messagingSenderId: "750585716376",
  appId: "1:750585716376:web:f0ea2d49e84641b3e2baed",
  measurementId: "G-F614Z8RNRP",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function getLocation() {
  const q = query(collection(db, "location"));
  onSnapshot(q, (querySnapshot) => {
    const userLocation = [];
    querySnapshot.forEach((doc) => {
      userLocation.push({ ...doc.data(), id: doc.id });
    });
  });
}

async function getUserData(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
}

async function addDriver(id, name) {
  const docRef = doc(db, "Driver", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return;
  } else {
    await setDoc(doc(db, "Driver", id), {
      name,
    });
    // doc.data() will be undefined in this case
  }
}
async function updatelocation(id, latitude, longitude) {
  const docRef = doc(db, "Driver", id);
  await updateDoc(docRef, {
    latitude,
    longitude,
  });
}

async function updateStatus(id,status)
{
  const docRef = doc(db, "Rides", id);
  await updateDoc(docRef, {
    status:status
  });
}


export { getLocation, getUserData, addDriver, updatelocation,updateStatus};
