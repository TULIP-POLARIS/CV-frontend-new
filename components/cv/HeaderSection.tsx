import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CVData } from "../../types/cv";

type Props = {
  data: CVData;
  primaryColor: string;
};

export default function HeaderSection({ data, primaryColor }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: primaryColor }]}>
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