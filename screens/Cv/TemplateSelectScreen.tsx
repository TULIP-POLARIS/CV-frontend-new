import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TemplateSelectScreen({ navigation, route }: any) {
  const { data } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select CV Template</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("CustomizeCV", { data })
        }
      >
        <Text style={styles.cardText}>Template 1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  cardText: { fontSize: 16 },
});