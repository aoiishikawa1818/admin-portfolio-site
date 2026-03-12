import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "../lib/firebase";

let isAuthInitialized = false;

export const useAuth = () => {
  const user = useState<User | null>("authUser", () => null);
  const isAuthReady = useState("isAuthReady", () => false);
  const auth = useFirebaseAuth();

  const initAuth = () => {
    if (isAuthInitialized) {
      return;
    }

    isAuthInitialized = true;

    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      isAuthReady.value = true;
    });
  };

  return {
    user,
    isAuthReady,
    initAuth,
  };
};
