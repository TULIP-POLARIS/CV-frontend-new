import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CVData } from "../../types/cv";
import { CVTheme } from "./CVTemplate";

type Props = {
  data: CVData;
  theme: CVTheme;
};

export default function HeaderSection({ data, theme }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: theme.headerColor }]}>
      <Image source={{ uri: data.image }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    marginRight: 15,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    color: "#ddd",
    fontSize: 14,
  },
});