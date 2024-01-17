import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet,Pressable } from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const SearchItem = () => {
    const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://192.168.137.174:8384/products`);
        setProducts(response.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Không thể lấy dữ liệu sản phẩm");
      }
    };

    if (keyword !== "") {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [keyword]);

  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase() === keyword.toLowerCase()
  );

  return (
    
    <View style={styles.container}>
                <Pressable style={{ marginTop:20 }} onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-circle-left"} size={28} color="black" />
        </Pressable>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
      </View>

      <View style={styles.resultsContainer}>
        {loading && <Text>Đang tìm kiếm...</Text>}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && filteredProducts.length === 0 && <Text>Không có sản phẩm nào.</Text>}

        {!loading && filteredProducts.length > 0 && (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Text>{item.name}</Text>
                {/* Hiển thị thông tin sản phẩm khác theo yêu cầu của bạn */}
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#808080",
  },
  resultsContainer: {
    marginTop: 16,
  },
  errorText: {
    marginTop: 16,
    color: "red",
  },
  productItem: {
    marginTop: 8,
  },
});

export default SearchItem;
