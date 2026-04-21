import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import HamburgerMenu from "../../components/HamburgerMenu";
import

export default function CVTemplatePreview() {
  return (
    
   

    <View style={styles.card}>
       
        {/* HAMBURGER MENU (TOP RIGHT) */}
  <View style={styles.menuContainer}>
    <HamburgerMenu tintColor="#1A1A2E" />
  </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>SANURI FERNANDO</Text>
        <Text style={styles.title}>
          Junior Full Stack Developer | IT Student
        </Text>
      </View>

      {/* PROFILE IMAGE */}
      <Image
        source={{ uri: "https://i.pravatar.cc/100?img=5" }}
        style={styles.avatar}
      />

      <View style={styles.body}>

        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>
          
          {/* SKILLS */}
          <Text style={styles.section}>SKILLS</Text>
          <View style={styles.sideLine} />
          <Text style={styles.text}>• React, JavaScript</Text>
          <Text style={styles.text}>• HTML, CSS</Text>
          <Text style={styles.text}>• Figma, UX</Text>
          <Text style={styles.text}>• Python, Java</Text>

          {/* LANGUAGES */}
          <Text style={styles.section}>LANGUAGES</Text>
          <View style={styles.sideLine} />
          <Text style={styles.text}>English - Fluent</Text>
          <Text style={styles.text}>Spanish - Intermediate</Text>

          {/* CONTACT */}
          <Text style={styles.section}>CONTACT</Text>
          <View style={styles.sideLine} />

          <View style={styles.contactRow}>
            <Ionicons name="call" size={10} style={styles.icon} />
            <Text style={styles.text}>+123456789</Text>
          </View>

          <View style={styles.contactRow}>
            <Ionicons name="mail" size={10} style={styles.icon} />
            <Text style={styles.text}>email@gmail.com</Text>
          </View>

          <View style={styles.contactRow}>
            <Ionicons name="location" size={10} style={styles.icon} />
            <Text style={styles.text}>Oulu, Finland</Text>
          </View>

          <View style={styles.contactRow}>
            <Ionicons name="globe" size={10} style={styles.icon} />
            <Text style={styles.text}>linkedin.com/in/profile</Text>
          </View>

          <View style={styles.contactRow}>
            <Ionicons name="logo-github" size={10} style={styles.icon} />
            <Text style={styles.text}>github.com/username</Text>
          </View>
        </View>

        {/* RIGHT CONTENT */}
        <View style={styles.content}>

          <View style={styles.timelineWrapper}>

            {/* PROFILE */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name="person" size={10} color="#fff" />
                </View>
                <View style={styles.line} />
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.section}>PROFILE</Text>
                <Text style={styles.smallText}>
                  Second-year IT student with hands-on experience in full-stack development.
                </Text>
              </View>
            </View>

            {/* EDUCATION */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name="school" size={10} color="#fff" />
                </View>
                <View style={styles.line} />
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.section}>EDUCATION</Text>
                <Text style={styles.smallText}>
                  Bachelor of IT (2024–2028)
                </Text>
                <Text style={styles.smallText}>
                  Oulu University of Applied Sciences
                </Text>
              </View>
            </View>

            {/* EXPERIENCE */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name="briefcase" size={10} color="#fff" />
                </View>
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.section}>WORK EXPERIENCE</Text>
                <Text style={styles.smallText}>
                  Intern - Web Developer (2025–Present)
                </Text>
                <Text style={styles.smallText}>
                  • Built web apps using React
                </Text>
                <Text style={styles.smallText}>
                  • Worked with REST APIs
                </Text>
                

</View>
              </View>
            </View>

          </View>

        </View>
      </View>
    
  );
}
const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 340,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },

  header: {
    backgroundColor: "#2F3E4D",
    padding: 12,
    paddingLeft: 70,
  },

  name: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },

  title: {
    color: "#ccc",
    fontSize: 10,
  },

  avatar: {
    position: "absolute",
    top: 20,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#fff",
  },

  body: {
    flexDirection: "row",
    padding: 10,
  },

  sidebar: {
    width: "35%",
  },

  content: {
    width: "65%",
    paddingLeft: 8,
  },

  section: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 6,
  },

  text: {
    fontSize: 8,
    marginBottom: 3,
  },

  smallText: {
    fontSize: 8,
    marginBottom: 3,
  },

  sideLine: {
    height: 2,
    backgroundColor: "#ccc",
    marginVertical: 4,
    width: "80%",
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  icon: {
    marginRight: 4,
    color: "#333",
  },

  timelineWrapper: {
    paddingLeft: 5,
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 10,
  },

  timelineLeft: {
    width: 20,
    alignItems: "center",
  },

  iconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2F3E4D",
    justifyContent: "center",
    alignItems: "center",
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#ccc",
    marginTop: 2,
  },

  timelineContent: {
    flex: 1,
    paddingLeft: 6,
  },
 


tabItem: {
  alignItems: "center",
},

tabText: {
  fontSize: 10,
  marginTop: 2,
},
menuContainer: {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 10, // keeps it above other elements
},
});