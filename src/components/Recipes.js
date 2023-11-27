import { Pressable, StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constant";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import Loading from "./Loading";
import { CachedImage } from "../helpers/Image";
import { useNavigation } from "@react-navigation/native";

const Recipes = ({ categories, meals }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontSize: 30, color: "#454545" }}>Recipes</Text>
      <View>
        {meals.length == 0 || categories.length == 0 ? (
          <Loading />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipesCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

const RecipesCard = ({ item, index, navigation }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(100 * index)
        .duration(600)
        .springify()}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipesDetail", { ...item })}
        style={{
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
          paddingRight: 12,
          paddingTop: 8,
        }}
      >
        <Image source={{ uri: item.strMealThumb }}></Image>
        <CachedImage
          sharedTransitionTag={item.strMeal}
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? 150 : 250,
            borderRadius: 20,
          }}
        />
        <Text style={{ margin: 2, color: "#454545" }}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
export default Recipes;
const styles = StyleSheet.create({});
