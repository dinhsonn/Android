import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import store from "./store";
import { ViewPropTypes } from "deprecated-react-native-prop-types"; // Import ViewPropTypes from the deprecated package

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StackNavigator />
        <ModalPortal />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
