import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { BlurView } from "@react-native-community/blur";
import auth from '@react-native-firebase/auth';

const UploadModal = ({ isVisible, onClose, setIsLoading, setCurrentScreen, setPrediction }) => {
  const [videoSource, setVideoSource] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleVideoUpload = () => {
    const options = {
      mediaType: 'video',
      quality: 1,
      videoQuality: 'high',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setVideoSource(source);
      }
    });
  };

  const uploadAndPredict = async () => {
    if (!videoSource) {
      alert('Please select a video first');
      return;
    }

    setIsLoading(true);

    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const idToken = await user.getIdToken(true);

      const formData = new FormData();
      formData.append('video', {
        uri: videoSource.uri,
        type: 'video/mp4',
        name: 'upload.mp4',
      });

      const response = await fetch('http://10.0.2.2:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${idToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Upload and prediction successful:', result);

      const { prediction, prediction_id } = result;
      const enhancedPrediction = {
        ...prediction,
        prediction_id,
      };

      setPrediction(enhancedPrediction);
      setIsLoading(false);
      setCurrentScreen('result');
      onClose();
    } catch (error) {
      console.error('Error uploading video and getting prediction:', error);
      setIsLoading(false);
      alert('Failed to upload video and get prediction. Please try again.');
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.modalWrapper, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="x" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Upload Video</Text>
              <View style={styles.uploadContent}>
                <TouchableOpacity style={styles.uploadBox} onPress={handleVideoUpload}>
                  {videoSource ? (
                    <View style={styles.videoPreview}>
                      <Icon name="check-circle" size={48} color="#10b981" />
                      <Text style={styles.uploadText}>Video selected</Text>
                    </View>
                  ) : (
                    <>
                      <Icon name="camera" size={48} color="#60a5fa" style={{ marginBottom: 16 }} />
                      <Text style={styles.uploadText}>Tap to upload video</Text>
                      <Text style={styles.uploadSubtext}>Support .mp4, .mov, up to 100MB</Text>
                    </>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={uploadAndPredict}
                  style={[styles.predictButton, !videoSource && styles.disabledButton]}
                  disabled={!videoSource}
                >
                  <Icon name="film" size={24} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Predict Movie</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
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
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  uploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  uploadBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#60a5fa',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  predictButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(156, 163, 175, 0.5)',
  },
});

export default UploadModal;