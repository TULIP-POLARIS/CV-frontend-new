import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput  } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AnimatedCard from "../../components/ui/AnimatedCard";
import EditModal from "../../components/ui/EditModal";




export default function PersonalInfoSection() {
    
    const [openModal,setOpenModal] = useState(false);
  return (
    <AnimatedCard>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>• Personal Info</Text>

        <TouchableOpacity
  style={styles.editBtn}
  onPress={() => setOpenModal(true)}
>
  <Text>Edit</Text>
</TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="mail-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.label}>EMAIL</Text>
          <Text style={styles.value}>ahmed@email.com</Text>
        </View>
      </View>

      {/* Phone */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="call-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.label}>PHONE</Text>
          <Text style={styles.value}>+966 55 123 4567</Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="location-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.label}>LOCATION</Text>
          <Text style={styles.value}>Riyadh, Saudi Arabia</Text>
        </View>
      </View>

      {/* LinkedIn */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="link-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.label}>LINKEDIN</Text>
          <Text style={styles.value}>linkedin.com/in/ahmed</Text>
        </View>
      </View>
      <EditModal
  visible={openModal}
  title="Edit Personal Info"
  onClose={() => setOpenModal(false)}
>

  <TextInput placeholder="Email"/>
  <TextInput placeholder="Phone"/>
  <TextInput placeholder="City"/>

</EditModal>

    </AnimatedCard>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center"
  },

  title: {
    fontWeight: "bold",
    fontSize: 16
  },

  editBtn: {
    backgroundColor: "#E6ECFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },

  editText: {
    color: "#3D63C8"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },

  label: {
    fontSize: 11,
    color: "#9AA3B2"
  },

  value: {
    fontSize: 14,
    fontWeight: "500"
  }

});