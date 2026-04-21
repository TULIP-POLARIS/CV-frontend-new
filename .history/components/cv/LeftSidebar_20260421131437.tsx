import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CVData } from "../../types/cv";
import { CVTheme } from "./CVTemplate";

type Props = {
  data: CVData;
  theme: CVTheme;
};

export default function LeftSidebar({ data, theme }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: theme.sidebarColor }]}>

      {/* SKILLS */}
      <Text style={[styles.heading, { color: theme.accentColor }]}>SKILLS</Text>
      <View style={[styles.divider, { backgroundColor: theme.accentColor }]} />
      {data.skills?.slice(0, 8).map((skill, i) => (
        <Text key={i} style={[styles.item, { color: theme.sidebarText }]}>• {skill}</Text>
      ))}

      {/* LANGUAGES */}
      <Text style={[styles.heading, { color: theme.accentColor }]}>LANGUAGES</Text>
      <View style={[styles.divider, { backgroundColor: theme.accentColor }]} />
      {data.languages?.map((lang, i) => (
        <Text key={i} style={[styles.item, { color: theme.sidebarText }]}>
          {lang.name} – {lang.level}
        </Text>
      ))}

      {/* CONTACT */}
      {data.contact && (
        <>
          <Text style={[styles.heading, { color: theme.accentColor }]}>CONTACT</Text>
          <View style={[styles.divider, { backgroundColor: theme.accentColor }]} />

          {data.contact.phone && (
            <View style={styles.row}>
              <Ionicons name="call-outline" size={14} color={theme.sidebarText} />
              <Text style={[styles.text, { color: theme.sidebarText }]}>{data.contact.phone}</Text>
            </View>
          )}

          {data.contact.email && (
            <View style={styles.row}>
              <Ionicons name="mail-outline" size={14} color={theme.sidebarText} />
              <Text style={[styles.text, { color: theme.sidebarText }]}>{data.contact.email}</Text>
            </View>
          )}

          {data.contact.address && (
            <View style={styles.row}>
              <Ionicons name="location-outline" size={14} color={theme.sidebarText} />
              <Text style={[styles.text, { color: theme.sidebarText }]}>{data.contact.address}</Text>
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
    marginBottom: 10,
    opacity: 0.5,
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