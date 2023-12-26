import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";


const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const navigateToDetails = () => {
    navigation.navigate("Info", { item });
  };

  return (
    <Pressable style={styles.productContainer} onPress={navigateToDetails}>
      <View style={styles.product}>
        <Image
          style={styles.image}
          source={{ uri: item?.image }}
        />

        <Text numberOfLines={1} style={styles.title}>
          {item?.title}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item?.price}</Text>
          <Text style={styles.rating}>{item?.rating?.rate} ratings</Text>
        </View>

        <Pressable
          onPress={() => addItemToCart(item)}
          style={styles.addButton}
        >
          {addedToCart ? (
            <Text>Thêm thành công</Text>
          ) : (
            <Text>Thêm vào giỏ hàng</Text>
          )}
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 25,
  },
  product: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  title: {
    width: "100%",
    marginTop: 10,
  },
  priceContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  rating: {
    color: "#FFC72C",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default ProductItem;
