import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + 40)),
      100
    );
    setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + 28)),
      300
    );
    setTimeout(() => navigation.navigate("HomeScreen"), 2500);
  }, []);
  return (
    <View
      className="bg-amber-500"
      style={{
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange",
      }}
    >
      <StatusBar style="white" />
      <Animated.View
        style={{
          borderRadius: 9999,
          backgroundColor: "rgba(255,255,255,0.2)",
          padding: ring1Padding,
        }}
      >
        <Animated.View
          style={{
            borderRadius: 9999,
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: ring2Padding,
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../../assets/img/welcome.png")}
          ></Image>
        </Animated.View>
      </Animated.View>
      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            letterSpacing: 1.6,
            fontSize: 60,
          }}
        >
          Foody
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "300",
            letterSpacing: 1.6,
            fontSize: 14,
            marginTop: 10,
          }}
        >
          Food is always rights
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
