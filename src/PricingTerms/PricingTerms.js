/** @format */

import React from 'react';
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
    ImageBackground
} from 'react-native';


import Colors from '../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const PricingTerms = (props) => {

    const CardComponent = ({title,desc,backgroundImg}) => {
        return(
       
        <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={{
              margin:2*vh,
              padding:2*vh,
              alignItems: "flex-start",
              borderRadius:2*vh,
              overflow: "hidden",
            }}
          >    
           <Text style={{color:Colors.white,fontSize:2.5*vh,fontFamily:"Muli-Bold"}}>{desc}</Text>
        </ImageBackground>
        
        )
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={require('../../assets/laundry-service.jpeg')}
            resizeMode="cover"
            style={{
             paddingTop:2*vh,
              alignItems: "flex-start",
              height:45*vh,
              borderBottomEndRadius:1.5*vh,
              borderBottomStartRadius:1.5*vh,
              overflow:"hidden"
            }}
          >    
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 2 * vh }}>
          <Image source={require('../../assets/icons/back_icon.png')} style={{ width: 5 * vh, height: 5 * vh, tintColor: Colors.white, marginHorizontal: 1 * vw }} resizeMode={"contain"} />
          <Text style={{ color: Colors.white, fontFamily: "Muli-Bold", fontSize: 3 * vh }}>Pricing Terms</Text>
        </TouchableOpacity>
        </ImageBackground>
        
        <CardComponent backgroundImg={require('../../assets/cardBackground.jpeg')}  desc="After service completion you have to pay through online or Cash on Delivery.
Price may differ due to product fabrication and measurement of their length. It will be based on our respective Service Provider’s inspection.
Service Delivery time might extended or changes due to product fabrics as in leather Jacket, Carpet etc.
Delivery time also might changed upon transportation crisis like strikes and road blocks.
Minimum Order Amount is BDT 300 for free pick and drop service, otherwise you have to pay additional BDT 60 as charge.
Pick up Charge BDT 30
Delivery Charge BDT 30"/>
         </ScrollView>
      </View>
    );
};

export default PricingTerms;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:'rgb(252,175,64)'
    },
   
  });