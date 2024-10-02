// MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styles from './newStyle';
import Header from './new/Header';
import NavBar from './new/NavBar';
import UploadModal from './new/UploadModal';
import LinkScreen from './new/LinkScreen';
import RecentPredictions from './new/RecentPredictions';
import TrendingPredictions from './new/TrendingPredictions';
import ResultScreen from './new/ResultScreen';
import EnhancedMovieSearchSpinner from './new/EnhancedMovieSearchSpinner';
import WelcomeSection from './new/WelcomeSection';
import PredictionSection from './new/PredictionSection';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { fetchOmdbDetails, fetchTmdbData, fetchSimilarContent } from './API';

const MainScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [prediction, setPrediction] = useState(null);
  const [omdbDetails, setOmdbDetails] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const [actorFrames, setActorFrames] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (prediction) {
      fetchMovieData(prediction.predicted_title || prediction.Title);
    }
  }, [prediction]);

  const fetchMovieData = async (movieTitle) => {
    if (!movieTitle || movieTitle === "Unknown Movie") return;

    setIsLoading(true);
    try {
      // Fetch OMDb data
      const omdbDetails = await fetchOmdbDetails(movieTitle);
      setOmdbDetails(omdbDetails);

      // Fetch TMDB data
      const tmdbResults = await fetchTmdbData(movieTitle);

      if (tmdbResults.results?.length > 0) {
        const firstResult = tmdbResults.results[0];
        const contentType = firstResult.media_type;
        const tmdbId = firstResult.id;

        // Fetch similar content
        const similarContentData = await fetchSimilarContent(contentType, tmdbId);
        setSimilarContent(similarContentData.results || []);
      }

      // Fetch actor frames from Firestore
      if (prediction?.prediction_id) {
        const predictionDoc = await firestore()
          .collection('predictions')
          .doc(prediction.prediction_id)
          .get();

        if (predictionDoc.exists) {
          const framesData = predictionDoc.data().actor_frames;
          setActorFrames(framesData);
        }
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredictionSelect = (selectedPrediction) => {
    setPrediction(selectedPrediction);
    setCurrentScreen('result');
  };

  const renderHomeContent = () => (
    <>
      <WelcomeSection />
      <PredictionSection
        onUploadPress={() => setIsUploadModalVisible(true)}
        onLinkPress={() => setIsLinkModalVisible(true)}
      />
      <TrendingPredictions />
      {userId && <RecentPredictions userId={userId} onPredictionSelect={handlePredictionSelect} />}
    </>
  );

  const handlePredictionComplete = (newPrediction) => {
    setPrediction(newPrediction);
    setCurrentScreen('result');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingScreen}>
          <EnhancedMovieSearchSpinner />
        </View>
      ) : (
        <View style={styles.homeScreen}>
          <Header title={currentScreen === 'home' ? "MovieMind" : "Prediction Result"} />
          <ScrollView style={styles.scrollView}>
            {currentScreen === 'home' ? renderHomeContent() : (
              <ResultScreen
                prediction={prediction}
                omdbDetails={omdbDetails}
                similarContent={similarContent}
                actorFrames={actorFrames}
                onClose={() => setCurrentScreen('home')}
                setCurrentScreen={setCurrentScreen}
              />
            )}
          </ScrollView>
          <NavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

          <UploadModal
            isVisible={isUploadModalVisible}
            onClose={() => setIsUploadModalVisible(false)}
            setIsLoading={setIsLoading}
            setCurrentScreen={setCurrentScreen}
            setPrediction={handlePredictionComplete}
          />

          <LinkScreen
            isVisible={isLinkModalVisible}
            onClose={() => setIsLinkModalVisible(false)}
            setIsLoading={setIsLoading}
            setCurrentScreen={setCurrentScreen}
            setPrediction={handlePredictionComplete}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;