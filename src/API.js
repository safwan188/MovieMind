// api.js

const TMDB_API_KEY = 'tmdb-key';
import firestore from '@react-native-firebase/firestore';

export const fetchOmdbDetails = async (movieTitle) => {
  const response = await fetch(`http://10.0.2.2:3000/get-omdb-details?title=${encodeURIComponent(movieTitle)}`);
  return await response.json();
};

export const fetchTmdbData = async (movieTitle) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`
  );
  return await response.json();
};

export const fetchSimilarContent = async (contentType, tmdbId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${tmdbId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );
  return await response.json();
};
export const fetchUserPredictions = async (userId) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      const predictionIds = userDoc.data().predictionIds || [];
  
      // Get only the 5 most recent prediction IDs
      const recentPredictionIds = predictionIds.slice(-3);
  
      const predictions = await Promise.all(
        recentPredictionIds.map(async (predictionId) => {
          const predictionDoc = await firestore().collection('predictions').doc(predictionId).get();
          return { id: predictionId, ...predictionDoc.data() };
        })
      );
  
      return predictions.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
    } catch (error) {
      console.error('Error fetching user predictions:', error);
      return [];
    }
  };