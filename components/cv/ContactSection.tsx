import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Contact } from "../../types/cv";

type Props = {
  contact: Contact;
};

export default function ContactSection({ contact }: Props) {
  if (!contact) return null;

  return (
    <View>
      <Text style={styles.heading}>CONTACT</Text>

      {contact.phone && (
        <View style={styles.row}>
          <Ionicons name="call-outline" size={16} />
          <Text style={styles.text}>{contact.phone}</Text>
        </View>
      )}

      {contact.email && (
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={16} />
          <Text style={styles.text}>{contact.email}</Text>
        </View>
      )}

      {contact.address && (
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} />
          <Text style={styles.text}>{contact.address}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
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