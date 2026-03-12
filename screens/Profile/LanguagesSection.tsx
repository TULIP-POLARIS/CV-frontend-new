import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput  } from "react-native";
import AnimatedCard from "../../components/ui/AnimatedCard";
import EditModal from "../../components/ui/EditModal";


export default function LanguagesSection() {
    const [langModal, setLangModal] = useState(false);

  const RatingDots = ({ level }: { level: number }) => (
    <View style={styles.dots}>
      {[1,2,3,4,5].map((dot)=>(
        <View
          key={dot}
          style={[
            styles.dot,
            dot <= level && styles.activeDot
          ]}
        />
      ))}
    </View>
  );

  return (
    <AnimatedCard>

      <View style={styles.header}>
        <Text style={styles.title}>• Languages</Text>

        <TouchableOpacity
  style={styles.addBtn}
  onPress={() => setLangModal(true)}
>
  <Text style={styles.addText}>+ Add</Text>
</TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.lang}>Arabic</Text>
        <RatingDots level={5}/>
        <Text style={styles.level}>Native</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.lang}>English</Text>
        <RatingDots level={4}/>
        <Text style={styles.level}>Fluent</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.lang}>French</Text>
        <RatingDots level={2}/>
        <Text style={styles.level}>Basic</Text>
      </View>

      <EditModal
  visible={langModal}
  title="Add Language"
  onClose={() => setLangModal(false)}
>

  <TextInput placeholder="Language"/>
  <TextInput placeholder="Level (Native / Fluent / Basic)"/>

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
    marginBottom:12
  },

  lang:{
    width:80
  },

  dots:{
    flexDirection:"row",
    marginHorizontal:10
  },

  dot:{
    width:8,
    height:8,
    borderRadius:4,
    backgroundColor:"#D6DCE8",
    marginRight:4
  },

  activeDot:{
    backgroundColor:"#3D63C8"
  },

  level:{
    fontSize:12,
    color:"#7C8BA1"
  }

});