import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AnimatedCard from "../../components/ui/AnimatedCard";
import EditModal from "../../components/ui/EditModal";


export default function EducationSection() {
    const [eduModal, setEduModal] = useState(false);
  return (
    <AnimatedCard>

      <View style={styles.header}>
        <Text style={styles.title}>• Education</Text>

        <TouchableOpacity
  style={styles.addBtn}
  onPress={() => setEduModal(true)}
>
  <Text style={styles.addText}>+ Add</Text>
</TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="school-outline" size={18} color="#3D63C8" />
        </View>

        <View>
          <Text style={styles.degree}>B.Sc. Computer Science</Text>
          <Text>King Saud University</Text>
          <Text style={styles.date}>2015 – 2019</Text>
        </View>
      </View>

      <EditModal
  visible={eduModal}
  title="Add Education"
  onClose={() => setEduModal(false)}
>

  <TextInput placeholder="Degree"/>
  <TextInput placeholder="University"/>
  <TextInput placeholder="Year"/>

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
    alignItems:"center"
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

  degree:{
    fontWeight:"bold"
  },

  date:{
    color:"#7C8BA1",
    fontSize:12
  }

});