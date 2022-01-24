/** @format */

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Modal, Button,Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Colors from '../Constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const SelectAddress = (props) => {


    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(Platform.OS === "ios");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [morningEnable, setmorningEnable] = useState(false);
    const [afternoonEnable, setafternoonEnable] = useState(false);
    const [eveningEnable, seteveningEnable] = useState(false);
    const [pickupText, setpickupText] = useState("Choose pickup time");
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Location not found !'
  );

    const {
        items,countKg,priceKg,service
    } = typeof props.route.params != "undefined" ? props.route.params : "";

    const [modalVisible, setmodalVisible] = React.useState(false)
    const [slotVisible, setslotVisible] = React.useState(false)


    useEffect(() => {
    
        const unsubscribe = props.navigation.addListener('focus', () => {
          
            displayData();
        });
    
        return unsubscribe;
        
      }, [props.navigation]);


    const checkAddress = () => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }

    const [address, setAddress] = React.useState("")

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
      
        let { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      
        if (coords) {
          const { latitude, longitude } = coords;
          let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
      
          for (let item of response) {
            let address = `${item.name}, ${item.street},${item.district},${item.subregion}, ${item.region}`;
            console.log("add",address);
            setDisplayCurrentAddress(address);
          }
        }
    };

    const displayData = async () => {
        try {
            let address = await AsyncStorage.getItem('address');
            let parsed1 = JSON.parse(address);

            if (parsed1 == null) {

            } else {
                setAddress(parsed1.address);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const RowView = (props) => {
        return (
            <ImageBackground style={styles.nameView} source={require('../../assets/cardBackground.jpeg')}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={[styles.helloText, { flex: 3, fontSize: 2.5 * vh }]}><Image
                        source={require("../../assets/icons/icons-address.png")}
                        resizeMode="contain"
                        style={{
                            tintColor: Colors.white,
                            width: 4 * vh,
                            height: 3 * vh,
                        }}
                    />{props.address ? props.address.replace("null,", "") : displayCurrentAddress} </Text>
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center" }}
                        onPress={props.onPress}
                    >
                        <Text style={[styles.locText, { textAlign: "right", margin: 1 * vh }]}>Change
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

    const PickUpView = (props) => {


        return (
            <View>
                <View style={{ margin: 3 * vw, alignItems: "flex-start", backgroundColor: Colors.SKYBLUE, borderRadius: 1 * vh, padding: 1 * vh }}>
                    <Text style={[styles.titles, { fontFamily: "Muli-Bold" }]}>
                        Pickup
                </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ borderWidth: 0.2 * vh, margin: 3 * vw, width: 40 * vw, padding: 1.5 * vh, borderColor: Colors.TEALBLUE }}>
                        {show && (
                            <View style={{ alignSelf: "center", width: 35 * vw }}>
                                <DateTimePicker
                                    textColor="#46aeff"
                                    style={{
                                        backgroundColor: Colors.white,
                                    }}
                                    backgroundColor="white"
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    display="default"
                                    minimumDate={currentDate}
                                    onChange={(event, selectedDate) => {
                                        try {
                                            if (selectedDate < currentDate) {
                                                setShow(Platform.OS === "ios");
                                                setDate(currentDate);
                                                Alert.alert(
                                                    "Invalid Date",
                                                    "Please select a date after the current date",
                                                    [
                                                        {
                                                            text: "Cancel",
                                                            onPress: () => { },
                                                        },
                                                        {
                                                            text: "OK",
                                                            onPress: () => { },
                                                        },
                                                    ],
                                                    { cancelable: true }
                                                );
                                            } else {
                                                let _date = selectedDate || date;
                                                setShow(Platform.OS === "ios");
                                                setDate(_date);
                                            }
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }}
                                />
                            </View>
                        )}

                        {Platform.OS != "ios" && (
                            <TouchableOpacity
                                onPress={() => setShow(true)}
                                style={{ backgroundColor: "white" }}
                            >
                                <Text
                                    style={{
                                        color: "#46aeff",
                                        textAlign: "center",
                                        backgroundColor: "white",
                                    }}
                                >
                                    {moment(date).format("DD MMMM YYYY")}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={{ borderWidth: 0.2 * vh, margin: 3 * vw, width: 40 * vw, padding: 1.5 * vh, borderColor: Colors.TEALBLUE }} onPress={
                        props.slotPress}>
                        <Text style={{ fontSize: 2 * vh, fontFamily: "Muli", color: "#46aeff" }}>{pickupText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const compareMorningTime = (props) => {

        const timeAndDate1 = moment(1, "HH")
        const timeAndDate2 = moment(9, "HH")

        var currentTime = moment(date);
        let morning = currentTime.isBetween(timeAndDate1, timeAndDate2);
        if (morning == false) {
            setmorningEnable(true);

        } else {
            setmorningEnable(false);

        }
    }

    const compareAfternoonTime = (props) => {

        const timeAndDate1 = moment(1, "HH")
        const timeAndDate2 = moment(14, "HH")

        var currentTime = moment(date);
        let morning = currentTime.isBetween(timeAndDate1, timeAndDate2);
        if (morning == false) {
            setafternoonEnable(true);

        } else {
            setafternoonEnable(false);

        }

    }

    const compareEveningTime = (props) => {

        const timeAndDate1 = moment(1, "HH")
        const timeAndDate2 = moment(17, "HH")

        var currentTime = moment(date);
        let morning = currentTime.isBetween(timeAndDate1, timeAndDate2);
        if (morning == false) {
            seteveningEnable(true);

        } else {
            seteveningEnable(false);

        }

    }

    const checkSlot = () => {
        if (date > new Date()) {
            return (
                setslotVisible(!slotVisible),
                setmorningEnable(false),
                setafternoonEnable(false),
                seteveningEnable(false),
                console.log('yes')
            )
        } else {

            const timeAndDate2 = moment(17, "HH")

            var currentTime = moment(date);
            let morning = currentTime.isAfter(timeAndDate2);
            if (morning == false) {
                return (
                    setslotVisible(!slotVisible),
                    compareAfternoonTime(),
                    compareEveningTime(),
                    compareMorningTime(),
                    console.log("no")
                )
            } else {
                return (
                    alert("Today's slot is not available now. Try for another date !")
                )
            }


        }

    }

    const confirmCheck = () => {
       if(pickupText != "Choose pickup time" && typeof address != "undefined"){
          //  setconfirmVisible(!confirmVisible);
          if(address.includes('Dhaka') == true){
            props.navigation.navigate("Payment");
            console.log("ffff",address)
          }else{
            alert('Service is not available in your location !')
          }
        }else{
            if(address == "" || typeof address == "undefined"){
                Alert.alert(
                    "",
                    "Please select a address for pickup and delivery !",
                        [{
                            text: "OK",
                            onPress: () =>  checkAddress(),
                        }],
                    
                    { cancelable: true }
                );
               // alert('Please select a address for pickup and delivery !');
            }else if(pickupText == "Choose pickup time"){
                alert('Please select a pickup time !')
               
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: "white" }}
                horizontal={false}
            >
                <View style={{ backgroundColor: Colors.white, justifyContent: "space-between" }}>
                    <View>
                        <RowView address={address ? address.replace("null,", "") : ""} onPress={() => props.navigation.navigate("GooglePlacesSearch")} />

                        < PickUpView slotPress={() => checkSlot()} />


                            {countKg ? 
                            <View style={styles.detailsView}>
                                <Text  style={[styles.locText, { textAlign: "right",marginBottom:1.5*vh }]}>{service}</Text>
                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>Total {countKg} Kg</Text>
                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>Subtotal amount BDT {priceKg*countKg}</Text>
                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}> { (priceKg*countKg) > 300 ? "Pickup and Delivery Charges BDT 0" : "Pickup and Delivery Charges BDT 60"}</Text>

                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>Total amount to pay BDT {(priceKg*countKg) > 300 ? (priceKg*countKg) : ((priceKg*countKg) + 60)}</Text>

                            </View>:
                            <View style={styles.detailsView}>
                                <Text  style={[styles.locText, { textAlign: "right",marginBottom:1.5*vh}]}>{service}</Text>
                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>Total {(items.reduce((a, c) => { return a + c.count }, 0))} {(items.reduce((a, c) => { return a + c.count }, 0)) == 1 ? "item" : "items"} selected</Text>
                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>Subtotal amount BDT {(items.reduce((a, c) => { return a + c.totalPrice }, 0))}</Text>
                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>{(items.reduce((a, c) => { return a + c.totalPrice }, 0)) > 300 ? "Pickup and Delivery Charges BDT 0" : "Pickup and Delivery Charges BDT 60"}</Text>

                            <Text style={{ color: Colors.TEALBLUE, fontFamily: "Muli" }}>Total amount to pay BDT {((items.reduce((a, c) => { return a + c.totalPrice }, 0)) > 300 ? (items.reduce((a, c) => { return a + c.totalPrice }, 0)) : (items.reduce((a, c) => { return a + c.totalPrice }, 0)) + 60)}</Text>

                            <TouchableOpacity onPress={() => setmodalVisible(!modalVisible)} style={{ borderWidth: 0.2 * vh, padding: 0.8 * vh, marginTop: 2 * vh, borderColor: Colors.TEALBLUE, borderRadius: 1 * vh }}>
                                <Text style={{ textAlign: "right", fontSize: 2 * vh, fontFamily: "Muli-Bold", color: Colors.black }}>View Details</Text>
                            </TouchableOpacity>
                            </View>
                            }
                            
                    </View>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => confirmCheck()}>
                        <Text style={[styles.helloText, { fontSize: 2.5 * vh }]}>PLACE ORDER</Text>
                    </TouchableOpacity>
{countKg ? <View></View>: <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={modalVisible}>
                        {/*All views of Modal*/}
                        <View style={{ flex: 1, backgroundColor: "rgba(100, 100, 100, 0.8)", alignItems: "center", justifyContent: "center" }}>
                            <View style={styles.modal}>

                                <Button title="Go Back" onPress={() => {
                                    setmodalVisible(!modalVisible)
                                }} />

                                <View style={{ flexDirection: "row", marginVertical: 2 * vh }}>
                                    <Text style={styles.itemTitle}>Items</Text>
                                    <Text style={styles.itemTitle}>Quantity</Text>
                                    <Text style={styles.itemTitle}>Amount</Text>
                                </View>
                                <ScrollView>
                                    {[...items].map((d, i) => (
                                        <View key={i} style={{
                                            alignItems: "center", justifyContent: "flex-start"
                                        }} >
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.itemdesc}>{d.title} ({d.category})</Text>
                                                <Text style={styles.itemdesc}>{d.count}</Text>
                                                <Text style={styles.itemdesc}>BDT {d.totalPrice}</Text>
                                            </View>

                                        </View>
                                    ))}
                                </ScrollView>

                            </View>
                        </View>
                    </Modal>
}
                   
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={slotVisible}>
                        {/*All views of Modal*/}
                        <View style={{ flex: 1, backgroundColor: "rgba(100, 100, 100, 0.8)", alignItems: "center", justifyContent: "center" }}>
                            <View style={styles.modal}>
                                <Button title=" X " onPress={() => {
                                    setslotVisible(!slotVisible);
                                }}
                                    color={Colors.DARKGRAY}

                                />

                                <View style={{ marginVertical: 2 * vh }}>
                                    <Text style={styles.slotTitle}>Choose Slot time for Pickup</Text>

                                </View>

                                <View style={{
                                    alignItems: "center", justifyContent: "flex-start"
                                }} >

                                    <Button title="  09 AM to 02 PM  " onPress={() => { setpickupText("09 AM TO 02 PM"), setslotVisible(!slotVisible) }}
                                        style={{ borderWidth: 0.2 * vh, borderColor: Colors.white, margin: 2 * vh, padding: 1 * vh }}
                                        disabled={morningEnable}
                                    />
                                    <View style={{ height: 2 * vh }}></View>
                                    <Button title="  02 PM to 05 PM  " onPress={() => { setpickupText("02 PM TO 05 PM"), setslotVisible(!slotVisible) }}
                                        style={{ borderWidth: 0.2 * vh, borderColor: Colors.white, margin: 1 * vh, padding: 1 * vh }}
                                        disabled={afternoonEnable}
                                    />
                                    <View style={{ height: 2 * vh }}></View>
                                    <Button title="  05 PM to 07 PM  " onPress={() => { setpickupText("05 PM TO 07 PM"), setslotVisible(!slotVisible) }}
                                        style={{ borderWidth: 0.2 * vh, borderColor: Colors.white, margin: 1 * vh, padding: 1 * vh }}
                                        disabled={eveningEnable}

                                    />
                                    <View style={{ height: 2 * vh }}></View>

                                </View>

                            </View>
                        </View>
                    </Modal>


                   

                </View>
            </ScrollView>
        </View>
    );
};

export default SelectAddress;

const styles = StyleSheet.create({
    orderText:{
        fontFamily:"Muli",
        fontSize:2*vh,
        color:Colors.DARKGRAY
    },
    itemTitle: {
        color: Colors.black, backgroundColor: "white", margin: 2 * vw,
        padding: 1 * vw, width: 25 * vw, textAlign: "center", borderRadius: 1 * vh, fontFamily: "Muli-Bold", fontSize: 2.5 * vh
    },
    slotTitle: {
        color: Colors.black, backgroundColor: "white", margin: 2 * vw,
        padding: 1 * vw, textAlign: "center", borderRadius: 1 * vh, fontFamily: "Muli-Bold", fontSize: 2.5 * vh
    },
    itemdesc: { color: Colors.black, margin: 2 * vw, padding: 1 * vw, width: 25 * vw, textAlign: "center", fontFamily: "Muli-Bold", fontSize: 2.2 * vh },
    slotdesc: { color: Colors.black, width: 50 * vw, textAlign: "center", fontFamily: "Muli-Bold", fontSize: 2.2 * vh },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.SKYBLUE,
        marginVertical: 20 * vh,
        padding: 1 * vh,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 90 * vw,
    },
    container: {
        flex: 1,
    },
    nameView: {
        padding: 1.5 * vh,
        margin: 2 * vh,
        borderRadius: 1 * vh,
        overflow: "hidden",
        marginTop: 4 * vh
    },
    helloText: {
        fontFamily: "Muli-Bold",
        fontSize: 3 * vh,
        color: Colors.white,
        margin: 0.5 * vh
    },
    locText: {
        fontFamily: "Muli-Bold",
        fontSize: 2.5 * vh,
        color: Colors.black,
        marginVertical: 0.5 * vh
    },
    continueBtn: {
        margin: 2 * vh,
        padding: 1 * vh,
        backgroundColor: Colors.SKYBLUE,
        borderRadius: 1 * vh,
        bottom: 5 * vh,
        justifyContent: "center",
        alignItems: "center",
    },
    detailsView: {
        margin: 2 * vh,
        borderColor: Colors.black,
        borderWidth: 0.2 * vh,
        padding: 2 * vh,
        borderRadius: 1 * vh,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20 * vh
    }
});