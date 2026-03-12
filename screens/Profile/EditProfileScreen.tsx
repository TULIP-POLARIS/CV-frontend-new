import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {

  const navigation = useNavigation();

  const [skills, setSkills] = useState([
    "React Native",
    "Node.js",
    "TypeScript"
  ]);

  const removeSkill = (skill:string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <LinearGradient
        colors={["#274C9C","#3F6ED6"]}
        style={styles.header}
      >

        <View style={styles.topRow}>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <TouchableOpacity style={styles.saveBtnHeader}>
            <Text style={{color:"#274C9C",fontWeight:"600"}}>Save</Text>
          </TouchableOpacity>

        </View>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150" }}
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera" size={16} color="white"/>
          </TouchableOpacity>
        </View>

        <Text style={styles.changePhoto}>Change Photo</Text>

      </LinearGradient>

      {/* FORM */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>• Personal Details</Text>

        <Text style={styles.label}>FIRST NAME</Text>
        <TextInput style={styles.input} defaultValue="Ahmed"/>

        <Text style={styles.label}>LAST NAME</Text>
        <TextInput style={styles.input} defaultValue="Al-Rashidi"/>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput style={styles.input} defaultValue="ahmed@email.com"/>

        <Text style={styles.label}>PHONE</Text>
        <TextInput style={styles.input} defaultValue="+966 55 123 4567"/>

        <Text style={styles.label}>CITY</Text>
        <TextInput style={styles.input} defaultValue="Riyadh, Saudi Arabia"/>

        <Text style={styles.label}>LINKEDIN URL</Text>
        <TextInput style={styles.input} defaultValue="linkedin.com/in/ahmed"/>

      </View>

      {/* SKILLS */}
      <View style={styles.card}>

        <View style={styles.skillsHeader}>
          <Text style={styles.sectionTitle}>• Skills</Text>

          <TouchableOpacity style={styles.addBtn}>
            <Text style={{color:"#3D63C8"}}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsWrap}>
          {skills.map(skill => (
            <View key={skill} style={styles.skill}>
              <Text>{skill}</Text>

              <TouchableOpacity
                onPress={() => removeSkill(skill)}
              >
                <Ionicons name="close" size={14}/>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addSkill}>
            <Text style={{color:"#3D63C8"}}>+ Add skill</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* BUTTONS */}
      <View style={styles.bottomBtns}>

        <TouchableOpacity style={styles.saveMain}>
          <Text style={{color:"white",fontWeight:"bold"}}>
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.discard}>
          <Ionicons name="return-up-back" size={18}/>
          <Text style={{marginLeft:5}}>Discard</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#F3F6FB"
},

header:{
  paddingTop:60,
  paddingBottom:40,
  alignItems:"center"
},

topRow:{
  position:"absolute",
  top:55,
  width:"100%",
  flexDirection:"row",
  justifyContent:"space-between",
  paddingHorizontal:20,
  alignItems:"center"
},

headerTitle:{
  color:"white",
  fontSize:18,
  fontWeight:"600"
},

iconBtn:{
  width:36,
  height:36,
  borderRadius:18,
  backgroundColor:"rgba(255,255,255,0.2)",
  justifyContent:"center",
  alignItems:"center"
},

saveBtnHeader:{
  backgroundColor:"white",
  paddingHorizontal:12,
  paddingVertical:5,
  borderRadius:10
},

avatarWrap:{
  marginTop:40
},

avatar:{
  width:100,
  height:100,
  borderRadius:50
},

cameraBtn:{
  position:"absolute",
  bottom:0,
  right:0,
  backgroundColor:"#3D63C8",
  width:28,
  height:28,
  borderRadius:14,
  justifyContent:"center",
  alignItems:"center"
},

changePhoto:{
  color:"white",
  marginTop:5
},

card:{
  backgroundColor:"white",
  margin:20,
  padding:20,
  borderRadius:16
},

sectionTitle:{
  fontWeight:"bold",
  marginBottom:10
},

label:{
  fontSize:11,
  color:"#8A94A6",
  marginTop:10
},

input:{
  backgroundColor:"#EEF2FF",
  borderRadius:12,
  padding:12,
  marginTop:5
},

skillsHeader:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:10
},

addBtn:{
  backgroundColor:"#E6ECFF",
  paddingHorizontal:10,
  paddingVertical:4,
  borderRadius:10
},

skillsWrap:{
  flexDirection:"row",
  flexWrap:"wrap"
},

skill:{
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#E6ECFF",
  paddingHorizontal:10,
  paddingVertical:6,
  borderRadius:20,
  marginRight:8,
  marginBottom:8
},

addSkill:{
  borderWidth:1,
  borderColor:"#3D63C8",
  borderStyle:"dashed",
  paddingHorizontal:10,
  paddingVertical:6,
  borderRadius:20
},

bottomBtns:{
  flexDirection:"row",
  justifyContent:"space-between",
  paddingHorizontal:20,
  marginBottom:30
},

saveMain:{
  backgroundColor:"#3D63C8",
  padding:16,
  borderRadius:14,
  flex:1,
  alignItems:"center",
  marginRight:10
},

discard:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  borderWidth:1,
  borderColor:"#D6DCE8",
  padding:16,
  borderRadius:14,
  flex:1
}

});