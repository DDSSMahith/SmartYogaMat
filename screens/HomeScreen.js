import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [connected, setConnected] = useState(false);

  const toggleConnection = () => {
    
    setConnected(!connected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Yoga Mat</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/606/606646.png' }}
        style={styles.image}
      />

      <Text style={styles.description}>
        Track your yoga sessions, control mat modes, and relax with soothing sounds.
      </Text>

      <Text style={styles.status}>
        Status: {connected ? 'Connected' : 'Disconnected'}
      </Text>

      <Button
        title={connected ? 'Disconnect Mat' : 'Connect to Mat'}
        onPress={toggleConnection}
      />

      <View style={{ marginTop: 20, width: '100%' }}>
        <Button
          title="Go to Control Panel"
          onPress={() => navigation.navigate('ControlPanel')}
          disabled={!connected}
        />
      </View>

      <View style={{ marginTop: 20, width: '100%' }}>
        <Button
          title="Music & Sound Options"
          onPress={() => navigation.navigate('MusicAndSound', { connected })}
          disabled={!connected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 120, height: 120, marginBottom: 20 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  status: { fontSize: 18, marginBottom: 10 },
});
