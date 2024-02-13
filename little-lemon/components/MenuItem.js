import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MenuItem = ({ item }) => {
	const defaultImages = {
		"Grilled Fish": require("../assets/GrilledFish.png"),
		"Lemon Dessert": require("../assets/LemonDessert.png")
	};

	const imageSource = defaultImages[item.name]
		? defaultImages[item.name]
		: {
				uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`
		  };

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{item.name}</Text>
				<Text style={styles.description}>{item.description}</Text>
				<Text style={styles.price}>${item.price.toFixed(2)}</Text>
			</View>
			<Image source={imageSource} style={styles.image} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0"
	},
	textContainer: {
		width: "65%",
		justifyContent: "center",
		flexShrink: 1
	},
	title: {
		fontSize: 18,
		fontFamily: "Karla-Bold",
		marginBottom: 10
	},
	description: {
		fontSize: 14,
		fontFamily: "Karla-Regular"
	},
	price: {
		fontSize: 14,
		marginTop: 5,
		fontFamily: "Karla-Bold"
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
		resizeMode: "cover"
	}
});

export default MenuItem;
