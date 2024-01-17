import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View, Pressable,ScrollView  } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import Toast from 'react-native-toast-message';

const ProductDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
    Toast.show({
      type: 'success',
      text1: 'Thêm thành công',
      position: 'bottom',
    });
  };

  return (
    <View style={{ backgroundColor: item.color, flex: 1 }}>
      <SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16, marginTop: 20 }}>
        <Pressable style={{ flex: 1,marginTop:20 }} onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-circle-left"} size={28} color="black" />
        </Pressable>
        <FontAwesome name={"heart-o"} size={28} color="white" />
      </SafeAreaView>

      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          marginTop: 140,
          borderTopLeftRadius: 56,
          borderTopRightRadius: 56,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            height: 300,
            width: 300,
            position: "absolute",
            top: -150,
          }}
        >
          <Image
            source={{ uri: `http://192.168.137.174:8384/products/image/${item.image}` }}
            style={{
              marginTop: 40,
              width: "100%",
              height: "120%",
            }}
          />
        </View>

        <Text style={{ marginTop: 250, fontSize: 20, fontWeight: "bold", marginEnd: 50 }}>
          Tên sản phẩm: {item.name}
        </Text>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 20, marginVertical: 16, marginEnd: 80 }}>
              Mô tả: {item.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            ></View>
          </ScrollView>
        </View>
        <Pressable
          onPress={() => addItemToCart(item)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text>Thêm vào giỏ hàng</Text>
        </Pressable>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
