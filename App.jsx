import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import MainScreen from './src/newScreen';
import SignInScreen from './src/SignInScreen';
import firestore from '@react-native-firebase/firestore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setIsSignedIn(!!user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    if (firebase.apps.length) {
      console.log('Firebase is already initialized');
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      // If successful, onAuthStateChanged will update isSignedIn
    } catch (error) {
      console.error('Sign in error:', error);
      // Handle sign-in errors (e.g., show an error message to the user)
    }
  };
  const handleSignUp = async (email, password, username) => {
    try {
      console.log("Sign-Up Details:", { email, password, username });
  
      if (!email || !password || !username) {
        throw new Error("All fields are required");
      }
  
      // Create the user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  
      // Get the user object from the authentication response
      const { user } = userCredential;
  
      // Prepare the user data for Firestore
      const userData = {
        email: user.email,
        username: username,
        predictionIds: [], // Initially an empty array
        createdAt: firestore.FieldValue.serverTimestamp(), // Firestore timestamp
        updatedAt: firestore.FieldValue.serverTimestamp(), // Firestore timestamp
      };
  
      // Create a document for the user in the 'users' collection
      await firestore().collection('users').doc(user.uid).set(userData);
  
      console.log('User document created successfully in Firestore');
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };
  

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      // If successful, onAuthStateChanged will update isSignedIn
    } catch (error) {
      console.error('Sign out error:', error);
      // Handle sign-out errors
    }
  };

  if (initializing) return null; // Or a loading screen

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <View style={backgroundStyle}>
          {isSignedIn ? (
            <MainScreen onSignOut={handleSignOut} />
          ) : (
            <SignInScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;