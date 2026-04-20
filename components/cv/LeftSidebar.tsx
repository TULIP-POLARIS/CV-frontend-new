import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CVData } from "../../types/cv";

type Props = {
  data: CVData;
};

export default function LeftSidebar({ data }: Props) {
  return (
    <View style={styles.container}>
      
      {/* SKILLS */}
      <Text style={styles.heading}>SKILLS</Text>
      <View style={styles.divider} />
      {data.skills?.slice(0, 8).map((skill, i) => (
        <Text key={i} style={styles.item}>• {skill}</Text>
      ))}

      {/* LANGUAGES */}
      <Text style={styles.heading}>LANGUAGES</Text>
      <View style={styles.divider} />
      {data.languages?.map((lang, i) => (
        <Text key={i} style={styles.item}>
          {lang.name} – {lang.level}
        </Text>
      ))}

      {/* CONTACT */}
      {data.contact && (
        <>
          <Text style={styles.heading}>CONTACT</Text>
          <View style={styles.divider} />

          {data.contact.phone && (
            <View style={styles.row}>
              <Ionicons name="call-outline" size={14} />
              <Text style={styles.text}>{data.contact.phone}</Text>
            </View>
          )}

          {data.contact.email && (
            <View style={styles.row}>
              <Ionicons name="mail-outline" size={14} />
              <Text style={styles.text}>{data.contact.email}</Text>
            </View>
          )}

          {data.contact.address && (
            <View style={styles.row}>
              <Ionicons name="location-outline" size={14} />
              <Text style={styles.text}>{data.contact.address}</Text>
            </View>
          )}
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "35%",
    backgroundColor: "#F4F6F8",
    padding: 15,
  },
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "#bbb",
    marginBottom: 10,
  },
  item: {
    fontSize: 12,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
  },
});