import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileHeader() {
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Profile deleted") }
      ]
    );
  };

  return (
    <View style={styles.header}>

      {/* Top buttons row */}
      <View style={styles.topRow}>
        
        {/* Back Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={styles.rightIcons}>

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleDelete}
          >
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("EditProfile" as never)}
          >
            <Ionicons name="create-outline" size={20} color="white" />
          </TouchableOpacity>

        </View>
      </View>

      {/* Avatar */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Achini sudarshi Fernando</Text>
      <Text style={styles.title}>Frontend Developer</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3D63C8",
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 50,
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  rightIcons: {
    flexDirection: "row",
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 20,
  },

  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  title: {
    color: "#E6ECFF",
  },
});