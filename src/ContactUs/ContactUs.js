/** @format */

import React, { useEffect ,useState} from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    Linking
} from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import Colors from '../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const ContactUs = (props) => {

  const [result, setResult] = useState(null);

    let whatsappNo = '+880-1773-133175'
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

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.io');
    setResult(result);
    console.log("web",result)
  };

    return (
      <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/customersCare.jpg')}
            resizeMode="cover"
            style={{
             paddingTop:2*vh,
              alignItems: "flex-start",
              height:45*vh,
              width:100*vw,
              borderBottomEndRadius:1.5*vh,
              borderBottomStartRadius:1.5*vh,
              overflow:"hidden"
            }}
          >    
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 2 * vh }}>
          <Image source={require('../../assets/icons/back_icon.png')} style={{ width: 5 * vh, height: 5 * vh, tintColor: Colors.black, marginHorizontal: 1 * vw }} resizeMode={"contain"} />
          <Text style={{ color: Colors.black, fontFamily: "Muli-Bold", fontSize: 3 * vh }}>Contact Us</Text>
        </TouchableOpacity>
        </ImageBackground>
        <ScrollView>
       
        <ImageBackground
            source={require('../../assets/cardBackground1.png')}
            resizeMode="cover"
            style={{
              margin:2*vh,
              padding:1*vh,
              alignItems: "flex-start",
              borderRadius:2*vh,
              overflow: "hidden",
              justifyContent:"center",
              
            }}
          >    
          <RowView title="niloy-inc@gmail.com" image={require('../../assets/icons/envelope.png')} onPress={()=>Linking.openURL(`mailto:niloy-inc@gmail.com`)}/>
          <RowView title="+880-1112345678" image={require('../../assets/icons/icons-phone.png')} onPress={()=>Linking.openURL(`tel:${'+880-1112345678'}`)}/>
          <RowView title="www.laundry-app.com" image={require('../../assets/icons/globe.png')} onPress={()=>_handlePressButtonAsync()}/>
          <RowView title="+880-1773-133175" image={require('../../assets/icons/whatsapp.png')} onPress={()=>Linking.openURL(`whatsapp://send?phone=${whatsappNo}`)}/>
        </ImageBackground>
         </ScrollView>
      </View>
    );
};

export default ContactUs;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
   rowView:{
     width:70*vw,
      flexDirection:"row",
      alignItems:"center",
      padding:1*vh,
      justifyContent:"flex-start"
     
  },
  rowImg:{
      height:4*vh,
      width:4*vh,
      tintColor:Colors.TEALBLUE
  },
  titleText:{fontFamily:"Muli-Bold",fontSize:2.8*vh,color:Colors.white},
  rowView1:{backgroundColor:Colors.white,height:6*vh,width:6*vh,borderRadius:3*vh,marginHorizontal:2*vh,alignItems:"center",justifyContent:"center"}

  });