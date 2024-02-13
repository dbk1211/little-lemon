import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();

const fetchMenuItems = async () => {
	const response = await fetch(
		"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
	);
	const data = await response.json();
	return data.menu;
};

const insertMenuItemsToDb = (db, menuItems) => {
	db.transaction((tx) => {
		tx.executeSql(
			"create table if not exists menu (id integer primary key not null, name text, description text, price real, image text, category text);"
		);
		menuItems.forEach((item) => {
			tx.executeSql(
				"insert into menu (name, description, price, image, category) values (?, ?, ?, ?, ?)",
				[
					item.name,
					item.description,
					item.price,
					item.image,
					item.category
				]
			);
		});
	});
};

export default function App() {
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);
	const [fontsLoaded] = useFonts({
		"Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
		"Karla-ExtraBold": require("./assets/fonts/Karla-ExtraBold.ttf"),
		"Karla-Bold": require("./assets/fonts/Karla-Bold.ttf"),
		"Markazi-Medium": require("./assets/fonts/MarkaziText-Medium.ttf")
	});

	useEffect(() => {
		async function prepareApp() {
			const db = SQLite.openDatabase("little_lemon.db");
			const value = await AsyncStorage.getItem("alreadyLaunched");
			if (value === null) {
				await AsyncStorage.setItem("alreadyLaunched", "true");
				const menuItems = await fetchMenuItems();
				insertMenuItemsToDb(db, menuItems);
			}
			SplashScreen.hideAsync();
			setIsFirstLaunch(value === null);
		}

		if (fontsLoaded) {
			prepareApp();
		}
	}, [fontsLoaded]);

	if (isFirstLaunch === null || !fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isFirstLaunch ? "Onboarding" : "Home"}
				screenOptions={{
					headerTintColor: "#495E57",
					headerTitleStyle: {
						fontFamily: "Karla-Regular"
					},
					headerBackTitleVisible: false
				}}
			>
				<Stack.Screen name='Onboarding' component={Onboarding} />
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Profile' component={Profile} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
