/** @format */

import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet ,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';


import Colors from '../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const LoginSignUp = (props) => {

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
            <Text style={{color:Colors.white,fontSize:3*vh,fontFamily:"Muli-Bold"}}>{title}</Text>
            <Text style={{color:Colors.white,fontSize:2.5*vh,fontFamily:"Muli"}}>{desc}</Text>
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
          <Text style={{ color: Colors.white, fontFamily: "Muli-Bold", fontSize: 3 * vh }}>Why Us ?</Text>
        </TouchableOpacity>
        </ImageBackground>
       
        <CardComponent backgroundImg={require('../../assets/cardBackground.jpeg')} title="1. Hassle Free" desc="Ordering a laundry service from us is simple and easy. You can hire expert laundry service providers from us and save your valuable time from washing clothes by yourself."/>
        <CardComponent backgroundImg={require('../../assets/cardBackground1.png')} title="2. Budget Friendly" desc="You can hire Professional dry cleaning and laundry services in the same budget or less than any other local laundry services near you. Our Service Providers will handle your clothes from carrying, washing, drying to folding and deliver at your doorstep."/>
        <CardComponent backgroundImg={require('../../assets/cardBackground.jpeg')} title="3. Well-trained Professionals" desc="We Sheba.xyz offer you a  wide range of well-trained professional Service Providers to serve laundry services. We check their backgrounds in details."/>
        <CardComponent backgroundImg={require('../../assets/cardBackground1.png')} title="4. Complete Washing" desc="Our Service Providers will pick your clothes from your doorstep and give them a complete cleaning and wash. After washing they will fold them nicely and deliver in given time."/>
        <CardComponent backgroundImg={require('../../assets/cardBackground.jpeg')} title="5. Customized Service" desc="From list of laundry services you can customize your clothes’ washing method. All clothes aren’t suitable for same washing method, we understand that. You can describe your preferences when our Service Provider will pick your clothes. You will get your clothes washed exactly as described."/>
        <CardComponent backgroundImg={require('../../assets/cardBackground1.png')} title="6. Safety Assurance" desc="Our service providers offer a safe cleaning and washing guarantee. This means they will process every mentioned garments accept safely. However, they will not damage your clothes in order to remove permanent stains."/>
        </ScrollView>
      </View>
    );
};

export default LoginSignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:'rgb(252,175,64)'
    },
   
  });