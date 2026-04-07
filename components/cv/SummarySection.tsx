import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  summary: string;
};

export default function SummarySection({ summary }: Props) {
  return (
    <View>
      <Text style={styles.heading}>PROFILE</Text>

      <Text numberOfLines={5} style={styles.text}>
        {summary}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    color: "#2F3E4D",
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
});