/** @format */

import { StatusBar } from "expo-status-bar";
import React, { useEffect ,useState} from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Dimensions,
  Image
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import Colors from "../Constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const PackagesDetails = (props) => {
  // Dummy Data
  const {
    title,price,image
} = typeof props.route.params != "undefined" ? props.route.params : "";

const [count,setCount] = useState(0);

const NumericView = (props) => {
  return (
    <View style={{ width: 28 * vw, height: 5 * vh, backgroundColor: Colors.SKYBLUE, borderRadius: 1 * vh, flexDirection: "row", borderWidth: 0.1 * vh, borderColor: Colors.gray, justifyContent: "center" ,marginVertical:1*vh}}>
      <TouchableOpacity style={{flex:1, justifyContent: "center", alignItems: "center" }} onPress={props.onpressminus}>
        <Text style={{ fontSize: 3 * vh }}>  -  </Text>
        </TouchableOpacity>

      <View style={{width:10*vw, backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 2 * vh }}>{count}</Text>
      </View>

      <TouchableOpacity style={{flex:1, justifyContent: "center", alignItems: "center" }} onPress={props.onpressplus}>
        <Text style={{ fontSize: 3 * vh }}>  +  </Text>
        </TouchableOpacity>
    </View>
  )
}

const menplusFunction = () => {
  
  setCount(count+1);

}

const menminusFunction = () => {

  if(count > 0){

    setCount(count-1);

  }
  
}

const navigates = () => {
  if(count == 0){
    alert("No item selected !");
  }else{
      props.navigation.navigate('SelectAddress',{countKg:count,priceKg:price,service:title})
  }
}


  return (
    <View style={{flex:1,paddingTop:3*vh}}>
      
        <View style={{margin:3*vh,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <View style={styles.roundView}>
          <Image source={image}
            style={{height:10*vh,width:10*vh}}
          />
          </View>
          <View style={{width:50*vw}}>
          <Text style={styles.titleText}>{title}</Text>  
          <Text style={styles.priceText}>BDT {price}</Text>
          <NumericView 
          onpressplus={() => (menplusFunction())} 
          onpressminus={() => (menminusFunction())} 
          />
          </View>
        </View>

        <View style={{ width: 100 * vw, padding: 1 * vh, backgroundColor: Colors.gray, position: "absolute", bottom: 0, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.tabText}>
          {count} Kg</Text>
          <TouchableOpacity style={{ marginHorizontal: 4 * vw }}>
            <Text style={styles.titleText}>SubTotal: BDT {count*price}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ padding: 1 * vh, marginTop: 1 * vh, backgroundColor: 'rgb(57,193,183)', width: 40 * vw, borderRadius: 1 * vh }} onPress={()=>navigates()}>
          <Text style={styles.tabText}>Checkout</Text>
        </TouchableOpacity>
      </View>
   

    </View>
     );
};


const styles = StyleSheet.create({

  roundView:{
    height:14*vh,
    width:14*vh,
    borderRadius:7*vh,
    borderWidth:0.1*vh,
    borderColor:Colors.SKYBLUE,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:Colors.PASTELBLUE
  },
  tabText: { textAlign: "center", fontFamily: "Muli-Bold", fontSize: 2 * vh, color: "white" },
  
  titleText: { fontFamily: "Muli-Bold", fontSize: 2.2 * vh, color: Colors.black },
  priceText: { fontFamily: "Muli-Bold", fontSize: 1.8 * vh, color: Colors.TEALBLUE },
 
});

export default PackagesDetails;
