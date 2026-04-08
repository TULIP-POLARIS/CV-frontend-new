import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function FirstPart() {
  const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.container}>

      <View style={styles.header}>

          <Text style={styles.headerTitle}>Welcome!</Text>

          <Text style={styles.headerSubtitle}>
            Let’s turn your experience into opportunity.
            Show the world who you are.
          </Text>

          <View style={styles.topRow}>

                <Image
                  source={require("../../assets/crosschecklogo.jpeg")}
                  style={styles.logo}
                />
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={[styles.smallButton, styles.btn1]} onPress={()=>{navigation.navigate('Profile')}}>
                <Text style={styles.smallButtonText}>My Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.smallButton, styles.btn2]}>
                <Text style={styles.smallButtonText}>My previous CVs</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.smallButton, styles.btn3]}>
                <Text style={styles.smallButtonText}>Generate new cv for me</Text>
              </TouchableOpacity>
            </View>

              
          </View>



    </View>

       
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Already have a CV?</Text>
              <Text>Upload it here.</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Share your</Text>
              <Text>background with us</Text>
            </View>
          </View>

      
          <TextInput
            placeholder="Paste the job description or tell us in your own words!"
            style={styles.textArea}
            multiline
          />


          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateText}>Start Generate my cv</Text>
          </TouchableOpacity>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 40,
    paddingHorizontal: 20,
    maxWidth: 420,
    alignSelf: "center"
  },
header: {
  backgroundColor: "#3f78c4",
  padding: 30,
  borderBottomRightRadius: 200,
  marginBottom: 40
},

headerTitle: {
  color: "white",
  fontSize: 32,
  fontWeight: "bold"
},

headerSubtitle: {
  color: "white",
  marginTop: 5,
  maxWidth: 320,
  marginBottom: 20
},

topRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 20
},

logo: {
  width: 140,
  height: 140
},

 buttonColumn: {
  alignItems: "flex-end",
  marginTop: 40
},

btn1: {
  width: 160
},

btn2: {
  width: 190
},

btn3: {
  width: 220
},



smallButton: {
  backgroundColor: "#a6b9d3",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 6,
  marginBottom: 12,
  alignItems: "center"
},

smallButtonText: {
  fontWeight: "500"
},
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },

  card: {
    backgroundColor: "#ddd",
    width: "48%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center"
  },

  cardTitle: {
    fontWeight: "bold",
    textAlign: "center"
  },

  textArea: {
    backgroundColor: "#ddd",
    marginTop: 25,
    height: 120,
    borderRadius: 10,
    padding: 10
  },

  generateButton: {
    backgroundColor: "#89a7c8",
    padding: 15,
    marginTop: 20,
    borderRadius: 6,
    alignItems: "center"
  },

  generateText: {
    fontWeight: "bold"
  }

 
});