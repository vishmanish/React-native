/** @format */

import React, { useEffect, useState } from "react";
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
    ImageBackground,ActivityIndicator
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

const LoginSignUp = (props) => {

const [data, setData] = React.useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
});
    
const { colors } = useTheme();

const [datas, setDatas] = useState(null);

const [loader, setLoader] = useState(false);

  const loadData = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    
    "password": data.password,
    "email": data.email,
    
    });

    let url = `https://steam-laundry-api.herokuapp.com/user/login`;
    setLoader(true);
    fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        console.log(data.username);
        
        if(data.username == "" || data.username == null || typeof data.username == "undefined"){
            console.log(data.msg),
                Alert.alert(
                            'Login',
                            data.msg,
                            [
                            { text: 'OK'},
                            ],
                            {
                            cancelable: false
                            }
                        );
        }else{
            AsyncStorage.setItem('user',JSON.stringify(data));  
        props.navigation.navigate("Home")
        }
      })
      .catch((error) => {
        setLoader(false);
        alert(error)
      });
  };

  


  
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
    // try{  
    //   let user = await AsyncStorage.getItem('user');  
    //   let parsed = JSON.parse(user);  
      
    //   if(parsed == null || parsed.signedup != "yes"){
    //     alert('You have not any account on Steam. Please sign up first !')
    //   }else{
    //     try {
    //         let isLoggedIn = "yes"
    //         await AsyncStorage.setItem('loggedIn',isLoggedIn)
    //       } catch (e) {
    //         console.log(e)
    //       } 
    //     props.navigation.navigate("Home")
    //   }  
    // }  
    // catch(error){  
    //   console.log(error) 
    // }  
    loadData()
  }  


 
const SignIn = () => {
    
if(data.email != '' && data.password != ''){

if(data.isValidEmail && data.isValidPassword){
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

{loader ? <View style={{position:"absolute",height:10*vh,width:10*vh,backgroundColor:Colors.white,alignItems:"center",justifyContent:"center",alignSelf:"center",borderRadius:1*vh,top:40*vh}}>
          <ActivityIndicator
              size="large"
              animating={true}
              color={Colors.Seagreen}
              style={{alignSelf:"center"}}
            />
          </View>:<View></View>
          }

           <View style={styles.logoContainer}>
          <Image 
          source={require('../../assets/icon.png')} 
          style={{ width: 20 * vh, height: 20 * vh, margin: 4 * vh }} 
          resizeMode={"contain"} />
          <Text style={{fontFamily:"Muli-Bold",color:Colors.white,fontSize:3.5*vh,marginHorizontal:2*vw,textAlign:"center"}}>Sign In here to continue !</Text>
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

            <Text style={[styles.text_footer, {
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
            <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
                <Text style={{color: '#030303', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>SignIn()}
                >
                
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
               
                </TouchableOpacity>

                <TouchableOpacity
                     onPress={() => props.navigation.navigate('SignUp')}
                    style={[styles.signIn, {
                        borderColor: 'rgb(57,193,183)',
                        borderWidth: 1,
                        backgroundColor:Colors.white
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'rgb(57,193,183)'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            
            </Animatable.View>
        </View>
        
      </View>
    );
};

export default LoginSignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:'#39C1B7'
    },
    logoContainer:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:7*vh
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
        width: 35*vw,
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