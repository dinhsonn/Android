import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8384/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        // Đăng nhập thành công, bạn có thể lưu thông tin người dùng vào trạng thái ứng dụng hoặc AsyncStorage
        // sau đó chuyển hướng đến màn hình chính hoặc thực hiện các hành động khác
        navigation.navigate("Home"); // Thay "Home" bằng tên màn hình chính của bạn
      } else {
        Alert.alert("Đăng nhập thất bại", "Tên người dùng hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop: 50 }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 10,
              color: "#041E42",
            }}
          >
            Đăng nhập vào tài khoản của bạn
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={{
                marginLeft: 10,
                color: "gray",
                marginVertical: 10,
                width: 200,
                fontSize: username ? 16 : 16,
              }}
              placeholder="Nhập tên đăng nhập của bạn"
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#D0D0D0",
              paddingVertical: 4,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                marginLeft: 10,
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Nhập mật khẩu của bạn"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Giữ tôi đăng nhập</Text>

          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Quên mật khẩu
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </Pressable>

        <Pressable>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Bạn chưa có tài khoản? Đăng ký
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
