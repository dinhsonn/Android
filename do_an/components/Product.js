import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { FlatList, StyleSheet, Text, View, Image, Pressable } from "react-native";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from "../redux/CartReducer";

const Product = forwardRef((props, ref) => {
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const [products, setProducts] = useState([]);
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

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://192.168.137.174:8384/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useImperativeHandle(ref, () => ({
    showToast: (config) => Toast.show(config),
  }));

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("ProductDetail", { item: item })}
            style={{
              backgroundColor: "lightgray",
              shadowColor: "#000",
              width: 140,
              height: 280,
              shadowOpacity: 0.1,
              borderRadius: 5,
              marginVertical: 16,
              alignItems: "center",
              paddingHorizontal: 8,
              paddingVertical: 26,
            }}
          >
            
            <Image
              source={{ uri: `http://192.168.137.174:8384/products/image/${item.image}` }}
              style={{ width: 140, height: 130, resizeMode: "cover" }}
            />
            <Text style={{ marginEnd:70}}>{item.name}</Text>

            <View style={{ flexDirection: "row", marginTop: 8,marginEnd:70 }}>
              <Text>{item.price}đ</Text>
            </View>
            
            <Pressable
              onPress={() => addItemToCart(item)}
              style={{
                marginTop: 15,
                backgroundColor: "#FFFFFF",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                width: 120,
                height: 40
              }}
            >
                <Text>Thêm sản phẩm</Text>
            </Pressable>
            <Toast ref={(ref) => Toast.setRef(ref)} />

          </Pressable>
          
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default Product;

const styles = StyleSheet.create({});
