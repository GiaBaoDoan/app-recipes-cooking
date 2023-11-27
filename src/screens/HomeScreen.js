import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {} from "react-native-heroicons/outline";
import Categories from "../components/CategoriesIndex";
import axios from "axios";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [active, setActive] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const getAllListedMeal = async () => {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (res && res.data) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getRecipes = async (category = "Beef") => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (res && res.data) {
        setMeals(res.data.meals);
      } else {
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handelCategory = (category) => {
    setActive(category);
    getRecipes(category);
  };
  useEffect(() => {
    getAllListedMeal();
    getRecipes();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ padding: 20 }}
      >
        {/* avatar and bellicon */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/img/avatar.png")}
          ></Image>
          <BellIcon size={30} color="gray" />
        </View>
        {/* Content */}
        <View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "#474545" }}>Hello, GiaBao!</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#474545", fontSize: 38, fontWeight: 500 }}>
              Make your own food,
            </Text>
            <Text style={{ color: "#474545", fontSize: 38, fontWeight: 500 }}>
              stay at <Text style={{ color: "	rgb(252, 220, 40)" }}>home</Text>
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              marginTop: 30,
              padding: 4,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 999,
            }}
          >
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              style={{ flex: 1, marginLeft: 10 }}
            ></TextInput>
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 999,
              }}
            >
              <MagnifyingGlassIcon strokeWidth={3} color="gray" size={16} />
            </View>
          </View>
          {/* catiesgory */}
          <View>
            <Categories
              categories={categories}
              active={active}
              handelCategory={handelCategory}
            />
          </View>
          {/* recipes */}
          <View>
            <Recipes meals={meals} categories={categories} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
