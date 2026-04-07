import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Experience } from "../../types/cv";

type Props = {
  experience: Experience[];
};

export default function ExperienceSection({ experience }: Props) {
  return (
    <View>
      <Text style={styles.heading}>WORK EXPERIENCE</Text>

      {experience?.slice(0, 3).map((job, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.sub}>{job.duration}</Text>
          <Text numberOfLines={3} style={styles.text}>
            {job.description}
          </Text>
        </View>
      ))}
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
  block: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 13,
  },
  sub: {
    fontSize: 12,
    color: "#666",
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
});