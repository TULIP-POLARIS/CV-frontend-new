import { StyleSheet, Text, View, Alert, TextInput, Button, Pressable } from 'react-native';
import React from 'react';
import { RootStackParamList } from './LoginForm';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<RootStackParamList>();

  const handleRegister = async () => {
  if (!name || !email || !password || !phoneNumber) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  try {
    const response = await fetch(
      'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber }),
      }
    );

    const contentType = response.headers.get('content-type');

    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text(); // fallback to plain text
    }

    if (!response.ok) {
      // Server returned an error
      throw new Error(typeof data === 'string' ? data : data.message || 'Registration failed');
    }

    console.log('User Registered:', data);

    Alert.alert('Success', 'Account created successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  } catch (error: any) {
    console.error('Registration error:', error);
    Alert.alert('Registration Failed', error.message || 'Something went wrong. Please try again.');
  }
};;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Button title="Register" onPress={handleRegister} />

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
});