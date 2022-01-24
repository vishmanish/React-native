/** @format */

import React from "react";
import { Image, Dimensions, Text, View ,TouchableOpacity} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Home/Home";



import { icons, COLORS } from "../Constants";


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: 9 * vh,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
};

const Tabs = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case "Home":
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Text style={{ color: tintColor, textAlign: "center" }}>
                    Home
                  </Text>
                </View>
              );
            case "Search":
              return (
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                 onPress={()=>props.navigation.navigate("MyOrders")}
                >
                  <Image
                    source={require("../../assets/icons/icons-order.png")}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Text style={{ color: tintColor, textAlign: "center" }}>
                    My Orders
                  </Text>
                </TouchableOpacity>
              );
            case "Bookmark":
              return (
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                  onPress={()=>props.navigation.navigate("Pickup")}
                >
                  <Image
                    source={require("../../assets/icons/icons-address.png")}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Text style={{ color: tintColor, textAlign: "center" }}>
                    Pickup
                  </Text>
                </TouchableOpacity>
              );
            case "Wallet":
              return (
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                  onPress={()=>props.navigation.navigate('Profile')}
                >
                  <Image
                    source={require("../../assets/icons/persons.png")}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Text style={{ color: tintColor, textAlign: "center" }}>
                    Profile
                  </Text>
                </TouchableOpacity>
              );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="Bookmark" component={Home} />
      <Tab.Screen name="Wallet" component={Home} />
    </Tab.Navigator>
  );
};

export default Tabs;
