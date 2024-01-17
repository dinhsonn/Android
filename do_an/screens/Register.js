import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const navigation = useNavigation();
  
    const handleRegister = async () => {
        try {
          const response = await axios.post('http://192.168.137.174:8384/api/v1/users/add', {
            name,
            username,
            password,
          });
      
          if (response.status === 201) {
            console.log('User registered:', response.data);
            Alert.alert('Đăng ký thành công');
          } else {
            console.log('User registration failed:', response.data);
            Alert.alert('Đăng ký thất bại');
          }
        } catch (error) {
          console.error('Error registering user:', error.response?.data || error.message);
          Alert.alert('Error', 'Failed to register. Please try again.');
        }
      };
      

      
    return (
        <View style={{ flex: 1, alignItems: "center" }}>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{

                fontSize: 17,
                fontWeight: "bold",
                marginTop: 100,
                color: "#041E42",
              }}
            >
              Đăng ký
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
               }}
            >
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                    marginLeft: 10,
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: name ? 16 : 16,
                  }}
                placeholder="Tên người dùng"
              />
            </View>
  
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
                  color: "gray",
                  marginVertical: 10,
                  marginLeft: 10,
                  fontSize: username ? 16 : 16,
                }}
                placeholder="Tên đăng nhập"
              />
            </View>
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
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginLeft: 10,
                  marginVertical: 10,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Mật khẩu"
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }} />
  
          <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Đăng ký
          </Text>
        </Pressable>
  
        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
            Đã có tài khoản?<Text style={{ textAlign: 'center', color: 'blue', fontSize: 16 }}> Đăng nhập</Text>
          </Text>
        </Pressable>
        </View>

    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({});
  