import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { axios } from "../config/axios.config";

export const login = async (email, password) => {
  const navigation = useNavigation();

  if (!email || !password) {
    Alert.alert("Error", "Please fill all the fields!");
    return;
  }

  try {
    const response = await axios.post("login", {
      email,
      password,
    });

    if (response.data.status === "ok") {
      Alert.alert("Success", "Login successful!");

      const token = response.data.token;

      await AsyncStorage.setItem("authToken", token);

      // Navigate to Welcome screen and pass the token
      navigation.navigate("PackageScreen", { token });
    } else {
      Alert.alert("Error", response.data.data || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    Alert.alert("Error", "An error occurred. Please check your network and try again.");
  }
};
