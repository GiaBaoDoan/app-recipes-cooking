import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipesDetail from "./src/screens/RecipesDetailScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          component={HomeScreen}
          name="HomeScreen"
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          component={RecipesDetail}
          name="RecipesDetail"
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({});
