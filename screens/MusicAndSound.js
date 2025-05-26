import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const sounds = [
  {
    id: 'breathing',
    name: 'Breathing Exercises',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'ambient',
    name: 'Ambient Music',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function MusicAndSound({ navigation, route }) {
  const { connected } = route.params || { connected: false };
  const [soundObjects, setSoundObjects] = useState({});
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    
    return () => {
      Object.values(soundObjects).forEach(async (soundObj) => {
        if (soundObj) {
          await soundObj.unloadAsync();
        }
      });
    };
  }, [soundObjects]);

  const playSound = async (item) => {
    if (!connected) return;

    
    if (playingId && playingId !== item.id) {
      await stopSound(playingId);
    }

    let soundObj = soundObjects[item.id];

    if (!soundObj) {
      soundObj = new Audio.Sound();
      try {
        await soundObj.loadAsync({ uri: item.uri });
        setSoundObjects((prev) => ({ ...prev, [item.id]: soundObj }));
      } catch (error) {
        console.error('Error loading sound:', error);
        return;
      }
    }

    try {
      await soundObj.playAsync();
      setPlayingId(item.id);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopSound = async (id) => {
    const soundObj = soundObjects[id];
    if (soundObj) {
      try {
        await soundObj.stopAsync();
        setPlayingId(null);
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    }
  };

  const toggleSound = (item) => {
    if (playingId === item.id) {
      stopSound(item.id);
    } else {
      playSound(item);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.soundButton,
        playingId === item.id ? styles.playing : styles.stopped,
        !connected && styles.disabled,
      ]}
      onPress={() => toggleSound(item)}
      disabled={!connected}
    >
      <Text style={styles.soundText}>{item.name}</Text>
      <Text style={styles.soundText}>{playingId === item.id ? '⏸️ Pause' : '▶️ Play'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music & Sound Options</Text>
      <Text style={{ marginBottom: 20 }}>
        Device is {connected ? 'Connected' : 'Disconnected'}
      </Text>

      <FlatList
        data={sounds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={playingId}
      />

      <View style={{ marginTop: 30 }}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet
