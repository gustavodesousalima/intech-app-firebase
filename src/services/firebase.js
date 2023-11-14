import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQPYgzvz4peUjdzLq0nJnRhEn3_UJgbkM",
  authDomain: "app-intech.firebaseapp.com",
  projectId: "app-intech",
  storageBucket: "app-intech.appspot.com",
  messagingSenderId: "21655775895",
  appId: "1:21655775895:web:4e9518169a842f75a097d2",
  measurementId: "G-93B0E6YV28",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
  
  })
  .catch((error) => {
    console.error('Erro ao definir persistência:', error);
  });

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
