import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyAM92iAiJKicM9E9Ow5g9JqCDhn08T40cg",
  authDomain: "social-c151c.firebaseapp.com",
  projectId: "social-c151c",
  storageBucket: "social-c151c.appspot.com",
  messagingSenderId: "185793121934",
  appId: "1:185793121934:web:94155c6fd01783a3c183df"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export  const uploadFile = async (file: any) => {
    const storageRef = ref(storage, uuidv4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
    }