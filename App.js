/** @format */

import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-community/async-storage';
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import store from "./src/store/store";
// screens

import HomeNavigator from "./src/navigator/HomeNavigator";
// extra screens


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const fetchFonts = (props) => {
  return Font.loadAsync({
    Muli: require("./assets/fonts/Muli-Regular.ttf"),
    "Muli-Bold": require("./assets/fonts/Muli-Bold.ttf"),
    "Muli-ExtraBold": require("./assets/fonts/Muli-ExtraBold.ttf"),
    
  });
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerTitle: (props) => <LogoTitle {...props} />,
};

function LogoTitle() {
  return (
   <View></View>
  );
}

const App = () => {
  const [isFirstLaunch,setIsfirstLaunch] = React.useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoggedIn,setisLoggedIn] = React.useState('no');

  useEffect(() => {
    checkLogIn(),
    checkLaunched()
    
  }, []);

 

  const checkLogIn = async () => {
    try {
      let loggedCheck = await AsyncStorage.getItem('loggedIn')
      if (loggedCheck !== null) {
        setisLoggedIn(loggedCheck)
      }
    } catch (e) {
      console.log(e)
    }
  }


  const checkLaunched = () => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null || typeof value == "undefined"){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsfirstLaunch(true)
      }else{
        setIsfirstLaunch(false);
      }
    })
  }


  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  if(isFirstLaunch == null){
return null;
  }else if(isFirstLaunch == true){
    return (
      <Provider store={store}>
        <HomeNavigator onboard="true" islogged={isLoggedIn}/>
      </Provider>
    );
  }else{
    return (
      <Provider store={store}>
        <HomeNavigator onboard="false" islogged={isLoggedIn}/>
      </Provider>
    );
  }
};

export default () => {
  return <App />;
};
