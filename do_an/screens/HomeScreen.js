import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Category from "../components/Category";
import Product from "../components/Product";


const HomeScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>

			<View style={{ marginTop: 25 }}>
			<Search  icon="search" placeholder={""} />
			</View>
			<View style={{ marginTop: 22 }}>
				<Text style={{ fontSize: 15, fontWeight: "bold" }}>Danh mục sản phẩm</Text>
			</View>
			<View style={{ marginTop: 10, flex: 1 }}>
				<Product />
			</View>

		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
