import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useEffect } from "react";

const useFirebase = () => {
  const auth = getAuth();
  const database = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    auth && signInAnonymously(auth);
  }, [auth]);

  return {
    auth,
    database,
    storage,
  };
};

export default useFirebase;
