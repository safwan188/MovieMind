import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BlurView } from "@react-native-community/blur";
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

const LinkScreen = ({ isVisible, onClose, setIsLoading, setCurrentScreen, setPrediction }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const platforms = [
    { id: 'instagram', name: 'Instagram', logo: require('../../assets/instagram.png') },
    { id: 'tiktok', name: 'TikTok', logo: require('../../assets/tiktok.png') },
    { id: 'facebook', name: 'Facebook', logo: require('../../assets/facebook.png') },
  ];

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
    setVideoLink(''); // Clear the video link when changing platforms
  };

  const handlePredict = async () => {
    if (selectedPlatform && videoLink) {
      setIsLoading(true);
      try {
        if (!user) {
          throw new Error('User not authenticated');
        }

        const idToken = await user.getIdToken(true);

        const requestBody = {
          platform: selectedPlatform,
          link: videoLink,
          userId: user.uid,
        };

        const response = await fetch('http://10.0.2.2:3000/predict-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Prediction result:', result);

        const { prediction, prediction_id } = result;
        const enhancedPrediction = {
          ...prediction,
          prediction_id,
        };

        setPrediction(enhancedPrediction);
        setCurrentScreen('result');
        onClose();
      } catch (error) {
        console.error('Error predicting from link:', error);
        Alert.alert('Error', 'Failed to predict from the video link. Please try again.');
      } finally {
        setIsLoading(false);
        setSelectedPlatform(null);
        setVideoLink('');
      }
    } else {
      Alert.alert('Incomplete Information', 'Please select a platform and enter a valid video link.');
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="x" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.linkContent}>
                <Text style={styles.sectionTitle}>Choose Platform</Text>
                <View style={styles.platformIcons}>
                  {platforms.map((platform) => (
                    <TouchableOpacity
                      key={platform.id}
                      style={[
                        styles.platformIcon,
                        selectedPlatform === platform.id && styles.selectedPlatform
                      ]}
                      onPress={() => handlePlatformSelect(platform.id)}
                    >
                      <Image source={platform.logo} style={styles.socialIcon} />
                      <Text style={styles.platformText}>{platform.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.sectionTitle}>Enter Video Link</Text>
                <TextInput 
                  style={styles.linkInput}
                  value={videoLink}
                  onChangeText={setVideoLink}
                  placeholder={`Paste your ${selectedPlatform ? platforms.find(p => p.id === selectedPlatform).name : 'video'} link here`}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <TouchableOpacity 
                  onPress={handlePredict} 
                  style={[styles.predictButton, (!selectedPlatform || !videoLink) && styles.disabledButton]}
                  disabled={!selectedPlatform || !videoLink}
                >
                  <Icon name="film" size={24} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Predict Movie</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BlurView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  linkContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    fontFamily: 'System',
  },
  platformIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  platformIcon: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
  },
  selectedPlatform: {
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
  },
  socialIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  platformText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'System',
  },
  linkInput: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    color: '#fff',
    width: '100%',
    fontFamily: 'System',
  },
  predictButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(156, 163, 175, 0.5)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});

export default LinkScreen;