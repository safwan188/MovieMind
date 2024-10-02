import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// Initialize Firestore
const db = firestore();

export { firebase, db };
