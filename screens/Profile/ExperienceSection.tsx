import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AnimatedCard from "../../components/ui/AnimatedCard";
import EditModal from "../../components/ui/EditModal";

export default function ExperienceSection() {
    const [expModal, setExpModal] = useState(false);
  return (
    <AnimatedCard>

      <View style={styles.header}>
        <Text style={styles.title}>• Experience</Text>

        <TouchableOpacity
  style={styles.addBtn}
  onPress={() => setExpModal(true)}
>
  <Text style={styles.addText}>+ Add</Text>
</TouchableOpacity>
      </View>

      {/* Job 1 */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="business-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.jobTitle}>Frontend Developer</Text>
          <Text>Acme Tech - Full-time</Text>
          <Text style={styles.date}>Jan 2021 - Present</Text>
        </View>
      </View>

      {/* Job 2 */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="briefcase-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.jobTitle}>Junior Web Developer</Text>
          <Text>Startup Co - Full-time</Text>
          <Text style={styles.date}>Jun 2019 - Dec 2020</Text>
        </View>
      </View>

      <EditModal
  visible={expModal}
  title="Add Experience"
  onClose={() => setExpModal(false)}
>

  <TextInput placeholder="Job Title"/>
  <TextInput placeholder="Company"/>
  <TextInput placeholder="Duration"/>

</EditModal>

    </AnimatedCard>
  );
}

const styles = StyleSheet.create({

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:15
  },

  title:{
    fontWeight:"bold",
    fontSize:16
  },

  addBtn:{
    backgroundColor:"#E6ECFF",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:10
  },

  addText:{
    color:"#3D63C8"
  },

  row:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15
  },

  iconBox:{
    width:40,
    height:40,
    borderRadius:10,
    backgroundColor:"#EEF2FF",
    justifyContent:"center",
    alignItems:"center",
    marginRight:12
  },

  jobTitle:{
    fontWeight:"bold"
  },

  date:{
    color:"#7C8BA1",
    fontSize:12
  }

});