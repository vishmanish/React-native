/** @format */

import React, { useEffect ,useState} from "react";
import { 
    View, 
    StyleSheet ,
    Dimensions,Text
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Colors from '../Constants/Colors';
const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;
const ApiKey = "AIzaSyBArYrfz9L8HY-mp3ZhFm54CwRUVkgzJnM";


const LoginSignUp = (props) => {

  
    const [value, setValue] = useState('Search');
    const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    const [address,setAddress] = useState('');
    const [lat,setLat] = useState('');
    const [lng,setLng] = useState('');
    const [texts,onChange] = useState('');
    

    const saveData = (details,data) => {
      return(
        setAddress(details.name + ", " + details.formatted_address)
      )
    }

    const saveAddress = (addr) => {
      let obj = {  
        address: addr,  
      } 
      return(
        AsyncStorage.setItem('address',JSON.stringify(obj)) 
      )
    }

    const confirmCheck = () => {
      if(address != ''){
        saveAddress(address)
        props.navigation.goBack()
      }
    }

    const GooglePlacesInput = () => {
        return (
          <GooglePlacesAutocomplete
          keyboardShouldPersistTaps="handled"
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            // true/false/undefined  
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
           saveData(details,data)
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: ApiKey,
            language: 'en', // language of the results
            types: 'establishment' // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              margin:2*vh
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
            listView: { top:10*vh, position: 'absolute', height: Dimensions.get('window').width, width: Dimensions.get('window').width, }
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          listViewDisplayed={'auto'}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
           // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
       
        );
      };
    

    return (
      <View style={styles.container}>
          <GooglePlacesInput/>
          {
            address != '' ? 
            <View style={{margin:2*vh,padding:2*vh,backgroundColor:Colors.primary,bottom:15*vh,borderRadius:1*vh,position:'absolute'}}>
              <Text style={{fontSize:2*vh,fontFamily:"Muli-Bold",color:Colors.white}}>{address}</Text>

            </View>:
            <View>

            </View>
          }
          <TouchableOpacity style={styles.continueBtn} onPress={() => confirmCheck()}>
              <Text style={[styles.helloText, { fontSize: 2.5 * vh }]}>SAVE</Text>
          </TouchableOpacity>
      </View>
    );
};

export default LoginSignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
     
    },
    helloText: {
      fontFamily: "Muli-Bold",
      fontSize: 3 * vh,
      color: Colors.white,
      margin: 0.5 * vh
  },
  
  continueBtn: {
      margin: 2 * vh,
      padding: 1 * vh,
      backgroundColor: Colors.SKYBLUE,
      borderRadius: 1 * vh,
      bottom: 5 * vh,
      justifyContent: "center",
      alignItems: "center",
  },
  });