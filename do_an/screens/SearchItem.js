// SearchItem.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from "react-native";
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

        const response = await axios.get(`http://192.168.137.244:8384/products`);
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
    (product) => product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const navigateToProductDetail = (productName) => {
    const selectedProduct = products.find((product) => product.name === productName);
    if (selectedProduct) {
      navigation.navigate("ProductDetail", { item: selectedProduct });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-circle-left"} size={28} color="black" />
      </Pressable>
      <Text>Tìm kiếm sản phẩm</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
      </View>

      <View style={styles.resultsContainer}>
        {loading && <Text style={styles.loadingText}>Đang tìm kiếm...</Text>}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && filteredProducts.length === 0 && (
          <Text style={styles.noResultsText}>Không có sản phẩm nào.</Text>
        )}

        {!loading && filteredProducts.length > 0 && (
          <View>
            <Text style={styles.searchResultsText}>Kết quả tìm kiếm:</Text>
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.productItem}
                  onPress={() => navigateToProductDetail(item.name)}
                >
                  <Text style={styles.productName}>{item.name}</Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  goBackButton: {
    marginTop: 20,
  },
  inputContainer: {
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 16,
  },
  noResultsText: {
    fontSize: 16,
    color: "#555",
    marginTop: 16,
  },
  productItem: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
  },
});

export default SearchItem;
