import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';

const NavBar = ({ currentScreen, setCurrentScreen }) => (
  <View style={styles.navbar}>
    <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('home')}>
      <Icon name="home" size={24} color={currentScreen === 'home' ? "#3b82f6" : "#6b7280"} />
      <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('discover')}>
      <Icon name="search" size={24} color={currentScreen === 'discover' ? "#3b82f6" : "#6b7280"} />
      <Text style={styles.navText}>Discover</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('watch')}>
      <Icon name="tv" size={24} color={currentScreen === 'watch' ? "#3b82f6" : "#6b7280"} />
      <Text style={styles.navText}>Watch</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('community')}>
      <Icon name="message-circle" size={24} color={currentScreen === 'community' ? "#3b82f6" : "#6b7280"} />
      <Text style={styles.navText}>Community</Text>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Semi-transparent navbar
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingVertical: 12,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#94a3b8',
  },
  navTextActive: {
    color: '#60a5fa',
  },
 
}); 

export default NavBar;
