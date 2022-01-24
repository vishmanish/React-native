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
  ScrollView,Modal,Button
} from "react-native";

import RNUpiPayment from "react-native-upi-payment";
import Colors from "../Constants/Colors";


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const Payment = (props) => {
  // Dummy Data
  
  const [confirmVisible, setconfirmVisible] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const RowView = (props) => {
      return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
       <Text style={styles.titleText}>{props.title}</Text>
       <Image style={{height:4*vh,width:4*vh}} source={require('../../assets/icons/leftarrow.png')}/>
        </TouchableOpacity>
      )
  }

  const callUpi = () => {
    try{
    RNUpiPayment.initializePayment({
      vpa: '8076533433@paytm', // or can be john@ybl or mobileNo@upi
      payeeName: 'Divya Test',
      amount: '1',
      transactionRef: 'aasf-332-aoei-fn'
    }, successCallback, failureCallback);
  }catch{
    alert('Something went wrong !')
  }
  }



  const  failureCallback = (data) => {
    
    if (data['status']=="FAILURE"){
       
      alert(data['message']);
    }
    // in case of googlePay
    else if (data['Status']=="FAILURE"){
       
      alert("Transaction failed . Try Again !");
    }
    // in case of phonepe
    else if (data['Status']=="Failed"){
       
      alert("Transaction failed . Try Again !");
    }
    // in case of phonepe
    else if (data['Status']=="Submitted"){
       
      alert("Transaction done but pending !");
    }
    // any other case than above mentioned
    else{
       
      alert(data['Status']);
    }
}

const successCallback = (data) => {
    
    setTransactionId(data['txnId']);
   
    setconfirmVisible(!confirmVisible);
}

  return (
    
     <View style={styles.container}>

    <RowView title="Pay Online" onPress={()=>callUpi()}/>
    <RowView title="Pay on Delivery" onPress={()=>setconfirmVisible(!confirmVisible)}/>
    
     <Modal visible={confirmVisible} animationType={"fade"}
                        transparent={true} >
                        <View style={{ backgroundColor: 'rgba(57,193,183,0.8)', flex: 1 ,justifyContent:"center"}}>
                            <View style={{ backgroundColor: Colors.white,  marginHorizontal: 2 * vh, borderRadius: 2 * vh, padding: 2 * vh, alignItems: "center" }}>

                                <Image source={require('../../assets/icon.png')} style={{ width: 20 * vh, height: 20 * vh, alignSelf: "center", borderRadius: 10 * vh, marginVertical: 2 * vh ,overflow:"hidden"}} resizeMode="contain" />
                                <Image source={require('../../assets/tick.png')} style={{ width: 20 * vh, height: 20 * vh, alignSelf: "center", borderRadius: 10 * vh }} resizeMode="contain" />
                                <Text style={styles.slotTitle}>Booking Confirmed</Text>
                                <Text style={styles.orderText}>Track your order in My Orders !</Text>
                                {transactionId != "" ?<Text style={styles.orderText}>Transaction Id : {transactionId}</Text>:<View></View>}
                                <Text style={styles.slotTitle}>Order ID : BG18363789</Text>
                                <View style={{height:0.1*vh,marginVertical:1*vh,backgroundColor:Colors.DARKGRAY,width:60*vw}}></View>
                                <Button title="<- Back to Home" onPress={() => {
                                    setconfirmVisible(!confirmVisible);
                                    props.navigation.navigate("Home")}} color={Colors.TEALBLUE} style={{ margin: 1 * vh, padding: 1 * vh }} />

                            </View>
                        </View>


                    </Modal>

               
     </View>
   
  );
};


const styles = StyleSheet.create({
  orderText:{
    fontFamily:"Muli",
    fontSize:2*vh,
    color:Colors.DARKGRAY
},
slotTitle: {
    color: Colors.black, backgroundColor: "white", margin: 2 * vw,
    padding: 1 * vw, textAlign: "center", borderRadius: 1 * vh, fontFamily: "Muli-Bold", fontSize: 2.5 * vh
},
  button:{
    borderWidth:0.1*vh,
    borderColor:Colors.DARKGRAY.DARKGRAY,
    borderRadius:1*vh,
    margin:2*vh,
    padding:2*vh,
    flexDirection:"row",
    backgroundColor:Colors.white,
    alignItems:"center",
    justifyContent:"space-between"
  },
  container: {backgroundColor:'rgb(57,193,183)',flex:1,paddingTop:2*vh},
  titleText:{fontFamily:"Muli-Bold",fontSize:2*vh},
  });

export default Payment;
