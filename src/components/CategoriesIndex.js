import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { categoryData } from "../constant/index";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { CachedImage } from "../helpers/Image";
const Categories = (props) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {props.categories?.map((cat, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => props.handelCategory(cat.strCategory)}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 18,
                }}
              >
                <View
                  style={{
                    borderRadius: 999,
                    padding: 6,
                    marginRight: 6,
                    backgroundColor:
                      props.active == cat.strCategory
                        ? "gold"
                        : "rgba(0,0,0,0.1)",
                  }}
                >
                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: 50, height: 50, borderRadius: 999 }}
                  />
                </View>
                <Text style={{ color: "#474545", marginTop: 8 }}>
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
