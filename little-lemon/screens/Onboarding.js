import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Image,
	TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [isValid, setIsValid] = useState(false);

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validateFirstName = (name) => {
		const nameRegex = /^[a-zA-Z ]+$/;
		return nameRegex.test(name);
	};

	const validateForm = () => {
		setIsValid(validateFirstName(firstName) && validateEmail(email));
	};

	const handleFirstNameChange = (text) => {
		setFirstName(text);
		validateForm();
	};

	const handleEmailChange = (text) => {
		setEmail(text);
		validateForm();
	};

	const saveUserData = async () => {
		try {
			await AsyncStorage.setItem("userFirstName", firstName);
			await AsyncStorage.setItem("userEmail", email);
			await AsyncStorage.setItem("alreadyLaunched", "true");
			console.log("User data saved:", firstName, email);
			navigation.navigate("Profile");
		} catch (e) {
			console.error("Failed to save user data:", e);
		}
	};

	return (
		<View style={styles.container}>
			<Image source={require("../assets/Logo.png")} style={styles.logo} />
			<Text style={styles.title}>Let us get to know you</Text>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>First Name</Text>
				<TextInput
					style={styles.input}
					placeholder='First Name'
					value={firstName}
					onChangeText={handleFirstNameChange}
					autoCapitalize='words'
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder='Email'
					value={email}
					onChangeText={handleEmailChange}
					keyboardType='email-address'
					autoCapitalize='none'
				/>
			</View>
			<TouchableOpacity
				style={[
					styles.button,
					{ backgroundColor: isValid ? "#333333" : "#D3D3D3" }
				]}
				onPress={saveUserData}
				disabled={!isValid}
			>
				<Text style={styles.buttonText}>Next</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 60,
		paddingHorizontal: 20,
		backgroundColor: "#f0f0f0"
	},
	logo: {
		width: 200,
		height: 80,
		resizeMode: "contain",
		alignSelf: "center",
		marginBottom: 100
	},
	title: {
		fontSize: 18,
		marginBottom: 100,
		textAlign: "center"
	},
	inputContainer: {
		alignSelf: "stretch",
		marginBottom: 10
	},
	label: {
		fontSize: 16,
		color: "#000",
		marginBottom: 5,
		marginLeft: 10
	},
	input: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#ffffff",
		borderColor: "#d0d0d0",
		alignSelf: "stretch",
		marginLeft: 10,
		marginRight: 10
	},
	button: {
		marginTop: 20,
		borderRadius: 5,
		backgroundColor: "#333333",
		width: "50%",
		height: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold"
	}
});

export default Onboarding;
