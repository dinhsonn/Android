import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductInfoScreen = ({ route }) => {
  const { item } = route.params;
  const [productDetails, setProductDetails] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [item.id]);

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const addItemToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000); // Reset the addedToCart state after 3 seconds (adjust as needed)
  };

  return (
    <ScrollView style={styles.container}>
      {productDetails ? (
        <>
          <Image style={styles.image} source={{ uri: productDetails.image }} />
          <View style={styles.productInfo}>
            <Text style={styles.title}>{productDetails.title}</Text>
            <Text style={styles.description}>{productDetails.description}</Text>
            <Text style={styles.price}>₹{productDetails.price}</Text>
            <Text style={styles.rating}>Rating: {productDetails.rating.rate}</Text>
            <Text style={styles.stockText}>IN Stock</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      {/* Add to Cart Button */}
      <Pressable onPress={addItemToCart} style={styles.addButton}>
        {addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
      </Pressable>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    color: '#FFC72C',
    fontWeight: 'bold',
    marginTop: 10,
  },
  stockText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  backButton: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: '#4285F4',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
});

export default ProductInfoScreen;

