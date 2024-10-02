import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';
import ActorFrames from './ActorFrames';

const ResultScreen = ({ prediction, omdbDetails, similarContent, actorFrames, onClose, setCurrentScreen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClose = () => {
    onClose();
    setCurrentScreen('home');
  };

  const handleWatchTrailer = () => {
    if (omdbDetails?.TrailerURL) {
      Linking.openURL(omdbDetails.TrailerURL).catch((err) => console.error("Couldn't load page", err));
    } else {
      console.log("No trailer URL available");
    }
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (!omdbDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const truncatedPlot = omdbDetails.FullPlot 
    ? (isExpanded ? omdbDetails.FullPlot : `${omdbDetails.FullPlot.substring(0, 150)}...`)
    : "Plot not available.";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="x" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Image source={{ uri: omdbDetails.Poster || 'https://picsum.photos/240/360' }} style={styles.posterImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{omdbDetails.Title || "Title not available"}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>{omdbDetails.Year || "N/A"}</Text>
            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>{omdbDetails.Genre || "N/A"}</Text>
            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>{omdbDetails.Runtime || "N/A"}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>95% Match</Text>
            </View>
            <View style={styles.starRating}>
              <Icon name="star" size={16} color="#FFD700" style={styles.starIcon} />
              <Text style={styles.ratingText}>{omdbDetails.Ratings?.[0]?.Value || "N/A"}</Text>
            </View>
          </View>
          <Text style={styles.descriptionTitle}>Short Description:</Text>
          <Text style={styles.description}>{omdbDetails.ShortPlot || "Short description not available."}</Text>

          <Text style={styles.descriptionTitle}>Full Description:</Text>
          <Text style={styles.description}>{truncatedPlot}</Text>
          {omdbDetails.FullPlot && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.expandButtonText}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleWatchTrailer}>
              <Icon name="play" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Watch Trailer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
              <Icon name="share-2" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ActorFrames actorFrames={actorFrames} />

        <View style={styles.similarSection}>
          <Text style={styles.similarTitle}>You might also like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarScroll}>
            {similarContent.length > 0 ? (
              similarContent.map((item) => (
                <View key={item.id} style={styles.similarItem}>
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.similarImage}
                  />
                  <Text style={styles.similarItemTitle}>{item.title || item.name}</Text>
                </View>
              ))
            ) : (
              <Text>No similar content found</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
  },
  posterImage: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  metaText: {
    fontSize: 14,
    color: '#B3B3B3',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  matchBadge: {
    backgroundColor: '#46D369',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  matchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#E5E5E5',
    lineHeight: 24,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#E50914',
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: '#424242',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  similarSection: {
    padding: 20,
    backgroundColor: '#121212',
  },
  similarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  similarScroll: {
    marginBottom: 20,
  },
  similarItem: {
    marginRight: 15,
  },
  similarImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarItemTitle: {
    fontSize: 14,
    color: '#E5E5E5',
    width: 120,
  },
  expandButtonText: {
    color: '#E50914',
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default ResultScreen;