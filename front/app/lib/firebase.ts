import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseOptions,
} from "firebase/app";
import { getAuth } from "firebase/auth";

export const useFirebaseAuth = () => {
  const config = useRuntimeConfig();

  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.firebaseApiKey as string | undefined,
    authDomain: config.public.firebaseAuthDomain as string | undefined,
    projectId: config.public.firebaseProjectId as string | undefined,
    storageBucket: config.public.firebaseStorageBucket as string | undefined,
    messagingSenderId: config.public.firebaseMessagingSenderId as
      | string
      | undefined,
    appId: config.public.firebaseAppId as string | undefined,
  };

  console.log("[firebase debug]", {
    apiKeyPreview: firebaseConfig.apiKey
      ? `${firebaseConfig.apiKey.slice(0, 6)}...`
      : undefined,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appIdPreview: firebaseConfig.appId
      ? `${firebaseConfig.appId.slice(0, 10)}...`
      : undefined,
  });

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  return getAuth(app);
};
