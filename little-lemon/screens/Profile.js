import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Alert,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";

const Profile = () => {
	const navigation = useNavigation();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	useEffect(() => {
		const loadProfileData = async () => {
			try {
				const storedFirstName = await AsyncStorage.getItem(
					"userFirstName"
				);
				const storedLastName = await AsyncStorage.getItem(
					"userLastName"
				);
				const storedEmail = await AsyncStorage.getItem("userEmail");
				const storedPhoneNumber = await AsyncStorage.getItem(
					"userPhoneNumber"
				);
				if (storedFirstName) setFirstName(storedFirstName);
				if (storedLastName) setLastName(storedLastName);
				if (storedEmail) setEmail(storedEmail);
				if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
			} catch (e) {
				console.error("Failed to load user data:", e);
			}
		};

		loadProfileData();
	}, []);

	const saveProfileData = async () => {
		try {
			await AsyncStorage.setItem("userFirstName", firstName);
			await AsyncStorage.setItem("userLastName", lastName);
			await AsyncStorage.setItem("userEmail", email);
			await AsyncStorage.setItem("userPhoneNumber", phoneNumber);
			alert("Profile saved successfully!");
		} catch (e) {
			console.error("Failed to save profile data:", e);
			alert("Failed to save profile data.");
		}
	};

	const logout = async () => {
		try {
			await AsyncStorage.multiRemove([
				"userFirstName",
				"userLastName",
				"userEmail",
				"userPhoneNumber",
				"alreadyLaunched"
			]);
			setFirstName("");
			setLastName("");
			setEmail("");
			setPhoneNumber("");
			// navigation.navigate("Onboarding");
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [{ name: "Onboarding" }]
				})
			);
		} catch (e) {
			console.error("Failed to clear user data:", e);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Personal information</Text>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>First Name</Text>
				<TextInput
					style={styles.input}
					placeholder='First Name'
					value={firstName}
					onChangeText={setFirstName}
					autoCapitalize='words'
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Last Name</Text>
				<TextInput
					style={styles.input}
					placeholder='Last Name'
					value={lastName}
					onChangeText={setLastName}
					autoCapitalize='words'
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
					keyboardType='email-address'
					autoCapitalize='none'
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Phone Number</Text>
				<TextInput
					style={styles.input}
					placeholder='Phone Number'
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					keyboardType='phone-pad'
					maxLength={14}
				/>
			</View>

			<TouchableOpacity
				style={styles.saveButton}
				onPress={saveProfileData}
			>
				<Text style={styles.saveButtonText}>Save Changes</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.logoutButton} onPress={logout}>
				<Text style={styles.logoutButtonText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 20,
		backgroundColor: "#fff"
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20
	},
	inputContainer: {
		alignSelf: "stretch",
		marginBottom: 15
	},
	label: {
		fontSize: 16,
		marginBottom: 5
	},
	input: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		borderColor: "#d0d0d0",
		backgroundColor: "#ffffff"
	},
	saveButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 5,
		backgroundColor: "#333333",
		alignSelf: "stretch",
		alignItems: "center",
		marginTop: 20
	},
	saveButtonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold"
	},
	logoutButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 5,
		backgroundColor: "#d9534f",
		alignSelf: "stretch",
		alignItems: "center",
		marginTop: 20
	},
	logoutButtonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold"
	}
});
