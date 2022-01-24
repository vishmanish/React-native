
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Colors from "../Constants/Colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const CustomSidebarMenu = (props) => {
  const [username,setusername] = useState('');
  useEffect(() => {
       displayData();
    
  })

  const displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      if (parsed == null) {
        setusername('')
      } else {
        setusername(parsed.UserNames);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <View style={styles.topView}>
          <View>
      <Image
        source={require('../../assets/icon.png')}
        resizeMode="contain"
        style={styles.sideMenuProfileIcon}
      />
     
      </View>
      <Text style={styles.logintxt}>{username}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        
        <View style={styles.customItem}>
          <Text
            >
            Rate Us
          </Text>
          <Image
            source={require('../../assets/icons/star_full.png')}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
       Version: 1.0.0
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    logintxt:{
fontFamily:"Muli-Bold",
color:Colors.TEALBLUE,
marginTop:2*vh,
fontSize:2*vh
    },
    topView:{
        marginTop:2*vh,
        alignItems:"center",
        justifyContent:"center",
        
    },
  sideMenuProfileIcon: {
    borderRadius:6*vh,
    width: 12*vh,
    height: 12*vh,
    alignSelf: 'center',
    overflow:"hidden"
  },
  iconStyle: {
    width: 2*vh,
    height: 2*vh,
    marginHorizontal: 2*vh,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
