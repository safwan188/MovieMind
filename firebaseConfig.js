// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// Initialize Firebase (auto-initializes using google-services.json for Android)
if (!firebase.apps.length) {
  firebase.initializeApp(); // Automatically uses google-services.json
} else {
  firebase.app(); // Use the already initialized app
}

// Export Firebase services
export const firestoreInstance = firestore();
export const authInstance = auth();
export const storageInstance = storage();

export default firebase;
