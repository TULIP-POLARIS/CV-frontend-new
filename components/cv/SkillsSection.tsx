import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Skill } from "../../types/cv";

type Props = {
  skills: Skill[];
};

export default function SkillsSection({ skills }: Props) {
  return (
    <View style={styles.container}>
      
      {/* TITLE */}
      <Text style={styles.heading}>SKILLS</Text>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* SKILLS LIST */}
      {skills && skills.length > 0 ? (
        skills.slice(0, 8).map((skill, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{skill}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No skills added</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  heading: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 5,
    color: "#2F3E4D",
  },

  divider: {
    height: 1,
    backgroundColor: "#bbb",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },

  bullet: {
    fontSize: 12,
    marginRight: 6,
    color: "#333",
  },

  text: {
    fontSize: 12,
    color: "#333",
    flex: 1,
  },

  empty: {
    fontSize: 12,
    color: "#999",
  },
});