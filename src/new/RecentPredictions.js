import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { fetchUserPredictions, fetchOmdbDetails } from '../API';

const RecentPredictions = ({ userId, onPredictionSelect }) => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPredictionsWithOmdbDetails = async () => {
      setIsLoading(true);
      try {
        const userPredictions = await fetchUserPredictions(userId);
        const limitedPredictions = userPredictions.slice(0, 3);
        
        const predictionsWithOmdb = await Promise.all(
          limitedPredictions.map(async (prediction) => {
            const omdbDetails = await fetchOmdbDetails(prediction.predicted_title);
            console.log('omdbDetails:', omdbDetails);
            return { ...prediction, omdbDetails };
          })
        );
        
        setPredictions(predictionsWithOmdb);
      } catch (error) {
        console.error("Error fetching user predictions or OMDB details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPredictionsWithOmdbDetails();
  }, [userId]);

  const renderPredictionCard = (prediction) => (
    <TouchableOpacity 
      key={prediction.id} 
      style={styles.recentItem}
      onPress={() => onPredictionSelect(prediction)}
    >
      <Image 
        source={{ uri: prediction.omdbDetails?.Poster || prediction.actor_frames[Object.keys(prediction.actor_frames)[0]][0] }} 
        style={styles.recentImage} 
      />
      <View style={styles.recentInfo}>
        <View style={styles.titleYearContainer}>
          <Text style={styles.recentTitle} numberOfLines={1}>
            {prediction.omdbDetails?.Title || prediction.predicted_title}
          </Text>
          {prediction.omdbDetails?.Year && (
            <Text style={styles.yearText}>({prediction.omdbDetails.Year})</Text>
          )}
        </View>
        {prediction.omdbDetails?.Runtime && (
          <Text style={styles.runtimeText}>{prediction.omdbDetails.Runtime}</Text>
        )}
        <Text style={styles.recentDate}>
          Predicted on {prediction.timestamp.toDate().toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.recentSection}>
      <Text style={styles.sectionTitle}>
        <Icon name="clock" size={24} color="#fbbf24" style={{ marginRight: 8 }} />
        Recent Predictions
      </Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fbbf24" />
        </View>
      ) : predictions.length > 0 ? (
        predictions.map(renderPredictionCard)
      ) : (
        <Text style={styles.noPredictionsText}>No recent predictions</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recentSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  recentImage: {
    width: 64,
    height: 96,
    borderRadius: 4,
    marginRight: 16,
  },
  recentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  titleYearContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  yearText: {
    fontSize: 14,
    color: '#93c5fd',
    marginLeft: 8,
  },
  runtimeText: {
    fontSize: 14,
    color: '#93c5fd',
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 12,
    color: '#93c5fd',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  noPredictionsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default RecentPredictions;