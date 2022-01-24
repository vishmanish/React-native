/** @format */

import { StatusBar } from "expo-status-bar";
import React, { useEffect ,useState} from "react";
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


const MyOrders = (props) => {
  // Dummy Data
  const CardView = (props) => {
    return(
      <View style={styles.innerboxesView}>
     <View style={{margin:1*vh}}>
     
        <View style={{flexDirection:"row"}}>
        <Text style={[styles.orderDetail,{width:22*vw}]}>Order Id :-</Text>
        <Text style={styles.orderDetail}>{props.orderID}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <Text style={[styles.orderDetail,{width:22*vw}]}>Date :-</Text>
        <Text style={styles.orderDetail}>{props.date}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <Text style={[styles.orderDetail,{width:22*vw}]}>Amount :-</Text>
        <Text style={styles.orderDetail}>BDT {props.amount}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <Text style={[styles.orderDetail,{width:22*vw}]}>Status :-</Text>
        <Text style={styles.orderDetail}>{props.status}</Text>
        </View>
       
        <TouchableOpacity 
          style={{alignSelf:"center",alignItems:"center",justifyContent:"center",backgroundColor:Colors.SKYBLUE,padding:1*vh,margin:1*vh,width:35*vw,borderRadius:1*vh}} 
          onPress={()=>props.props.navigation.navigate("OrderDetails")}>
          <Text style={styles.btntext}>
            View Details
          </Text>
        </TouchableOpacity>
        </View>
        
        
      </View>






    )
  }
  
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.container}>
      <CardView orderID="BNG1827345" date="23 May , 08:28 PM" amount="500 (paid)" status="Delivered" props={props}/>
      <CardView orderID="BNG1827346" date="23 May , 08:28 PM" amount="500 (paid)" status="Delivered" props={props}/>
      <CardView orderID="BNG1827349" date="28 May , 08:28 PM" amount="500 (due)" status="Items not received" props={props}/>
     
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  orderDetail:{
    
    fontFamily:"Muli-Bold",
    fontSize:2*vh,
    color:Colors.TEALBLUE,
    marginVertical:0.1*vh,

  },
  btntext: {
    fontSize: 2 * vh,
    color:Colors.white,
    fontFamily:"Muli-Bold"
  },
  titles:{color:Colors.TEALBLUE,padding:1*vw,textAlign:"left",fontFamily:"Muli-Bold",fontSize:2*vh},
 
  container: {
    flex: 1,
    backgroundColor: 'rgb(57,193,183)',

  },
  titleText:{fontFamily:"Muli-Bold",fontSize:2*vh,margin:2*vh},
  innerboxesView:{borderWidth:0.2*vh,padding:1*vh,borderRadius:1*vh,borderColor:Colors.black,backgroundColor:Colors.white,margin:2*vh},
 
});

export default MyOrders;
