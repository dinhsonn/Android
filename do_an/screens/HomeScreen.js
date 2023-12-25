import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";

import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const HomeScreen = () => {
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <SliderBox
              images={images}
              autoPlay
              circleLoop
              dotColor={"#13274F"}
              inactiveDotColor="#90A4AE"
              ImageComponentStyle={{ width: "100%" }}
            />
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              zIndex={open ? 1000 : 0}
              zIndexInverse={open ? 0 : 1000}
            />
          </>
        }
        renderItem={({ item }) => <ProductItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderStyles: {
  },
});

export default HomeScreen;
