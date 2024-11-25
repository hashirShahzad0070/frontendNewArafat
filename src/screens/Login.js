import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import emailIcon from "../assets/images/email.png";
import hideIcon from "../assets/images/Hide.png";
import showIcon from "../assets/images/show.png";
import loginBot from "../assets/images/LoginBot.png";
import passwordIcon from "../assets/images/password.png";
import { axios } from "../config/axios.config"; // Ensure axios is configured
import styles from "../styles/LoginScreenStyles"; // Ensure you have defined styles for this screen

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordInputRef = useRef(null);

  const toggleSwitch = () => setRememberMe((previousState) => !previousState);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields!");
      return;
    }
  
    try {
      console.log('Email:', email, 'Password:', password);
      const response = await axios.post("login", {
        email,
        password,
      });
      console.log('Full response:', response.data);
  
      if (response.data.status === "ok") {
        Alert.alert("Success", "Login successful!");
      
        const { token, userId } = response.data; 
      
        await AsyncStorage.setItem("authToken", token);
        navigation.navigate("Welcome", { token, userId });
      }
      else if (response.data.status === "error3") {
        const { data, userId, token } = response.data; 

        await AsyncStorage.setItem("authToken", token);
        console.log("error3: Token saved to AsyncStorage");

        Alert.alert("Error", data);
        navigation.navigate("PackageScreen", {userId});
      } 
      else {
        Alert.alert("Error", response.data.data);
      }
    } catch (error) {
      console.error("Exception during login:", error);
      Alert.alert(
        "Error",
        "Unexpected Error! Please Try Again."
      );
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
            <Text style={styles.title}>Login</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Image source={emailIcon} style={styles.icon} />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#54545480"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current.focus()} // Move focus to password input
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
                autoCapitalize="none"
                returnKeyType="done"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  source={isPasswordVisible ? hideIcon : showIcon}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me Toggle */}
            <View style={styles.rememberContainer}>
              <Text style={styles.rememberText}>Remember me</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={rememberMe}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Link to Signup Screen */}
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text style={styles.signupText}>
                Don’t have an account?{" "}
                <Text style={styles.signupLink}>Signup</Text>
              </Text>
            </TouchableOpacity>

            <Text style={styles.signupText2}>Powered By | BG IT Solutions</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
