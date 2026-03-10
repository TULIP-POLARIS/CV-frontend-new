import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native'
import React from 'react'

export default function RegisterForm() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const[username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleRegister = () => {
    if (!name || !email || !password || !username) {
      Alert.alert("Error", "Please fill all fields");
      return;
      
    }
    console.log("User Registered:", { name, email, password, username });

    Alert.alert("Success", "Account created successfully!");}
  return (
    <View>
      <Text>RegisterForm</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
        <TextInput  
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="Register" onPress={handleRegister} />


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});