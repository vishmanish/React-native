/** @format */

import * as React from "react";
import {
  Platform,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "../../src/Onboarding/Onboarding";
import LoginSignUp from "../../src/LoginSignUp/LoginSignUp";
import SignUp from "../../src/SignUp/SignUp";
import WhyUs from "../../src/WhyUs/WhyUs";
import PricingTerms from "../../src/PricingTerms/PricingTerms";
import GooglePlacesSearch from "../../src/GooglePlaceSearch/GooglePlaceSearch";
import Profile from "../../src/Profile/Profile";
import Pickup from "../../src/Pickup/Pickup";
import MyOrders from "../../src/MyOrders/MyOrders";
import Payment from "../../src/Payment/Payment";
import WashAndIron from "../../src/Categories/WashAndIron";
import ContactUs from "../../src/ContactUs/ContactUs";
import DryCleaning from "../../src/Categories/DryCleaning";
import Iron from "../../src/Categories/Iron";
import Wash from "../../src/Categories/Wash";
import PremiumWashIron from "../../src/Categories/PremiumWashIron";
import SelectAddress from "../../src/SelectAddress/SelectAddress";
import OrderDetails from "../../src/OrderDetails/OrderDetails";
import PackagesDetails from "../../src/PackagesDetails/PackagesDetails";
import OrderStatus from "../../src/OrderStatus/OrderStatus";
import ForgotPassword from "../../src/ForgotPassword/ForgotPassword";
import OtpScreen from "../../src/OtpScreen/OtpScreen";
// extra screens
import Tabs from "../../src/navigator/tabs";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { icons, COLORS, SIZES } from "../Constants";
import CustomSidebarMenu from '../Components/CustomSidebarMenu';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={require("../../assets/icons/bar_menu_icon.png")}
          style={{
            width: 3 * vh,
            height: 3 * vh,
            marginLeft: 5 * vw,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};



const defaultNavOptions = {
  title: null,
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerTitleAlign: "center",

  headerTitle: (props) => <LogoTitle {...props} />,
};

function LogoTitle() {
  return (
    <Text style={{fontFamily:"Muli-Bold",fontSize:3*vh}}>Steam</Text>
  );
}



const App = (props) => {

  function firstScreenStack({ navigation }) {
  console.log("ddddd",props.islogged)
    return (
      <Stack.Navigator initialRouteName={props.onboard == "true" ? "Onboarding":props.islogged == "yes" ? "Home":"LoginSignUp"}>
        {/* Screens */}
        <Stack.Screen
          name="LoginSignUp"
          component={LoginSignUp}
          options={{
            headerShown: false,
           
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
           
          }}
        />
        <Stack.Screen
          name="WhyUs"
          component={WhyUs}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="PricingTerms"
          component={PricingTerms}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="GooglePlacesSearch"
          component={GooglePlacesSearch}
          options={{
            headerShown: true,
            headerTitle:"Search Location"
          }}
        />

        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              headerTitle:"My Profile"
            }}
          />

          <Stack.Screen
            name="Pickup"
            component={Pickup}
            options={{
              headerShown: true,
              headerTitle:"Awaiting Pickup"
            }}
          />

          <Stack.Screen
            name="MyOrders"
            component={MyOrders}
            options={{
              headerShown: true,
              headerTitle:"My Orders"
            }}
          />

          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: true,
              headerTitle:"Payments"
            }}
          />

          <Stack.Screen
            name="WashAndIron"
            component={WashAndIron}
            options={{
              headerShown: true,
              headerTitle:"Wash and Iron"
            }}
          />

          <Stack.Screen
            name="DryCleaning"
            component={DryCleaning}
            options={{
              headerShown: true,
              headerTitle:"Dry Cleaning"
            }}
          />

          <Stack.Screen
            name="Iron"
            component={Iron}
            options={{
              headerShown: true,
              headerTitle:"Iron Only"
            }}
          />

          <Stack.Screen
            name="Wash"
            component={Wash}
            options={{
              headerShown: true,
              headerTitle:"Wash Only"
            }}
          />

        <Stack.Screen
            name="PremiumWashIron"
            component={PremiumWashIron}
            options={{
              headerShown: true,
              headerTitle:"Premium Wash & Iron"
            }}
          />

        <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{
              headerShown: true,
              headerTitle:"OTP Verification"
            }}
          />

          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              headerShown: false,
              
            }}
          />

          <Stack.Screen
            name="SelectAddress"
            component={SelectAddress}
            options={{
              headerShown: true,
              headerTitle:"Your Cart"
            }}
          />

          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{
              headerShown: true,
              headerTitle:"Order Details"
            }}
          />

         <Stack.Screen
            name="PackagesDetails"
            component={PackagesDetails}
            options={{
              headerShown: true,
              headerTitle:"Service (Per Kg)"
            }}
          />
          
          <Stack.Screen
            name="OrderStatus"
            component={OrderStatus}
            options={{
              headerShown: true,
              headerTitle:"Order Status"
            }}
          />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
           
          }}
        />

        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTitleAlign: "center",
  
            headerTitle: (props) => <LogoTitle {...props} />,
           
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
           
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
            
          }}
        />
  
  
  
        
        {/* Tabs */}
       
      </Stack.Navigator>
      
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
         
        <Drawer.Screen
         name={"Home"}
          options={{ drawerLabel: "Home" }}
          component={firstScreenStack}
        />
         <Drawer.Screen
         name={"whyUs"}
          options={{ drawerLabel: "Why Us ?" }}
          component={WhyUs}
        />
        <Drawer.Screen
         name={"PricingTerms"}
          options={{ drawerLabel: "Pricing Terms" }}
          component={PricingTerms}
        />
        <Drawer.Screen
         name={"ContactUs"}
          options={{ drawerLabel: "Contact Us" }}
          component={ContactUs}
        />
        <Drawer.Screen
         name={"Logout"}
          options={{ drawerLabel: "Logout" }}
          component={LoginSignUp}
        />
      </Drawer.Navigator>
    </NavigationContainer>

    // <NavigationContainer theme={theme}
    //   >
    //         <Stack.Navigator
    //             initialRouteName={'Onboarding'}
    //         >
    //             {/* Screens */}
    //             <Stack.Screen
    //                 name="Onboarding"
    //                 component={Onboarding}
    //                 options={{
    //                     headerShown:false
    //                     // title: null,
    //                     // headerStyle: {
    //                     //     backgroundColor: COLORS.white
    //                     // },
    //                     // headerLeft: null,
    //                     // headerRight: () => (
    //                     //     <TouchableOpacity
    //                     //         style={{ marginRight: SIZES.padding }}
    //                     //         onPress={() => console.log("Pressed")}
    //                     //     >
    //                     //         <Image
    //                     //             source={icons.barMenu}
    //                     //             resizeMode="contain"
    //                     //             style={{
    //                     //                 width: 25,
    //                     //                 height: 25,
    //                     //             }}
    //                     //         />
    //                     //     </TouchableOpacity>
    //                     // ),
    //                 }}
    //             />

    //             <Stack.Screen
    //                 name="DestinationDetail"
    //                 component={DestinationDetail}
    //                 options={{ headerShown: false }}
    //             />

    //             <Stack.Screen
    //                 name="FlightBooking"
    //                 component={FlightBooking}
    //                 options={{ headerShown: false }}
    //             />

    //             {/* Tabs */}
    //             < Stack.Screen
    //                 name="Home"
    //                 component={Tabs}

    //                 options={{
    //                    title: null,
    //                     headerStyle: {
    //                         backgroundColor: COLORS.white
    //                     },
    //                     headerTitleAlign: "center",

    //                     headerTitle: (props) => <LogoTitle {...props} />,
    //                     headerLeft: ({ onPress }) => (
    //                         <TouchableOpacity
    //                             style={{ marginLeft: SIZES.padding }}
    //                             onPress={onPress}
    //                         >
    //                             <Image
    //                                 source={icons.back}
    //                                 resizeMode="contain"
    //                                 style={{
    //                                     width: 3*vh,
    //                                     height: 3*vh,
    //                                 }}
    //                             />
    //                         </TouchableOpacity>
    //                     ),
    //                     headerRight: () => (
    //                         <TouchableOpacity
    //                             style={{ marginRight: SIZES.padding }}
    //                             onPress={() => console.log("Menu")}
    //                         >
    //                             <Image
    //                                 source={require('../../assets/icons/bar_menu_icon.png')}
    //                                 resizeMode="contain"
    //                                 style={{
    //                                     width: 3*vh,
    //                                     height: 3*vh,
    //                                 }}
    //                             />
    //                         </TouchableOpacity>
    //                     ),
    //                }}
    //             />

    //         </Stack.Navigator>
    //     </NavigationContainer >
  );
};
export default App;
// https://github.com/react-navigation/react-navigation/issues/1122
