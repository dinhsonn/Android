  import {
      StyleSheet,
      Text,
      View,
      ScrollView,
      Pressable,
      TextInput,
      Image,
    } from "react-native";
    import React from "react";
    import { Feather } from "@expo/vector-icons";
    import { AntDesign } from "@expo/vector-icons";
    import { useDispatch, useSelector } from "react-redux";
    import Toast from 'react-native-toast-message';

    import {
      decrementQuantity,
      incementQuantity,
      removeFromCart,
      cleanCart,
    } from "../redux/CartReducer";
    import { useNavigation } from "@react-navigation/native";
    
    const Cart = () => {
      const cart = useSelector((state) => state.cart.cart);
      console.log(cart);
      const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
      const dispatch = useDispatch();
      const increaseQuantity = (item) => {
        dispatch(incementQuantity(item));
      };
      const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item));
      };
      const deleteItem = (item) => {
        dispatch(removeFromCart(item));
        Toast.show({
          type: 'success',
          text1: 'Đã xóa sản phẩm khỏi giỏ hàng',
          position: 'bottom',
        });
      };
      const proceedToBuy = () => {
        // Perform transaction logic here
        // Assuming the transaction is successful
        Toast.show({
          type: "success",
          text1: "Thanh thoán thành công!",
          position: "bottom",
        });
        // Clear the cart after successful transaction
        dispatch(cleanCart());
      };
      return (
        <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>

    
          <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Tổng số tiền : </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
          </View>
    
          <Pressable
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
            onPress={proceedToBuy}

          >
            <Text>Proceed to Buy ({cart.length}) items</Text>
          </Pressable>
    
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 16,
            }}
          />
    
          <View style={{ marginHorizontal: 10 }}>
            {cart?.map((item, index) => (
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderBottomColor: "#F0F0F0",
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                }}
                key={index}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      style={{ width: 140, height: 140, resizeMode: "contain" }}
                      source={{ uri: `http://192.168.137.244:8384/products/image/${item.image}` }}
                      />
                  </View>
    
                  <View>
                    <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                    >
                      Giá:{item?.price}
                    </Text>

                  </View>
                </Pressable>  
    
                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7,
                    }}
                  >
                    {item?.quantity > 1 ? (
                      <Pressable
                        onPress={() => decreaseQuantity(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => deleteItem(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </Pressable>
                    )}
    
                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{item?.quantity}</Text>
                    </Pressable>
    
                    <Pressable
                      onPress={() => increaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Feather name="plus" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Xóa sản phẩm</Text>
                  </Pressable>
                </Pressable>

              </View>
            ))}
          </View>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </ScrollView>
      );
    };
    
    export default Cart;
    
    const styles = StyleSheet.create({});
    