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
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import * as EmailValidator from "email-validator";
import Colors from '../Constants/Colors';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const ForgotPassword = (props) => {

const [data, setData] = React.useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
});
    
const { colors } = useTheme();
  
const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const handleValidEmail = (em) => {
    let validEmail = EmailValidator.validate(em)
  if( validEmail ) {
    setData({
        ...data,
        email: em,
        isValidEmail: true
    });
  } else {
    setData({
        ...data,
        email: em,
        isValidEmail: false
    });
  }
}

const handlePasswordChange = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          password: val,
          isValidPassword: false
      });
  }
}

const displayData = async ()=>{  
   
        props.navigation.navigate("LoginSignUp")
     
  }  


 
const SignIn = () => {
    
if(data.email != ''){

if(data.isValidEmail){
    displayData()
}else{
    Alert.alert(
        "Error",
        "Please enter email and password in correct format !",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: true }
      );
}
}else{
    Alert.alert(
        "Error",
        "Can't submit with empty fields!",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: true }
      );
    }
    } 
    return (
      <View style={styles.container}>
           <View style={styles.logoContainer}>
          <Image 
          source={require('../../assets/icon.png')} 
          style={{ width: 20 * vh, height: 20 * vh, margin: 4 * vh }} 
          resizeMode={"contain"} />
          <Text style={{fontFamily:"Muli-Bold",color:Colors.white,fontSize:3.5*vh,marginHorizontal:2*vw,textAlign:"center"}}>Reset your Password here !</Text>
          </View>
          
          <View style={styles.header}>
          
            
            <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
          <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
            <Feather 
                    name="mail"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleValidEmail(val)}
                />
                
                
            </View>
            { data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Enter a valid email format.</Text>
            </Animatable.View>
            }

            {/* <Text style={[styles.text_footer, {
                color: colors.text,
               
            }]}>Password</Text>

            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>SignIn()}
                >
                
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Reset Password</Text>
               
                </TouchableOpacity>
            </View>
            
            </Animatable.View>
        </View>
        
      </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:'#39C1B7'
    },
    logoContainer:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:10*vh
    },
    header: {
        flex: 1,
       justifyContent:"flex-end"
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 1*vh,
        borderWidth: 0.1*vh,
        borderColor: '#030303',
        paddingBottom: 5,
        justifyContent:"center",
        alignItems:"center",
        padding:1*vh
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        justifyContent:"space-evenly",
        marginTop: 5*vh,
        flexDirection:"row"
    },
    signIn: {
       padding:1*vh,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor:'rgb(57,193,183)'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });