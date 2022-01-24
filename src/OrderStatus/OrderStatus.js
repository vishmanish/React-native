/** @format */

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import Colors from "../Constants/Colors";


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;






const OrderStatus = (props) => {
  // Dummy Data



  const [address, setaddress] = useState('')

  useEffect(() => {
    displayData();
  }, []);



  const displayData = async () => {
    try {

      let address = await AsyncStorage.getItem('address');
      let parsed1 = JSON.parse(address);

      if (parsed1 == null) {

      } else {
        setaddress(parsed1.address);

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: 'rgb(57,193,183)' }}
    >
      <View style={{ margin: 3 * vw, alignItems: "flex-start", backgroundColor: Colors.white, borderRadius: 1 * vh, padding: 1 * vh }}>
        <Text style={styles.newTitle}>Order BDT1574Y</Text>
        <Text style={[styles.titles, { fontFamily: "Muli-Bold" }]}>
          Washing And Folding
      </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.itemdesc}>Shirt</Text>
          <Text style={styles.itemdesc}>2</Text>
          <Text style={styles.itemdesc}>BDT 110</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.itemdesc}>T-Shirt</Text>
          <Text style={styles.itemdesc}>2</Text>
          <Text style={styles.itemdesc}>BDT 110</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.itemdesc}>Gown</Text>
          <Text style={styles.itemdesc}>2</Text>
          <Text style={styles.itemdesc}>BDT 110</Text>
        </View>
        <View style={{ flexDirection: "row" , borderTopWidth: 0.1 * vh }}>
          <Text style={[styles.itemdesc]}>Subtotal</Text>
          <Text style={styles.itemdesc}></Text>
          <Text style={[styles.itemdesc]}>BDT 330</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.itemdesc]}>Delivery</Text>
          <Text style={styles.itemdesc}></Text>
          <Text style={[styles.itemdesc]}>BDT 50</Text>
        </View>
        <View style={{ flexDirection: "row"}}>
          <Text style={[styles.itemdesc, { fontFamily: "Muli-Bold" }]}>Total</Text>
          <Text style={styles.itemdesc}></Text>
          <Text style={[styles.itemdesc, { fontFamily: "Muli-Bold" }]}>BDT 380</Text>
        </View>
      </View>

      <View style={{ backgroundColor: Colors.white, borderRadius: 1 * vh, padding: 1 * vh, margin: 3 * vw, alignItems: "flex-start", }}>
      <View style={{flexDirection: "row" }}>
        <Text style={[styles.titles, { fontFamily: "Muli-Bold", width: 30 * vw }]}>Pick Up</Text>
        <Text style={[styles.titles, { fontFamily: "Muli-Bold", width: 30 * vw }]}></Text>
        <Text style={[styles.titles, { fontFamily: "Muli-Bold", width: 30 * vw }]}>Delivery</Text>

         </View>
         <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.itemdesc}>Wed, May 24</Text>
          <Text style={styles.itemdesc}>9AM - 2PM</Text>
        </View>
        <View>
          <Text style={styles.itemdesc}></Text>
        </View>
        <View>

          <Text style={styles.itemdesc}>Thu, May 25</Text>
          <Text style={styles.itemdesc}>9AM - 2PM</Text>
        </View>
      </View>
      <View style={{  alignItems: "flex-start", backgroundColor: Colors.white, borderRadius: 1 * vh}}>
        <Text style={[styles.titles, { fontFamily: "Muli-Bold" }]}>Pick Up And Delivery Address</Text>
      </View>
      <View style={{ marginVertical: 2 * vw }}>
        <Text style={[styles.titles, { fontFamily: "Muli-Bold" }]}>Home</Text>

        <Text style={styles.titles}>{address ? address.replace("null,", "") : ""}</Text>
      </View>
      </View>
      
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  newTitle: {
    fontFamily: "Muli-Bold",
    fontSize: 3 * vh,
    color: Colors.DARKGRAY
  },
  itemdesc: { color: Colors.black, padding: 1 * vw, width: 30 * vw, textAlign: "left", fontFamily: "Muli", fontSize: 2 * vh },
  titles: { color: Colors.black, padding: 1 * vw, textAlign: "left", fontFamily: "Muli", fontSize: 2 * vh },

  container: {
    flex: 1,
    backgroundColor: Colors.PASTELBLUE,
  },
  rowView: {
    borderBottomWidth: 0.1 * vh,
    flexDirection: "row",
    alignItems: "center",
    padding: 1.5 * vh,
  },
  rowImg: {
    height: 4 * vh,
    width: 4 * vh,
  },
  titleText: { fontFamily: "Muli-Bold", fontSize: 2 * vh, width: 75 * vw },
  rowView1: { backgroundColor: Colors.white, height: 6 * vh, width: 6 * vh, borderRadius: 3 * vh, marginHorizontal: 2 * vh, alignItems: "center", justifyContent: "center" }
});

export default OrderStatus;
