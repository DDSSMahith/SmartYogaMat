import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ControlPanel({ navigation }) {
  const [status, setStatus] = useState('No mode running');

  const startWarmUp = () => {
    setStatus('Warm-Up mode started');
  };

  const startRelaxation = () => {
    setStatus('Relaxation mode started');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control Panel</Text>

      <View style={styles.buttonContainer}>
        <Button title="Start Warm-Up" onPress={startWarmUp} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Begin Relaxation Mode" onPress={startRelaxation} />
      </View>

      <Text style={styles.status}>{status}</Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  buttonContainer: { marginVertical: 10, width: '80%' },
  status: { fontSize: 18, marginTop: 30, fontStyle: 'italic' },
});
