// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCxOkKqQIuS0MwLXZon_kd4cx0Iut9v8ag',
  authDomain: 'nubia-test-001.firebaseapp.com',
  projectId: 'nubia-test-001',
  storageBucket: 'nubia-test-001.appspot.com',
  messagingSenderId: '998704420706',
  appId: '1:998704420706:web:3bea234a8fc1f2db82be3b',
  measurementId: 'G-RYF2K52N1Z',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export let auth;

if (typeof window !== 'undefined') {
  auth = getAuth(app);
}
