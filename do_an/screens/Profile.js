import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
  } from "react-native";
  import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { Ionicons, AntDesign } from "@expo/vector-icons";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const Profile = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#00CED1",
        },
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginRight: 12,
            }}
          >
  
            <AntDesign name="search1" size={24} color="black" />
          </View>
        ),
      });
    }, []);
    const [user, setUser] = useState();
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `http://192.168.137.174:8384/api/v1/users/login/${id}`
          );
          const { user } = response.data;
          setUser(user);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchUserProfile();
    }, []);
    const logout = () => {
      clearAuthToken();
    };
    const clearAuthToken = async () => {
      await AsyncStorage.removeItem("authToken");
      console.log("auth token cleared");
      navigation.replace("Login");
    };
    return (
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Welcome
        </Text> 
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <Pressable
            onPress={logout}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Đăng xuất</Text>
          </Pressable>
        </View>

      </ScrollView>
    );
  };
  
  export default Profile;
  
  const styles = StyleSheet.create({});
  