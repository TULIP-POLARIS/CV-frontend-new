import React from "react";
import { ScrollView } from "react-native";
import CVTemplate from "../../components/cv/CVTemplate";

export default function CVPreviewScreen({ route }: any) {
  const { data, primaryColor } = route.params;

  return (
    <ScrollView>
      <CVTemplate data={data} primaryColor={primaryColor} />
    </ScrollView>
  );
}