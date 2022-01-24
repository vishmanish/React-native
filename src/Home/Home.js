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
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from "../Constants/Colors";

import { COLORS } from "../Constants/theme";


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const Home = (props) => {
  // Dummy Data

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching your location...'
  );

  const [username, setusername] = useState('XYZ');
  const [firsttime, setFirsttime] = useState('');

  const {
    logindata
} = typeof props.route.params != "undefined" ? props.route.params : "";


  useEffect(() => {

    console.log('First Time')
    CheckIfLocationEnabled();
    GetCurrentLocation();
    displayData();
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('Second Time');
      displayAddress();
    });

    return unsubscribe;

  }, [props.navigation]);


  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        let address = `${item.name}, ${item.street},${item.district},${item.subregion}, ${item.region}`;
        console.log(address);
        saveAddress(address);
        setDisplayCurrentAddress(address);
      }
    }
  };


  const Services = (props) => {
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={props.onPress}>
        <View style={styles.roundView}>
          <Image source={props.image} style={{ height: 6 * vh, width: 6 * vh }} />
        </View>
        <Text style={styles.serviceTitle}>{props.title}</Text>
      </TouchableOpacity>
    )
  }

  const saveAddress = (addr) => {
    let obj = {
      address: addr,

    }
    return (

      AsyncStorage.setItem('address', JSON.stringify(obj))
    )
  }

  const displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      if (parsed == null) {
        setusername('')
      } else {
        setusername(parsed.username);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const displayAddress = async () => {
    try {
      let address = await AsyncStorage.getItem('address');
      let parsed1 = JSON.parse(address);

      if (parsed1 == null) {

      } else {
        setDisplayCurrentAddress(parsed1.address);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const Boxes = (props) => {
    return (
      <View style={styles.boxesView}>
        <Text style={styles.locText}>{props.title}</Text>
        <View style={styles.innerboxesView}>

          <OrderDetail orderid={props.orderid} date={props.date} amount={props.amount} status={props.status} onPress={() => props.props.navigation.navigate("OrderDetails")} />
        </View>
      </View>
    )
  }

  const OrderDetail = (props) => {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.orderDetail, { width: 22 * vw }]}>Order Id :-</Text>
          <Text style={styles.orderDetail}>{props.orderid}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.orderDetail, { width: 22 * vw }]}>Date :-</Text>
          <Text style={styles.orderDetail}>{props.date}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.orderDetail, { width: 22 * vw }]}>Amount :-</Text>
          <Text style={styles.orderDetail}>BDT {props.amount}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.orderDetail, { width: 22 * vw }]}>Status :-</Text>
          <Text style={styles.orderDetail}>{props.status}</Text>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center", backgroundColor: Colors.SKYBLUE, padding: 1 * vh, margin: 1 * vh, width: 50 * vw, alignSelf: "center", borderRadius: 1 * vh }}
          onPress={props.onPress}>
          <Text style={styles.btntext}>
            View details
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const DealsAndOffers = (props) => {
    return (
      <TouchableOpacity
        style={styles.dealsBtn}
        onPress={props.onPress}
      >
        <ImageBackground source={require('../../assets/cardBackground.jpeg')} style={{ flex: 1, padding: 1 * vh }} resizeMode="cover">
          <Image
            source={props.imageNm}
            resizeMode="cover"
            style={styles.dealsImg}
          />

          <Text style={styles.dealsTitle}>{props.dealTitle}</Text>
          <Text style={styles.dealsDesc}>{props.deals}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.container}>
        <ImageBackground style={styles.nameView} source={require('../../assets/cardBackground.jpeg')}>
          <Text style={styles.helloText}>Hello {username} !</Text>
          <Text style={styles.locText}>Your Location is</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.helloText, { flex: 3, fontSize: 2.5 * vh }]}><Image
              source={require("../../assets/icons/icons-address.png")}
              resizeMode="contain"
              style={{
                tintColor: Colors.white,
                width: 4 * vh,
                height: 3 * vh,
              }}
            />{displayCurrentAddress ? displayCurrentAddress.replace("null,", "") : ""} </Text>
            <TouchableOpacity style={{ flex: 1 }}
              onPress={() => props.navigation.navigate("GooglePlacesSearch")}
            >
              <Text style={[styles.locText, { textAlign: "right" }]}>Change</Text></TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{ padding: 2 * vh }}>
          <Text style={styles.locText}>Our Top Services</Text>
          <View style={styles.serviceview}>
            <Services title="Wash & Iron"
              image={require('../../assets/icons/washings.png')}
              onPress={
                () => { props.navigation.navigate("WashAndIron") }
              } />
            <Services title="Dry Cleaning" image={require('../../assets/icons/clothes.png')} onPress={
              () => { props.navigation.navigate("DryCleaning") }
            } />
            <Services title="Only Iron" image={require('../../assets/icons/iron.png')}
              onPress={
                () => { props.navigation.navigate("Iron") }
              } />
            <Services title="Wash Only" image={require('../../assets/icons/washings.png')}
              onPress={
                () => { props.navigation.navigate("Wash") }
              }
            />
            <Services title="Premium Wash & Iron" image={require('../../assets/icons/clothes.png')} onPress={
              () => { props.navigation.navigate("PremiumWashIron") }
            } />
          </View>
          <Text style={styles.locText}>Laundry (Per Kg)</Text>
          <View style={styles.offersview}>
            <DealsAndOffers
              imageNm={require('../../assets/icons/washings.png')}
              dealTitle="BDT 60"
              deals="Wash Only (Per Kg)"
              onPress={() => props.navigation.navigate("PackagesDetails", { title: "Wash Only (Per Kg)", price: 60, image: (require('../../assets/icons/washings.png')) })}
            />
            <DealsAndOffers
              imageNm={require('../../assets/icons/washings.png')}
              dealTitle="BDT 90"
              deals="Wash & Iron (Per Kg)"
              onPress={() => props.navigation.navigate("PackagesDetails", { title: "Wash & Iron (Per Kg)", price: 90, image: (require('../../assets/icons/washings.png')) })}
            />
            <DealsAndOffers
              imageNm={require('../../assets/icons/clothes.png')}
              dealTitle="BDT 100"
              deals="Dry Cleaning (Per Kg)"
              onPress={() => props.navigation.navigate("PackagesDetails", { title: "Dry Cleaning (Per Kg)", price: 100, image: (require('../../assets/icons/clothes.png')) })}
            />
            <DealsAndOffers
              imageNm={require('../../assets/icons/iron.png')}
              dealTitle="BDT 60"
              deals="Only Iron (Per Kg)"
              onPress={() => props.navigation.navigate("PackagesDetails", { title: "Only Iron (Per Kg)", price: 60, image: (require('../../assets/icons/iron.png')) })}
            />
            <DealsAndOffers
              imageNm={require('../../assets/icons/clothes.png')}
              dealTitle="BDT 150"
              deals="Premium Wash & Iron (Per Kg)"
              onPress={() => props.navigation.navigate("PackagesDetails", { title: "Premium Wash & Iron (Per Kg)", image: (require('../../assets/icons/clothes.png')) })}
            />
          </View>
        </View>
        < Boxes title="Awaiting Pickup" orderid="BDS18052021" date="18 may 2021" amount="500 (Due)" status="Items not received" props={props} />
        < Boxes title="Awaiting Delivery" orderid="BDS20052021" date="20 may 2021" amount="400 (Due)" status="Items not delivered" props={props} />
        < Boxes title="Completed Delivery" orderid="BDS15052021" date="15 may 2021" amount="600 (Paid)" status="Delivered" props={props} />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  dealsDesc: {
    marginVertical: 0.5 * vh,
    marginHorizontal: 1 * vw,
    fontSize: 2 * vh,
    width: 35 * vw,
    color: Colors.white,
    fontFamily: "Muli-Bold"
  },
  btntext: {
    fontSize: 2 * vh,
    color: Colors.white,
    fontFamily: "Muli-Bold"
  },
  dealsTitle: {
    fontFamily: "Muli-Bold",
    marginVertical: 0.5 * vh,
    marginHorizontal: 1 * vw,
    width: 35 * vw,
    color: Colors.black,
    fontSize: 2 * vh,
  },
  dealsImg: {
    width: 8 * vh,
    height: 8 * vh,
    borderRadius: 1 * vh,
    tintColor: 'rgb(57,193,183)',
    alignSelf: "center",
    backgroundColor: "white",
    margin: 1 * vh
  },
  dealsBtn: {
    borderRadius: 2 * vh,
    overflow: "hidden",
    justifyContent: "center",
    marginHorizontal: 2 * vw,
    marginVertical: 1 * vh,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boxesView: { borderWidth: 0.2 * vh, padding: 2 * vh, margin: 2 * vh, borderRadius: 1 * vh, borderColor: 'rgb(57,193,183)' },
  innerboxesView: { borderWidth: 0.2 * vh, padding: 1 * vh, borderRadius: 1 * vh, borderColor: Colors.black },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  nameView: {
    padding: 2 * vh
  },
  helloText: {
    fontFamily: "Muli-Bold",
    fontSize: 3 * vh,
    color: Colors.white
  },
  locText: {
    fontFamily: "Muli-Bold",
    fontSize: 2.5 * vh,
    color: Colors.black,
    marginVertical: 0.5 * vh
  },
  roundView: {
    margin: 2 * vh,
    height: 10 * vh,
    width: 10 * vh,
    borderRadius: 5 * vh,
    borderWidth: 0.1 * vh,
    borderColor: Colors.SKYBLUE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PASTELBLUE
  },
  serviceTitle: {
    width: 10 * vh,
    fontFamily: "Muli-Bold",
    fontSize: 1.5 * vh,
    color: Colors.black,
    marginVertical: 0.1 * vh,
    textAlign: "center"
  },
  ordersTitle: {

    fontFamily: "Muli-Bold",
    fontSize: 1.5 * vh,
    color: Colors.black,
    marginVertical: 0.1 * vh,

  },
  orderDetail: {

    fontFamily: "Muli-Bold",
    fontSize: 2 * vh,
    color: Colors.TEALBLUE,
    marginVertical: 0.1 * vh,

  },
  serviceview: { flexWrap: "wrap", flexDirection: "row", justifyContent: "center" },
  offersview: { flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start" }
});

export default Home;
