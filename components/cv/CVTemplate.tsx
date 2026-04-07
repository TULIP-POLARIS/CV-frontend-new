import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CVData } from "../../types/cv";

import HeaderSection from "./HeaderSection";
import LeftSidebar from "./LeftSidebar";
import RightContent from "./RightContent";

type Props = {
  data: CVData;
  primaryColor?: string;
};

export default function CVTemplate({
  data,
  primaryColor = "#2F3E4D",
}: Props) {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>

        <HeaderSection data={data} primaryColor={primaryColor} />

        <View style={styles.body}>
          <LeftSidebar data={data} />
          <RightContent data={data} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#eee",
  },
  container: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  body: {
    flexDirection: "row",
  },
});