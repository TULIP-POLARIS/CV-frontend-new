import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Language } from "../../types/cv";

type Props = {
  languages: Language[];
};

export default function LanguagesSection({ languages }: Props) {
  return (
    <View>
      <Text style={styles.heading}>LANGUAGES</Text>

      {languages?.slice(0, 5).map((lang, i) => (
        <Text key={i} style={styles.item}>
          {lang.name} – {lang.level}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#2F3E4D",
  },
  item: {
    fontSize: 13,
    marginBottom: 5,
  },
});