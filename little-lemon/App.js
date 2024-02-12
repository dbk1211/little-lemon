import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);
	const [fontsLoaded] = useFonts({
		"Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
		"Karla-ExtraBold": require("./assets/fonts/Karla-ExtraBold.ttf"),
		"Karla-Bold": require("./assets/fonts/Karla-Bold.ttf"),
		"Markazi-Medium": require("./assets/fonts/MarkaziText-Medium.ttf")
	});

	useEffect(() => {
		async function checkFirstLaunch() {
			let firstLaunch = null;
			try {
				const value = await AsyncStorage.getItem("alreadyLaunched");
				if (value === null) {
					await AsyncStorage.setItem("alreadyLaunched", "true");
					firstLaunch = true;
				} else {
					firstLaunch = false;
				}
			} catch (e) {
				console.error(e);
			}
			if (fontsLoaded && firstLaunch !== null) {
				SplashScreen.hideAsync();
			}
			setIsFirstLaunch(firstLaunch);
		}

		checkFirstLaunch();
	}, [fontsLoaded]);

	if (isFirstLaunch === null || !fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isFirstLaunch ? "Onboarding" : "Home"}
			>
				<Stack.Screen name='Onboarding' component={Onboarding} />
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Profile' component={Profile} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
