import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WelcomeSection = () => {
  return (
    <View style={styles.welcomeSection}>
      <View style={styles.logoAndTitle}>
        <Image
          source={require('../../assets/new_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>MovieMind</Text>
      </View>
      <Text style={styles.welcomeSubtitle}>Discover your next favorite movie</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeSection: {
    padding: 5,
    marginTop: 5,
    alignItems: 'center',
    // Removed backgroundColor, borderRadius, and marginHorizontal to remove the dark box
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#60a5fa',
    fontFamily: 'System',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'System',
  },
});

export default WelcomeSection;
