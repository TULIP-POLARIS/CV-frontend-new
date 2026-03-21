import React, { useState, useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export type RootStackParamList = {
  MainTabs: undefined;
  Register: undefined;
  Login: undefined;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();

  // Google Sign-In
  const [request, response, promptAsync] = useAuthRequest({
    // TODO: Replace with your own client IDs
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      }
    }
  }, [response]);

  const fetchUserInfo = async (token: string) => {
    setLoading(true);
    try {
      const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfo = await userInfoResponse.json();
      handleGoogleLogin(userInfo);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      Alert.alert("Login Failed", "Failed to fetch user information from Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (userInfo: { email: string, name: string, id: string }) => {
    // This function will handle the logic to send the user info to your backend
    // and navigate to the MainTabs screen if the login is successful.
    console.log("Google User Info:", userInfo);
    // Assuming you have a backend endpoint to handle Google login
    // Example: /api/auth/google
    // const backendResponse = await fetch("YOUR_BACKEND_URL/api/auth/google", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: userInfo.email, name: userInfo.name, googleId: userInfo.id }),
    // });
    // if (backendResponse.ok) {
    //   navigation.replace("MainTabs");
    // } else {
    //   Alert.alert("Login Failed", "Could not log in with Google.");
    // }
    Alert.alert("Logged in with Google", `Welcome ${userInfo.name}!`);
    navigation.replace("MainTabs");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(typeof data === "string" ? data : data.message || "Login failed");
      }

      console.log("Login success:", data);

      // Navigate immediately. Avoid depending on Alert callback on web/platforms where it may be unreliable.
      navigation.replace("MainTabs");
      Alert.alert("Success", "Logged in successfully!");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Let’s turn your experience into opportunity.</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => promptAsync()}
          disabled={!request || loading}
        >
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>


        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 40,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
  },
});