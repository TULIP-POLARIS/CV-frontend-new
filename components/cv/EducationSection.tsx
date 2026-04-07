import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Education } from "../../types/cv";

type Props = {
  education: Education[];
};

export default function EducationSection({ education }: Props) {
  return (
    <View>
      <Text style={styles.heading}>EDUCATION</Text>

      {education?.slice(0, 3).map((item, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.title}>{item.degree}</Text>
          <Text style={styles.sub}>{item.institution}</Text>
          <Text style={styles.date}>
            {item.startDate} - {item.endDate || "Present"}
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
  date: {
    fontSize: 11,
    color: "#999",
  },
});