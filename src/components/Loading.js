import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Loading = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        {...props}
        size="large"
        style={{ marginTop: 20 }}
      ></ActivityIndicator>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
