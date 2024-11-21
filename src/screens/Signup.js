import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import emailIcon from "../assets/images/email.png";
import {
  default as hideIcon,
  default as showIcon,
} from "../assets/images/Hide.png";
import loginBot from "../assets/images/LoginBot.png";
import nameIcon from "../assets/images/name.png";
import passwordIcon from "../assets/images/password.png";
import { axios } from "../config/axios.config";
import styles from "../styles/LoginScreenStyles";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev); // Toggle password visibility

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post("register", {
        name,
        email,
        password,
      });

      console.log(response.data); // Log the response to check if the token is returned

      if (response.data.status === "ok") {
        Alert.alert("Success", response.data.data); // Shows "User created successfully" message from backend

        // Store the token in AsyncStorage
        const token = response.data.token;
        if (token) {
          await AsyncStorage.setItem("authToken", token);
          console.log("Token saved to AsyncStorage");

          // Navigate to the Welcome screen with the token
          navigation.navigate("PackageScreen", { token });
        } else {
          Alert.alert("Error", "Token not received.");
        }
      } else {
        Alert.alert("Error", response.data.data || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "API error");
      } else if (error.request) {
        Alert.alert("Error", "Network Error: No response from server");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imgwrapper}>
            <Image source={loginBot} style={styles.image} />
          </View>
          <View style={styles.DetailWrapper}>
            <Text style={styles.titleSignup}>Signup</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Image source={nameIcon} style={styles.iconName} />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#54545480"
                style={styles.input}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current.focus()} // Move to email field on submit
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Image source={emailIcon} style={styles.icon} />
              <TextInput
                ref={emailInputRef}
                placeholder="E-mail"
                placeholderTextColor="#54545480"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current.focus()} // Move to password field on submit
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Image source={passwordIcon} style={styles.icon} />
              <TextInput
                ref={passwordInputRef}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible} // Toggle visibility based on state
                placeholderTextColor="#54545480"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  source={isPasswordVisible ? showIcon : hideIcon}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Signup Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Signup</Text>
            </TouchableOpacity>

            {/* Link to Login Screen */}
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.signupText}>
                Already have an account?{" "}
                <Text style={styles.signupLink}>Login</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.signupText3}>Powered By | BG IT Solutions</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;
