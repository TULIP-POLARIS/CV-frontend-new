import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CVTemplatePreview from "../../components/cv/CVTemplatePreview";
import { useTranslation } from "../../hooks/useTranslation";
export default function TemplateSelectScreen({ navigation, route }: any) {
  const { data } = route.params || {};
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      
      {/* TITLE */}
      <Text style={styles.title}>{t("cv.selectTemplate")}</Text>

      {/* SINGLE TEMPLATE */}
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() =>
          navigation.navigate("CustomizeCV", {
            data,
            templateId: "template1",
          })
        }
      >
        <CVTemplatePreview />
        <Text style={styles.label}>{t("cv.template1")}</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
  paddingTop: 60,
  backgroundColor: "#F5F6FA",
},
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cardWrapper: {
  width: "100%",
  alignSelf: "center",
  transform: [{ scale: 0.65 }],
  marginTop: -30,
  marginBottom: -80,
},

  label: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});