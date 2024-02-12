import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	TextInput,
	FlatList,
	TouchableOpacity
} from "react-native";
import useFetchMenuItems from "../hooks/useFetchMenuItems";
import MenuItem from "../components/MenuItem";

const Home = ({ navigation }) => {
	const { menuItems, loading, error } = useFetchMenuItems(
		"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
	);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const filteredMenuItems = menuItems
		.filter((item) =>
			selectedCategory ? item.category === selectedCategory : true
		)
		.filter(
			(item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);

	const categories = ["starters", "mains", "desserts", "drinks"];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View />
				<Image
					source={require("../assets/Logo.png")}
					style={styles.logo}
				/>
				<TouchableOpacity
					onPress={() => navigation.navigate("Profile")}
				>
					<Image
						source={require("../assets/Profile.png")}
						style={styles.profileImage}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>Little Lemon</Text>
				<View style={styles.infoContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.subtitle}>Chicago</Text>
						<Text style={styles.description}>
							We are a family owned Mediterranean restaurant,
							focused on traditional recipes served with a modern
							twist.
						</Text>
					</View>

					<Image
						source={require("../assets/Hero.png")}
						style={styles.heroImage}
					/>
				</View>
				<View style={styles.searchContainer}>
					<Image
						source={require("../assets/Search.png")}
						style={styles.searchIcon}
					/>
					<TextInput
						placeholder='Search menu items'
						style={styles.searchInput}
						value={searchQuery}
						onChangeText={(text) => setSearchQuery(text)}
					/>
				</View>
			</View>
			<View style={styles.sectionTitleContainer}>
				<Text style={styles.sectionTitle}>ORDER FOR DELIVERY!</Text>
			</View>
			<View style={styles.categoryContainer}>
				{categories.map((category) => (
					<TouchableOpacity
						key={category}
						style={[
							styles.categoryButton,
							selectedCategory === category
								? styles.categoryButtonSelected
								: styles.categoryButtonUnselected
						]}
						onPress={() => {
							if (selectedCategory === category) {
								setSelectedCategory("");
							} else {
								setSelectedCategory(category);
							}
						}}
					>
						<Text
							style={[
								styles.categoryButtonText,
								selectedCategory === category
									? styles.categoryButtonTextSelected
									: styles.categoryButtonTextUnselected
							]}
						>
							{category.charAt(0).toUpperCase() +
								category.slice(1)}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			{loading && <Text>Loading...</Text>}
			{error && <Text>Error: {error.message}</Text>}

			<FlatList
				data={filteredMenuItems}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => <MenuItem item={item} />}
			/>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginVertical: -5
	},
	logo: {
		width: 150,
		height: 60,
		resizeMode: "contain"
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	title: {
		fontSize: 52,
		fontWeight: "bold",
		color: "#F4CE14",
		fontFamily: "Markazi-Medium"
	},
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	textContainer: {
		width: "60%"
	},
	subtitle: {
		fontSize: 32,
		color: "#EDEFEE",
		marginBottom: 20,
		marginTop: -10
	},
	description: {
		fontSize: 16,
		color: "#EDEFEE",
		fontFamily: "Karla-Regular"
	},
	content: {
		paddingHorizontal: 20,
		backgroundColor: "#495E57"
	},
	heroImage: {
		width: "40%",
		height: "40%",
		aspectRatio: 1,
		resizeMode: "cover",
		borderRadius: 10
	},
	sectionTitleContainer: {
		paddingHorizontal: 20,
		paddingVertical: 15
	},
	sectionTitle: {
		fontFamily: "Karla-ExtraBold",
		fontSize: 18
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#EDEFEE",
		paddingLeft: 5,
		paddingRight: 15,
		marginVertical: 20
	},
	searchIcon: {
		width: 20,
		height: 20,
		marginRight: 10
	},
	searchInput: {
		flex: 1,
		paddingVertical: 10,
		fontSize: 16,
		fontFamily: "Karla-Regular"
	},
	categoryContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingBottom: 10,
		paddingHorizontal: 10
	},
	categoryButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 20
	},
	categoryButtonSelected: {
		backgroundColor: "#F4CE14"
	},
	categoryButtonTextSelected: {
		color: "#495E57",
		fontFamily: "Karla-ExtraBold"
	},
	categoryButtonUnselected: {
		backgroundColor: "#495E57"
	},
	categoryButtonTextUnselected: {
		color: "#F4CE14",
		fontFamily: "Karla-Regular"
	},
	categoryButtonText: {
		fontSize: 14,
		fontFamily: "Karla-Regular"
	}
});
