import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app"; // Import Firebase app
import "firebase/compat/auth"; // Import Firebase authentication module
import { RecaptchaVerifier, getAuth } from "firebase/auth"; // Import RecaptchaVerifier and getAuth from Firebase authentication
import VoteOtp from "./Components/VoteOtp";

const firebaseConfig = {
  apiKey: "AIzaSyDa-VbWoYUmbQRmweM9nJJuc47zr4TGR_8",
  authDomain: "voting-13ea9.firebaseapp.com",
  projectId: "voting-13ea9",
  storageBucket: "voting-13ea9.appspot.com",
  messagingSenderId: "756968495084",
  appId: "1:756968495084:web:1f0b3f826b97319eb052c9",
  measurementId: "G-SEY7KN7LEG",
};

// Initialize Firebase if it's not already initialized (outside the App component)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const recaptchaRef = useRef(null); // Reference for the reCAPTCHA container
  const [firebaseInitialized, setFirebaseInitialized] = useState(false); // Track initialization state of Firebase

  useEffect(() => {
    const initializeFirebase = async () => {
      // Wait for Firebase to be ready (optional, can be removed if initialization is synchronous)
      await firebase.auth().onAuthStateChanged();
      setFirebaseInitialized(true); // Set firebaseInitialized state to true after Firebase initialization
    };

    initializeFirebase(); // Call initializeFirebase function

    return () => {
      // Cleanup function
      if (recaptchaVerifier) {
        // Check if recaptchaVerifier exists before cleanup
        recaptchaVerifier.clear(); // Clear the reCAPTCHA widget
      }
    };
  }, []);

  let recaptchaVerifier; // Declare recaptchaVerifier variable

  if (firebaseInitialized) {
    const auth = getAuth(firebase); // Get authentication instance using getAuth
    recaptchaVerifier = new RecaptchaVerifier(recaptchaRef.current, {
      // Create a new RecaptchaVerifier instance
      size: "invisible", // Set reCAPTCHA size to invisible
      callback: () => {
        // Callback function when reCAPTCHA is solved
        // This function is called when the user solves the reCAPTCHA
        // You can proceed with your sign-in process here
      },
    });
  }

  return (
    <div>
      <div className="h-10"></div>
      {firebaseInitialized && ( // Render only after Firebase is initialized
        <>
          {/* Render the reCAPTCHA container */}
          <div ref={recaptchaRef}></div>
        </>
      )}
      <VoteOtp />
    </div>
  );
}

export default App;
