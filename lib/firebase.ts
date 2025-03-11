// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdYfdw3YQryeFgWgPh5J__9QKHrIGKwR4",
  authDomain: "daanakarma-d06f1.firebaseapp.com",
  projectId: "daanakarma-d06f1",
  storageBucket: "daanakarma-d06f1.firebasestorage.app",
  messagingSenderId: "848057812074",
  appId: "1:848057812074:web:38c121f8b49dd7bc58b613",
  measurementId: "G-DZ0YGZC731",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
