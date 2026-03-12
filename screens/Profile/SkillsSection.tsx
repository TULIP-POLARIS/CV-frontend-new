import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native";
import AnimatedCard from "../../components/ui/AnimatedCard";
import EditModal from "../../components/ui/EditModal";

export default function SkillsSection() {

  const skills = [
    "React Native",
    "Node.js",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Figma"
  ];
  const [skillModal, setSkillModal] = useState(false);

  return (
    <AnimatedCard>

      <View style={styles.header}>
        <Text style={styles.title}>Skills</Text>

        <TouchableOpacity
  style={styles.addBtn}
  onPress={() => setSkillModal(true)}
>
  <Text style={styles.addText}>+ Add</Text>
</TouchableOpacity>
      </View>

      <View style={styles.skillsWrap}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skill}>
            <Text>{skill}</Text>
          </View>
        ))}

        {/* Add skill pill */}
        <TouchableOpacity style={styles.addSkill}>
          <Text style={{color:"#3D63C8"}}>+ Add skill</Text>
        </TouchableOpacity>

      </View>

      <EditModal
  visible={skillModal}
  title="Add Skill"
  onClose={() => setSkillModal(false)}
>

  <TextInput placeholder="Enter skill" />

</EditModal>
    

    </AnimatedCard>
  );
}

const styles = StyleSheet.create({

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10
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

  skillsWrap:{
    flexDirection:"row",
    flexWrap:"wrap"
  },

  skill:{
    backgroundColor:"#E6ECFF",
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:20,
    marginRight:8,
    marginBottom:8
  },

  addSkill:{
    borderWidth:1,
    borderColor:"#3D63C8",
    borderStyle:"dashed",
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:20
  }

});