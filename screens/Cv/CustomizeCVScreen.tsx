import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomizeCVScreen({ navigation, route }: any) {
  const { data } = route.params;

  const [primaryColor, setPrimaryColor] = useState("#2F3E4D");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your CV</Text>

      <Text style={styles.label}>Select Header Color</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.color, { backgroundColor: "#2F3E4D" }]}
          onPress={() => setPrimaryColor("#2F3E4D")}
        />
        <TouchableOpacity
          style={[styles.color, { backgroundColor: "#4A90E2" }]}
          onPress={() => setPrimaryColor("#4A90E2")}
        />
        <TouchableOpacity
          style={[styles.color, { backgroundColor: "#4CAF50" }]}
          onPress={() => setPrimaryColor("#4CAF50")}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("CVPreview", {
            data,
            primaryColor,
          })
        }
      >
        <Text style={styles.buttonText}>Preview CV</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  label: { marginBottom: 10 },

  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  button: {
    backgroundColor: "#2F3E4D",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});