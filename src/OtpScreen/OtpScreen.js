import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View ,TouchableOpacity,StyleSheet,Button,Alert,Dimensions,ActivityIndicator} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 
'react-native-confirmation-code-field';
import Colors from "../Constants/Colors";

const CELL_COUNT = 4;
const RESEND_OTP_TIME_LIMIT = 90;
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const OtpScreen = (props) => {

const { phone
} = typeof props.route.params != "undefined" ? props.route.params : "";

let resendOtpTimerInterval;

const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
);

const [data, setData] = useState(null);

const [loader, setLoader] = useState(false);

useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {

    let url = `https://steam-laundry-api.herokuapp.com/user/loginByOtp?phone=${phone}`;
   
    fetch(url, {
        method: 'GET',
        body: "",
        redirect: 'follow'
    })
      .then((response) => response.json())
      .then((data) => {
          
        setData(data)
      })
      .catch((error) => {
         
        alert(error);
      });
  };

  
  const verifyOtp = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let url = `https://steam-laundry-api.herokuapp.com/user/verifyByOtp?phone=${phone}&code=${value}`;
    setLoader(true);
    fetch(url, {
        method: 'GET',
        headers: myHeaders,
        body: "",
        redirect: 'follow'
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        setData(data),
        Alert.alert(
            'Sign Up',
            "Your signup is successful . Please login with your credentials !",
            [
                {
                    text: "OK",
                    onPress: () => {props.navigation.navigate("LoginSignUp")},
                  },
            ],
            {
            cancelable: false
            }
        );
      })
      .catch((error) => {
        setLoader(false);
        alert(error);
      });
  };

  



//to start resent otp option
const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
        if (resendButtonDisabledTime <= 0) {
            clearInterval(resendOtpTimerInterval);
        } else {
            setResendButtonDisabledTime(resendButtonDisabledTime - 1);
        }
    }, 1000);
};

//on click of resend button
const onResendOtpButtonPress = () => {
    //clear input field
    setValue('')
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    // todo
    console.log('todo: Resend OTP');
};

//declarations for input field
const [value, setValue] = useState('');
const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
});

//start timer on screen on launch
useEffect(() => {
    startResendOtpTimer();
    return () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
    };
}, [resendButtonDisabledTime]);



return (
    <SafeAreaView style={styles.root}>
         {loader ? <View style={{position:"absolute",height:10*vh,width:10*vh,backgroundColor:Colors.white,alignItems:"center",justifyContent:"center",alignSelf:"center",borderRadius:1*vh,top:40*vh}}>
          <ActivityIndicator
              size="large"
              animating={true}
              color={Colors.Seagreen}
              style={{alignSelf:"center"}}
            />
          </View>:<View></View>
          }
        <Text style={styles.title}>Verify the Authorisation Code</Text>
        <Text style={styles.subTitle}>Sent to {phone}</Text>
        <CodeField
            ref={ref}
            {...propss}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
            )}
        />
        {/* View for resend otp  */}
        {resendButtonDisabledTime > 0 ? (
            <Text style={styles.resendCodeText}>Resend Authorisation Code in {resendButtonDisabledTime} sec</Text>
        ) : (
                <TouchableOpacity
                    onPress={onResendOtpButtonPress}>
                    <View style={styles.resendCodeContainer}>
                        <Text style={styles.resendCode} > Resend Authorisation Code</Text>
                        <Text style={{ marginTop: 40 }}> in {resendButtonDisabledTime} sec</Text>
                    </View>
                </TouchableOpacity >
            )
        }
        <View style={styles.button}>
            <Button title="Submit"
                onPress={() =>
                    verifyOtp()
                } />
        </View>
    </SafeAreaView >
);
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        marginStart: 20,
        fontWeight:'bold'
    },
    subTitle: {
        textAlign: 'left',
        fontSize: 16,
        marginStart: 20,
        marginTop: 10
    },
    codeFieldRoot: {
        marginTop: 40,
        width: '90%',
        marginLeft: 20,
        marginRight: 20,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
     },
     cellText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
    button: {
        marginTop: 20
    },
    resendCode: {
        color: Colors.BLUE,
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeText: {
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
  

export default OtpScreen;