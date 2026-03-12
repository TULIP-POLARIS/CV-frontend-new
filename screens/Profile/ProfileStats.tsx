import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileStats() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.number}>3</Text>
        <Text>CVs</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.number}>82%</Text>
        <Text>Match</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.number}>7</Text>
        <Text>Jobs</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },

  box: {
    alignItems: "center",
  },

  number: {
    fontSize: 18,
    fontWeight: "bold",
  },
});