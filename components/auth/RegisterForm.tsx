import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { RootStackParamList } from './LoginForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();

  const handleRegister = async () => {
    setError('');
    if (!name || !email || !password || !phoneNumber) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);

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
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage = typeof data === 'string' ? data : data.message || 'Registration failed';
        if (errorMessage.toLowerCase().includes('email already exists')) {
            setError('This email is already registered.');
        } else {
            setError(errorMessage);
        }
        return;
      }

      console.log('User Registered:', data);

      navigation.navigate('Login');
      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    if (error) {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={handleInputChange(setName)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleInputChange(setEmail)}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handleInputChange(setPassword)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handleInputChange(setPhoneNumber)}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate('Login')} disabled={loading}>
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
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
