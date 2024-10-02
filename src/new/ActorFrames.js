import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const ActorFrames = ({ actorFrames }) => {
  if (!actorFrames) return null;

  return (
    <View style={styles.framesSection}>
      <Text style={styles.framesTitle}>Key Actor Frames</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.framesScroll}>
        {Object.entries(actorFrames).map(([actor, frames]) => (
          <View key={actor} style={styles.frameItem}>
            <Text style={styles.actorName}>{actor}</Text>
            <ScrollView horizontal>
              {frames.map((frameUrl, index) => (
                <Image key={index} source={{ uri: frameUrl }} style={styles.frameImage} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  framesSection: {
    paddingVertical: 20,
    paddingLeft: 20,
    backgroundColor: '#121212',
  },
  framesTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  framesScroll: {
    marginBottom: 20,
  },
  frameItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  actorName: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  frameImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ActorFrames;