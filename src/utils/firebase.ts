// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, doc, 
  addDoc, updateDoc, deleteDoc, 
  getDocs, query, where, onSnapshot,
  Timestamp, serverTimestamp
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZCmpVMEm6kpW06UMPsYaB1nQiwr2P_rI",
  authDomain: "test-task-websites.firebaseapp.com",
  projectId: "test-task-websites",
  storageBucket: "test-task-websites.appspot.com",
  messagingSenderId: "48431269539",
  appId: "1:48431269539:web:17986b1b3251f3d737e116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection references
const sitesCollection = collection(db, 'sites');
const tasksCollection = collection(db, 'tasks');
const activityLogsCollection = collection(db, 'activity_logs');

// Helper functions for firestore data conversion
const convertToFirestore = (data: any) => {
  // Convert dates to Firestore Timestamps
  const result = { ...data };
  
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Date) {
      result[key] = Timestamp.fromDate(result[key]);
    }
  });
  
  return result;
};

const convertFromFirestore = (doc: any) => {
  const data = doc.data();
  const result = { ...data, id: doc.id };
  
  // Convert Firestore Timestamps back to JavaScript Date objects
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate();
    }
  });
  
  return result;
};

export {
  db,
  sitesCollection,
  tasksCollection,
  activityLogsCollection,
  convertToFirestore,
  convertFromFirestore,
  serverTimestamp,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot
};