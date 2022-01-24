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






const Profile = (props) => {
  // Dummy Data
  
  
    const [username,setusername] = useState('XYZ')
    const [mobile,setmobile] = useState('')
    const [email,setemail] = useState('')
    const [address,setaddress] = useState('')

  useEffect(() => {
    displayData();
  }, []);

  const RowView = (props) => {
      return(
        <TouchableOpacity style={styles.rowView} onPress={props.onPress}>
        <View style={styles.rowView1}>
        <Image 
        source={props.image} 
        style={styles.rowImg} 
        resizeMode="contain"/>
        </View>
        <Text style={styles.titleText}>{props.title}</Text>
          </TouchableOpacity>
      )
  }

  const displayData = async ()=>{  
    try{  
      let user = await AsyncStorage.getItem('user');  
      let parsed = JSON.parse(user);  
      
      if(parsed == null){
        setusername('')
      }else{
        setusername(parsed.username);
        setmobile(parsed.phone);
        setemail(parsed.email);
      } 
      let address = await AsyncStorage.getItem('address');  
      let parsed1 = JSON.parse(address);  
      
      if(parsed1 == null){
       
      }else{
        setaddress(parsed1.address);
      }  
    }  
    catch(error){  
      console.log(error) 
    }  
  } 

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: "white" }}
    >
      
      <View style={styles.container} >
        <RowView title={username} image={require('../../assets/icons/user_icon.png')}/>
        <RowView title={mobile} image={require('../../assets/icons/icons-phone.png')}/>
        <RowView title={email} image={require('../../assets/icons/envelope.png')}/>
        <RowView title={address ? address.replace("null,",""):""} image={require('../../assets/icons/icons-address.png')}/>
        <RowView title="Logout" image={require('../../assets/icons/sign-out.png')} onPress={()=>props.navigation.navigate('LoginSignUp')}/>
       
       </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'rgb(57,193,183)',
  },
  rowView:{
      borderBottomWidth:0.1*vh,
      flexDirection:"row",
      alignItems:"center",
      padding:1.5*vh,
  },
  rowImg:{
      height:4*vh,
      width:4*vh,
  },
  titleText:{fontFamily:"Muli-Bold",fontSize:2*vh,width:75*vw},
  rowView1:{backgroundColor:Colors.white,height:6*vh,width:6*vh,borderRadius:3*vh,marginHorizontal:2*vh,alignItems:"center",justifyContent:"center"}
});

export default Profile;
