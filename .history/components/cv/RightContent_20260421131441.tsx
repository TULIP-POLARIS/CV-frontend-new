import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CVData } from "../../types/cv";

type Props = {
  data: CVData;
};

export default function RightContent({ data }: Props) {
  return (
    <View style={styles.container}>
      
      {/* PROFILE */}
      <Text style={styles.heading}>PROFILE</Text>
      <View style={styles.divider} />
      <Text style={styles.text} numberOfLines={5}>
        {data.summary}
      </Text>

      {/* EDUCATION */}
      <Text style={styles.heading}>EDUCATION</Text>
      <View style={styles.divider} />

      {data.education?.map((edu, i) => (
        <View key={i} style={styles.row}>
          
          <View style={styles.timeline}>
            <View style={styles.circle} />
            <View style={styles.line} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{edu.degree}</Text>
            <Text style={styles.sub}>{edu.institution}</Text>
            <Text style={styles.date}>
              {edu.startDate} - {edu.endDate}
            </Text>
          </View>

        </View>
      ))}

      {/* EXPERIENCE */}
      <Text style={styles.heading}>WORK EXPERIENCE</Text>
      <View style={styles.divider} />

      {data.experience?.map((job, i) => (
        <View key={i} style={styles.row}>
          
          <View style={styles.timeline}>
            <View style={styles.circle} />
            <View style={styles.line} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.sub}>{job.duration}</Text>
            <Text numberOfLines={3} style={styles.text}>
              {job.description}
            </Text>
          </View>

        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "65%",
    padding: 15,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  timeline: {
    width: 20,
    alignItems: "center",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2F3E4D",
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#ccc",
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
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
  text: {
    fontSize: 12,
  },
});