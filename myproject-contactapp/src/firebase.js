import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_7e0tTXCRCYwBjkzzJtHbYHWdTAyA78o",
  authDomain: "myproject-cloudstorage.firebaseapp.com",
  projectId: "myproject-cloudstorage",
  storageBucket: "myproject-cloudstorage.appspot.com",
  messagingSenderId: "366961471294",
  appId: "1:366961471294:web:329c2a7ab75e99f628466f",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
