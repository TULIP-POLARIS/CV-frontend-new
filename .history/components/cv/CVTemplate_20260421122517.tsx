import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CVData } from "../../types/cv";

import HeaderSection from "./HeaderSection";
import LeftSidebar from "./LeftSidebar";
import RightContent from "./RightContent";

export type CVTheme = {
  headerColor: string;
  sidebarColor: string;
  accentColor: string;
  sidebarText: string;
  mainBg: string;
  sectionColor: string;
};

const DEFAULT_THEME: CVTheme = {
  headerColor: "#2F3E4D",
  sidebarColor: "#263545",
  accentColor: "#4A90D9",
  sidebarText: "#C8D8E8",
  mainBg: "#FFFFFF",
  sectionColor: "#2F3E4D",
};

type Props = {
  data: CVData;
  theme?: CVTheme;
};

export default function CVTemplate({ data, theme = DEFAULT_THEME }: Props) {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: theme.mainBg }]}>

        <HeaderSection data={data} theme={theme} />

        <View style={styles.body}>
          <LeftSidebar data={data} theme={theme} />
          <RightContent data={data} theme={theme} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#eee" },
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  body: { flexDirection: "row" },
});