import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.137.174:8384/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        navigation.navigate('Home');
        Alert.alert('Đăng nhập thành công');
      } else {
        const errorText = await response.text();
        Alert.alert('Đăng nhập thất bại', errorText);
      }
    } catch (error) {
      console.error('Error occurred while trying to log in:', error);
      Alert.alert('Error occurred while trying to log in. ' + error.message);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tài khoản"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </Pressable>
      <Pressable onPress={navigateToRegister}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#FEBE10',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 12,
    color: 'gray',
    fontSize: 16,
  },
});

export default LoginScreen;
