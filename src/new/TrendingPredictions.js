import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';

const API_KEY = 'tmdb-key';  // Replace with your TMDb API key

const TrendingPredictions = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch trending movies using fetch API
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <View style={styles.trendingSection}>
      <Text style={styles.sectionTitle}>
        <Icon name="trending-up" size={24} color="#fbbf24" style={{ marginRight: 8 }} />
        Trending Predictions
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
        {movies.map((movie) => (
          <View key={movie.id} style={styles.trendingItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.trendingImage}
            />
            <Text style={styles.trendingTitle} numberOfLines={1}>
              {movie.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  trendingSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'System',
  },
  trendingScroll: {
    marginBottom: 32,
  },
  trendingItem: {
    width: 140,
    marginRight: 16,
  },
  trendingImage: {
    width: 140,
    height: 210,
    borderRadius: 12,
    marginBottom: 8,
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'System',
  },
});

export default TrendingPredictions;
