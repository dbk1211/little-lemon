import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);

	useEffect(() => {
		AsyncStorage.getItem("alreadyLaunched").then((value) => {
			if (value === null) {
				AsyncStorage.setItem("alreadyLaunched", "true");
				setIsFirstLaunch(true);
			} else {
				setIsFirstLaunch(false);
			}
		});
	}, []);

	if (isFirstLaunch === null) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isFirstLaunch ? "Onboarding" : "Profile"}
			>
				<Stack.Screen name='Onboarding' component={Onboarding} />
				<Stack.Screen name='Profile' component={Profile} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
