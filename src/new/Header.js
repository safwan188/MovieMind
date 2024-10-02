import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth'; // Assuming Firebase auth is being used

const Header = ({ title }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
       await auth().signOut(); // Uncomment when Firebase auth is configured
      Alert.alert('Logged out', 'You have been logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerIcons}>
        <Icon name="bell" size={24} color="#60a5fa" style={{ marginRight: 16 }} />

        {/* User icon wrapped in TouchableOpacity for showing menu */}
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="user" size={24} color="#60a5fa" />
        </TouchableOpacity>

        {/* Conditionally render dropdown menu */}
        {menuVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Matching the app background color
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'System',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Positioning below the user icon
    right: 0,
    backgroundColor: 'rgba(30, 41, 59, 0.8)', // Matching app's welcomeSection background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#60a5fa', // Accent color
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
});

export default Header;
