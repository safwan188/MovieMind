import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './newStyle';

const SignInScreen = ({ onSignIn, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    if (!username || !email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    setErrorMessage('');
    onSignUp(email, password, username);
  };

  return (
    <View style={[styles.container, signInStyles.signInContainer]}>
      <View style={styles.logoAndTitle}>
        <Icon name="film" size={48} color="#60a5fa" />
        <Text style={styles.appName}>MovieMind</Text>
      </View>
      <Text style={signInStyles.welcomeText}>{isSigningUp ? 'Create your account' : 'Welcome back!'}</Text>
      
      {isSigningUp && (
        <View style={signInStyles.inputContainer}>
          <Icon name="user" size={24} color="#60a5fa" style={signInStyles.inputIcon} />
          <TextInput
            style={signInStyles.input}
            placeholder="Username"
            placeholderTextColor="#4b5563"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      )}

      <View style={signInStyles.inputContainer}>
        <Icon name="mail" size={24} color="#60a5fa" style={signInStyles.inputIcon} />
        <TextInput
          style={signInStyles.input}
          placeholder="Email"
          placeholderTextColor="#4b5563"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={signInStyles.inputContainer}>
        <Icon name="lock" size={24} color="#60a5fa" style={signInStyles.inputIcon} />
        <TextInput
          style={signInStyles.input}
          placeholder="Password"
          placeholderTextColor="#4b5563"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {isSigningUp && (
        <View style={signInStyles.inputContainer}>
          <Icon name="lock" size={24} color="#60a5fa" style={signInStyles.inputIcon} />
          <TextInput
            style={signInStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#4b5563"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
      )}

      {errorMessage ? (
        <Text style={signInStyles.errorText}>{errorMessage}</Text>
      ) : null}

      {isSigningUp ? (
        <TouchableOpacity style={signInStyles.signInButton} onPress={handleSignUp}>
          <Text style={signInStyles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={signInStyles.signInButton} onPress={() => onSignIn(email, password)}>
          <Text style={signInStyles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={signInStyles.signUpButton} onPress={() => setIsSigningUp(!isSigningUp)}>
        <Text style={signInStyles.signUpButtonText}>
          {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const signInStyles = StyleSheet.create({
  signInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
    fontFamily: 'System',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'System',
  },
  signInButton: {
    backgroundColor: '#60a5fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  signUpButton: {
    marginTop: 16,
  },
  signUpButtonText: {
    color: '#60a5fa',
    fontSize: 16,
    fontFamily: 'System',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default SignInScreen;
