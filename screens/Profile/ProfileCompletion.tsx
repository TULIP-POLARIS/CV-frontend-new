import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileCompletion() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>PROFILE COMPLETION</Text>

      <Text style={styles.percent}>
        76% <Text style={styles.small}>complete</Text>
      </Text>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.note}>
        Add Education to reach 100%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3F63C6",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginTop: 15,
  },

  title: {
    color: "#BFD0FF",
    fontSize: 12,
    marginBottom: 10,
  },

  percent: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  small: {
    fontSize: 16,
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#6D88E8",
    borderRadius: 3,
    marginTop: 10,
  },

  progressFill: {
    width: "76%",
    height: 6,
    backgroundColor: "#7EF0A6",
    borderRadius: 3,
  },

  note: {
    color: "#BFD0FF",
    marginTop: 8,
    fontSize: 12,
  },
});