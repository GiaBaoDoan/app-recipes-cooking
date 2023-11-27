import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helpers/Image";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import {
  ChevronLeftIcon,
  ClockIcon,
  HeartIcon,
  UsersIcon,
  FireIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
const RecipesDetail = (props) => {
  const navigation = useNavigation();
  const item = props.route.params;
  const [isLove, setIsLove] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRecipes(item.idMeal);
  }, []);

  const renderIngredients = (meals) => {
    let mealsArray = [];
    for (let i = 1; i <= 20; i++) {
      if (meals[`strIngredient${i}`]) {
        mealsArray.push(meals["strIngredient" + i]);
      }
    }
    return mealsArray;
  };
  renderIngredients(recipes);
  const listItem = [
    {
      icon: <ClockIcon color="#454545" strokeWidth={3} />,
      num: "35",
      text: "Mins",
    },
    {
      icon: <UsersIcon fill="#454545" color="#454545" strokeWidth={3} />,
      num: "03",
      text: "Servings",
    },
    {
      icon: <FireIcon color="#454545" strokeWidth={3} />,
      num: "103",
      text: "Cal",
    },
    {
      icon: <Square3Stack3DIcon color="#454545" strokeWidth={3} />,
      num: "102",
      text: "Easy",
    },
  ];
  const getRecipes = async (id) => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (res && res.data) {
        setRecipes(res.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    console.log(url);
    const match = url.match(regex);
    if (match && match[1]) {
      console.log("match", match);
      console.log("match1", match[1]);
      return match[1];
    }
    return null;
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: "98%",
            height: 350,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      {/* back button */}
      <View
        style={{
          position: "absolute",
          paddingTop: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Animated.View
            entering={FadeIn.delay(200).duration(900).springify().damping()}
            style={{
              backgroundColor: "white",
              padding: 8,
              marginLeft: 15,
              borderRadius: 999,
            }}
          >
            <ChevronLeftIcon
              size={20}
              color="#fbbf24"
              strokeWidth={4.5}
            ></ChevronLeftIcon>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLove(!isLove)}>
          <Animated.View
            entering={FadeIn.delay(200).duration(900).springify().damping()}
            style={{
              backgroundColor: "white",
              padding: 8,
              marginRight: 15,
              borderRadius: 999,
            }}
          >
            <HeartIcon
              size={20}
              color={`${isLove ? "red" : "gray"}`}
              fill={`${isLove ? "red" : "gray"}`}
              strokeWidth={4.5}
            ></HeartIcon>
          </Animated.View>
        </TouchableOpacity>
      </View>
      {/* Loading */}
      <View style={{}}>
        {loading ? (
          <Loading />
        ) : (
          <View
            style={{
              paddingTop: 16,
              paddingHorizontal: 10,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(200)
                  .duration(300)
                  .springify()
                  .damping()}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#454545", fontSize: 22 }}
                >
                  {recipes.strMeal}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "medium",
                    color: "#454545",
                  }}
                >
                  {recipes.strArea}
                </Text>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(300)
                  .duration(500)
                  .springify()
                  .damping()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                {listItem.map((item) => {
                  return (
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 999,
                        backgroundColor: "gold",
                        paddingTop: 6,
                        paddingBottom: 20,
                        paddingHorizontal: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 999,
                        }}
                      >
                        {item.icon}
                      </View>

                      <View style={{ marginTop: 5 }}>
                        <Text style={{ textAlign: "center" }}>{item.num}</Text>
                      </View>
                      <View style={{ marginTop: 2 }}>
                        <Text style={{ fontSize: 10 }}>{item.text}</Text>
                      </View>
                    </View>
                  );
                })}
              </Animated.View>
            </View>
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(500)
                .springify()
                .damping()}
            >
              <Text
                style={{ color: "#454545", fontSize: 22, fontWeight: "bold" }}
              >
                Ingredients
              </Text>
              <View>
                {renderIngredients(recipes).map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: "gold",
                          borderRadius: 999,
                        }}
                      ></View>
                      <View style={{ marginLeft: 10, flexDirection: "row" }}>
                        <Text
                          style={{
                            color: "#454545",
                            fontWeight: "bold",
                            marginRight: 10,
                          }}
                        >
                          {recipes[`strMeasure${index + 1}`]}
                        </Text>
                        <Text>{item}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Animated.View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ color: "#454545", fontSize: 22, fontWeight: "bold" }}
              >
                Intructions
              </Text>
              <Text style={{ fontSize: 16, marginTop: 20 }}>
                {recipes?.strInstructions}
              </Text>
            </View>
            {recipes.strYoutube && (
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{ color: "#454545", fontSize: 22, fontWeight: "bold" }}
                >
                  Recipes video
                </Text>
                <View style={{ marginTop: 20 }}>
                  <YoutubeIframe
                    videoId={getYoutubeVideoId(recipes.strYoutube)}
                    height={400}
                  ></YoutubeIframe>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipesDetail;

const styles = StyleSheet.create({});
