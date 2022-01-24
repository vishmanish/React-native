/** @format */

import React, { useEffect ,useState} from "react";
import {
StyleSheet,
SafeAreaView,
View,
Text,
Image,
TouchableOpacity,
Dimensions,
Button,

} from "react-native";

import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from "../Constants/Colors";
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const Onboardings = ({ navigation }) => {
// Render

const [showRealApp, setShowRealApp] = useState(false);

const slides = [
  {
    key: 's1',
    text: 'We provide a wide range of Laundry services, all you need to do is to click on the service you need on our simple and easy to use app',
    title: 'Choose your service',
    image:require('../../assets/laundry1.png'),
    backgroundColor: 'rgb(245,245,245)',
  },
  {
    key: 's2',
    title: 'Pickup',
    text: 'Your laundry bag is full, our Pickup slots are waiting, choose a time that is convenient for you, we will there to pick your laundry stack.',
    image: require('../../assets/laundry2.png'),
    backgroundColor:  'rgb(245,245,245)',
  },
  {
    key: 's3',
    title: 'You relax we take care',
    text: 'We follow all safety measures while processing orders. Your clothes are handled by professionals. It is now time for you to relax!',
    image: require('../../assets/laundry3.png'),
    backgroundColor:  'rgb(245,245,245)',
  },
  {
    key: 's4',
    title: 'Get On-Time Delivery',
    text: 'Your clothes will get back to you in a perfectly bag. Taintlessness handed over ! Ready for next pickup !',
    image: require('../../assets/laundry4.png'),
    backgroundColor:  'rgb(245,245,245)',
  },
  
  
];

  const onDone = () => {
    navigation.navigate("LoginSignUp");
  };
  const onSkip = () => {
    navigation.navigate("LoginSignUp");
  };
  const skipButton = () => {
    return(
    <View style={{height:5*vh,width:100*vw,justifyContent:'center',alignItems:'center',paddingRight:9*vw}}>
    <Text style={{color:Colors.gray,fontFamily:"Muli-Bold",fontSize:2.5*vh}}>Skip</Text>
    </View>
    )
  };
  
  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 14*vh,
          
        }}>
          
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} resizeMode={"contain"}/>
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

 return (
   
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          bottomButton
          renderSkipButton={skipButton}
        />
     

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 30*vh,
    height: 30*vh,
  },
  introTextStyle: {
    fontSize: 18,
    color: Colors.gray,
    textAlign: 'center',
    padding: 4*vh,
    
  },
  introTitleStyle: {
    fontSize: 4*vh,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 2*vh,
    fontWeight: 'bold',
  },
});

export default Onboardings;
