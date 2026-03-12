import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface EditModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function EditModal({
  visible,
  title,
  children,
  onClose
}: EditModalProps) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >

      <View style={styles.overlay}>

        <View style={styles.card}>

          <Text style={styles.title}>{title}</Text>

          {children}

          <View style={styles.buttons}>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

overlay:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"rgba(0,0,0,0.4)"
},

card:{
  backgroundColor:"white",
  width:"85%",
  borderRadius:16,
  padding:20
},

title:{
  fontSize:18,
  fontWeight:"bold",
  marginBottom:10
},

buttons:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:20
},

cancel:{
  color:"#777"
},

save:{
  color:"#3D63C8",
  fontWeight:"bold"
}

});