import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginRequest = (email, password) =>
  signInWithEmailAndPassword(getAuth(), email, password);
