import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';

const PredictionSection = ({ onUploadPress, onLinkPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.predictSection}>
        <View style={styles.predictHeader}>
          <Text style={styles.predictTitle}>Predict Now</Text>
        </View>
        <TouchableOpacity
          onPress={onUploadPress}
          style={[styles.predictButton, styles.uploadButton]}
        >
          <Icon name="camera" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Upload Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLinkPress}
          style={[styles.predictButton, styles.linkButton]}
        >
          <Icon name="link" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Share Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  predictSection: {
    width: '85%',
    backgroundColor: '#1e293b',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  predictHeader: {
    marginBottom: 20,
  },
  predictTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  predictButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  uploadButton: {
    backgroundColor: '#3b82f6',
  },
  linkButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default PredictionSection;
