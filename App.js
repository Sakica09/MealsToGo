import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigator";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_TJwm_eeZ9QZ0Z2ZWJKA46PzinxEBhaE",
  authDomain: "mealstogo-cbe4b.firebaseapp.com",
  projectId: "mealstogo-cbe4b",
  storageBucket: "mealstogo-cbe4b.appspot.com",
  messagingSenderId: "793662793946",
  appId: "1:793662793946:web:0a41d66508c0df1ed4dde3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    setTimeout(() => {
      signInWithEmailAndPassword(auth, "mo@binni.io", "test1234")
        .then((user) => {
          // Signed in
          console.log(user);
          setIsAuthenticated(true);
          // ...
        })
        .catch((e) => {
          console.log(e);
        });
    }, 2000);
  }, []);

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <FavouritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavouritesContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
