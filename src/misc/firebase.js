import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const config = {
  apiKey: 'AIzaSyDxUO5XEvFvkXlIYg9L22aU5po09kwdodY',
  authDomain: 'talkhub-311b7.firebaseapp.com',
  projectId: 'talkhub-311b7',
  storageBucket: 'talkhub-311b7.appspot.com',
  messagingSenderId: '124898052303',
  appId: '1:124898052303:web:aebb63e1c92d9e54e24fba',
};
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
