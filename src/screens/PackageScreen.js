import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { WebView } from "react-native-webview";
import { axios } from "../config/axios.config";

const PackageScreen = ({ navigation,route }) => {
  const { userId } = route.params; // Access token and userId here
  console.log("user id in packageScreen:  ", userId);

  const [selectedPackage, setSelectedPackage] = useState(
    "Per 3 months (Most Popular)"
  );
  const [approvalLink, setApprovalLink] = useState(null);
  const [isWebViewVisible, setWebViewVisible] = useState(false);

  const packages = [
    { id: 1, name: "Per month", price: "$2.99", amount: "2.99" },
    {
      id: 2,
      name: "Per 3 months (Most Popular)",
      price: "$6.99",
      amount: "6.99",
    },
    { id: 3, name: "Per year", price: "$21.99", amount: "21.99" },
    { id: 4, name: "One time", price: "$99.99", amount: "99.99" },
  ];

  const handleSubscribe = async () => {
    try {
      const selectedPkg = packages.find((pkg) => pkg.name === selectedPackage);

      const { data } = await axios.post("create-order", {
        amount: selectedPkg.amount,
        returnUrl: "https://your-frontend-app.com/success", // Success URL
        cancelUrl: "https://your-frontend-app.com/cancel", // Cancel URL
      });

      const { approveLink } = data;

      if (approveLink) {
        setApprovalLink(approveLink); // Set approval link for WebView
        setWebViewVisible(true); // Show the WebView modal
      } else {
        Alert.alert("Error", "Approval link not found.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while processing your payment.");
    }
  };

  const handleWebViewNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;
  
    if (url.includes("success")) {
      setWebViewVisible(false);
      Alert.alert("Success", "Payment completed successfully!");
  
      try {
        const selectedPkg = packages.find((pkg) => pkg.name === selectedPackage);
  
        let expiryDate;
        let packageType;
        const currentDate = new Date();
  
        if (selectedPkg.name === "Per month") {
          expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
          packageType= "Monthly";
        } else if (selectedPkg.name === "Per 3 months (Most Popular)") {
          expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
          packageType= "3 Months";

        } else if (selectedPkg.name === "Per year") {
          expiryDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
          packageType= "Yearly";


        } else if (selectedPkg.name === "One time") {
          expiryDate = 'No Expiry'; 
          packageType= "One Time";

        }
  
        const response = await axios.post("update-package", {
          userId: userId, // Replace with the actual user ID
          selectedPackage: packageType,
          expiry: expiryDate.toLocaleDateString(), 
        });
  
        if (response.status === 200) {
          Alert.alert("Package Updated", `Your package has been updated to ${selectedPkg.name}.`);
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        console.error("Error updating package:", error);
        Alert.alert("Error", "An error occurred while updating your package.");
      }
    } else if (url.includes("cancel")) {
      setWebViewVisible(false);
      Alert.alert("Canceled", "Payment process was canceled.");
    }
  };
  

  const extractOrderId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("orderId"); // Adjust key if necessary
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Package</Text>

      <ScrollView style={styles.packageList}>
        {packages.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[
              styles.packageCard,
              selectedPackage === pkg.name && styles.selectedPackage,
            ]}
            onPress={() => setSelectedPackage(pkg.name)}
          >
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.packagePrice}>{pkg.price}</Text>
            {selectedPackage === pkg.name && (
              <Text style={styles.selectedText}>Selected</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={handleSubscribe}
      >
        <Text style={styles.buttonText}>Subscribe Now</Text>
      </TouchableOpacity>

      {/* WebView Modal */}
      <Modal
        visible={isWebViewVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: approvalLink }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            startInLoadingState={true}
            style={styles.webView}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setWebViewVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#36373B",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 80,
    color: "#fff",
  },
  packageList: {
    width: "100%",
  },
  packageCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedPackage: {
    backgroundColor: "#d1e7ff",
    borderColor: "#4fa3f7",
  },
  packageName: {
    fontSize: 18,
    fontWeight: "600",
  },
  packagePrice: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    color: "#4fa3f7",
  },
  subscribeButton: {
    backgroundColor: "#4fa3f7",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#ff5c5c",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PackageScreen;
