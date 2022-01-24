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
  ScrollView,useWindowDimensions
} from "react-native";

import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import Colors from "../Constants/Colors";


const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;


const Iron = (props) => {

  useEffect(() => {
    showMessage()
  }, []);

  const showMessage = () => {
    Alert.alert(
      'Iron Only', 
      'Standard Delivery for Iron after 4 working days. Steam Ironing. Combined Packaging. Preferred for Casual & Regular Wears.',
      [
        {text: 'OK', onPress: () => console.log('OK button clicked')},
      ],
      { 
        cancelable: false 
      }
    );
  }
  
  const { categoriesName } =
    typeof props.route.params != "undefined" ? props.route.params : "gggggg";
    
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Men' },
    { key: 'second', title: 'Women' },
    { key: 'third', title: 'House-hold Items' },
    { key: 'fourth', title: 'Kids( upto 8 yrs )' },
    
  ]);

  const [mencartItems, setmencartItems] = React.useState([
  ]);
  const [womencartItems, setwomencartItems] = React.useState([
  ]);
  const [houseHoldcartItems, sethouseHoldcartItems] = React.useState([
  ]);
  const [kidscartItems, setkidscartItems] = React.useState([
  ]);

  const [menItems, setmenitems] = React.useState([
    {
      title: "Shirt",
      image: require('../../assets/shirts.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "T-shirt",
      image: require('../../assets/tshirt.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Pant/Trouser",
      image: require('../../assets/menTrouser.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Denim/Jeans",
      image: require('../../assets/jeans.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Trackpant",
      image: require('../../assets/trackPants.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Boxer/shorts",
      image: require('../../assets/boxers.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Kurta",
      image: require('../../assets/kurta.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Pyjama",
      image: require('../../assets/pyjama.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Lungi/Dhoti-Cotton/silk",
      image: require('../../assets/dhoti.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Banian-cotton",
      image: require('../../assets/banian.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Undergarments",
      image: require('../../assets/menUndergarment.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Safari Suit",
      image: require('../../assets/safari.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Handkerchief",
      image: require('../../assets/handerkercheif.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Waist Coat",
      image: require('../../assets/waistCoat.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Blazer/Coat",
      image: require('../../assets/blazer.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Tie",
      image: require('../../assets/tie.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Jacket-cotton/denim",
      image: require('../../assets/denimJacket.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
    {
      title: "Muffler/Scarf",
      image: require('../../assets/scarf.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Men"
    },
  ]);

  const [womenItems, setwomenitems] = React.useState([
    {
      title: "Shirt",
      image: require('../../assets/shirts.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "T-shirt",
      image: require('../../assets/tshirt.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Pant/Trouser",
      image: require('../../assets/menTrouser.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Denim/Jeans",
      image: require('../../assets/jeans.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Boxer/shorts",
      image: require('../../assets/boxers.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Skirt",
      image: require('../../assets/skirt.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Kurti",
      image: require('../../assets/kurti.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Tunics",
      image: require('../../assets/tunics.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Salwar/Pyjama/Legging",
      image: require('../../assets/pyjama.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Palazzo",
      image: require('../../assets/pyjama.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Dupatta/Stole/Scarf",
      image: require('../../assets/scarf.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Gown Cotton/Silk",
      image: require('../../assets/frock.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Saree-cotton",
      image: require('../../assets/sari.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Saree Silk",
      image: require('../../assets/sari.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Saree With Work/Jari",
      image: require('../../assets/sari.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Peticoat",
      image: require('../../assets/skirt.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Blouse",
      image: require('../../assets/blouse.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Blouse With Work",
      image: require('../../assets/blouse.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Handkerchief",
      image: require('../../assets/handerkercheif.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Shrug",
      image: require('../../assets/shrug.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Jacket-cotton/denim",
      image: require('../../assets/denimJacket.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Blazer/Coat",
      image: require('../../assets/blazer.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
    {
      title: "Muffler/Scarf",
      image: require('../../assets/scarf.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category:"Women"
    },
  ]);

  const [houseHold, setHouseHold] = React.useState([
    {
      title: "Pillow Cover",
      image: require('../../assets/pillowCover.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Household"
    },
    {
      title: "Cushion Cover",
      image: require('../../assets/pillowCover.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Household"
    },
    {
      title: "Bedsheets",
      image: require('../../assets/bedsheets.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Household"
    },
    {
      title: "Bed Cover",
      image: require('../../assets/bedsheets.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Household"
    },
  ]);

  const [kidsItems, setkidsItems] = React.useState([
    {
      title: "Shirt",
      image: require('../../assets/shirts.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "T-shirt/Top",
      image: require('../../assets/tshirt.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Pant/Trouser",
      image: require('../../assets/menTrouser.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Denim/Jeans",
      image: require('../../assets/jeans.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Skirt",
      image: require('../../assets/skirt.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Dress/frock",
      image: require('../../assets/frock.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Kurti",
      image: require('../../assets/kurti.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Kurta",
      image: require('../../assets/kurta.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Gown Cotton/Silk",
      image: require('../../assets/frock.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Jacket",
      image: require('../../assets/denimJacket.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
    {
      title: "Blazer/Coat",
      image: require('../../assets/blazer.png'),
      price: 55, totalPrice: 0, count: 0, type: "Iron", category: "Kids"
    },
  ]);

  const RowView = (props) => {
    return (
      <View style={styles.rowView}>
        <View style={styles.rowView1}>
          <Image
            source={props.image}
            style={styles.rowImg}
            resizeMode="contain" />
        </View>
        <Text style={[styles.titleText, { width: 25 * vw }]}>{props.title}</Text>
        <View style={{ alignItems: "center", justifyContent: "center", marginHorizontal: 4 * vw }}>
          <View style={styles.priceView}>
            <Text style={{ fontSize: 1.5 * vh, fontFamily: "Muli", textAlign: "center" }}>BDT {props.price}</Text>
          </View>
          <Text style={{ fontSize: 1.5 * vh, fontFamily: "Muli" }}>Per Price</Text>
        </View>
      </View>
    )
  }

  const NumericView = (props) => {
    return (
      <View style={{ width: 28 * vw, height: 5 * vh, backgroundColor: Colors.SKYBLUE, borderRadius: 1 * vh, flexDirection: "row", borderWidth: 0.1 * vh, borderColor: Colors.gray, justifyContent: "center" }}>
        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={props.onpressminus}><Text style={{ fontSize: 3 * vh }}>-</Text></TouchableOpacity>

        <View style={{ flex: 1, backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }}>
          <Text>{props.count}</Text>
        </View>

        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={props.onpressplus}><Text style={{ fontSize: 3 * vh }}>+</Text></TouchableOpacity>
      </View>
    )
  }

  

  const menplusFunction = (index) => {
    
    let newArray = [...menItems];
    newArray[index].count = newArray[index].count + 1;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    setmenitems(newArray);
    mencartItems.push(newArray[index]);
    
    console.log(mencartItems ? getUnique(mencartItems,'title'):"bbb")
    setmencartItems(mencartItems ? getUnique(mencartItems,'title'):mencartItems);
    //console.log(mencartItems);
  }

  const womenplusFunction = (index) => {
    
    let newArray = [...womenItems];
    newArray[index].count = newArray[index].count + 1;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    setwomencartItems(newArray);
    womencartItems.push(newArray[index]);
    
    console.log(womencartItems ? getUnique(womencartItems,'title'):"bbb")
    setwomencartItems(womencartItems ? getUnique(womencartItems,'title'):womencartItems);
    //console.log(mencartItems);
  }

  const houseHoldplusFunction = (index) => {
    
    let newArray = [...houseHold];
    newArray[index].count = newArray[index].count + 1;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    sethouseHoldcartItems(newArray);
    houseHoldcartItems.push(newArray[index]);
    
    console.log(houseHoldcartItems ? getUnique(houseHoldcartItems,'title'):"bbb")
    sethouseHoldcartItems(houseHoldcartItems ? getUnique(houseHoldcartItems,'title'):houseHoldcartItems);
    //console.log(mencartItems);
  }

  const kidsplusFunction = (index) => {
    
    let newArray = [...kidsItems];
    newArray[index].count = newArray[index].count + 1;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    setkidscartItems(newArray);
    kidscartItems.push(newArray[index]);
    
    console.log(kidscartItems ? getUnique(kidscartItems,'title'):"bbb")
    setkidscartItems(kidscartItems ? getUnique(kidscartItems,'title'):kidscartItems);
    //console.log(mencartItems);
  }

  function getUnique(arr, index) {

    const unique = arr
         .map(e => e[index])
  
         // store the keys of the unique objects
         .map((e, i, final) => final.indexOf(e) === i && i)
  
         // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);      
  
     return unique;
  }

  const menminusFunction = (index) => {
    
    let newArray = [...menItems];
    newArray[index].count = newArray[index].count > 0 ? (newArray[index].count - 1):newArray[index].count;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    setmenitems(newArray);
    mencartItems.push(newArray[index]);
    
    console.log(mencartItems ? getUnique(mencartItems,'title'):"bbb")
    setmencartItems(mencartItems ? getUnique(mencartItems,'title'):mencartItems);
  }

  const womenminusFunction = (index) => {
    
    let newArray = [...womenItems];
    newArray[index].count = newArray[index].count > 0 ? (newArray[index].count - 1):newArray[index].count;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    setwomencartItems(newArray);
    womencartItems.push(newArray[index]);
    
    console.log(womencartItems ? getUnique(womencartItems,'title'):"bbb")
    setwomencartItems(womencartItems ? getUnique(womencartItems,'title'):womencartItems);
  }

  const houseHoldminusFunction = (index) => {
    
    let newArray = [...houseHold];
    newArray[index].count = newArray[index].count > 0 ? (newArray[index].count - 1):newArray[index].count;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    sethouseHoldcartItems(newArray);
    houseHoldcartItems.push(newArray[index]);
    
    console.log(houseHoldcartItems ? getUnique(houseHoldcartItems,'title'):"bbb")
    sethouseHoldcartItems(houseHoldcartItems ? getUnique(houseHoldcartItems,'title'):houseHoldcartItems);
    //console.log(mencartItems);
  }

  const kidsminusFunction = (index) => {
    
    let newArray = [...kidsItems];
    newArray[index].count = newArray[index].count > 0 ? (newArray[index].count - 1):newArray[index].count;
    newArray[index].totalPrice = (newArray[index].count)*newArray[index].price
    setkidscartItems(newArray);
    kidscartItems.push(newArray[index]);
    
    console.log(kidscartItems ? getUnique(kidscartItems,'title'):"bbb")
    setkidscartItems(kidscartItems ? getUnique(kidscartItems,'title'):kidscartItems);
    //console.log(mencartItems);
  }

  const FirstRoute = () => (

    <ScrollView>
      <View style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 10 * vh }}>

        {[...menItems].map((d, i) => (

          <View key={i} style={{
            flexDirection: "row",
            alignItems: "center", justifyContent: "flex-start", borderBottomWidth: 0.1 * vh,
          }}>
            <RowView title={d.title} image={d.image} price={d.price} values={d} />

            <NumericView count={d.count} onpressplus={() => React.lazy(menplusFunction(i))} onpressminus={() => React.lazy(menminusFunction(i))} />
          </View>

        ))}

      </View>
    </ScrollView>

  );

  const SecondRoute = () => (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 10 * vh }}>
        {[...womenItems].map((d, j) => (
          <View key={j} style={{
            flexDirection: "row",
            alignItems: "center", justifyContent: "flex-start", borderBottomWidth: 0.1 * vh,
          }}>
            <RowView title={d.title} image={d.image} price={d.price} values={d} />
            {/* <NumericInput type='plus-minus'
              onChange={value => console.log(value)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalHeight={5 * vh}
              totalWidth={28 * vw}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor={Colors.black}
              minValue={0}
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor={Colors.SKYBLUE}
              leftButtonBackgroundColor={Colors.SKYBLUE}
            /> */}
             <NumericView count={d.count} onpressplus={() => React.lazy(womenplusFunction(j))} onpressminus={() => React.lazy(womenminusFunction(j))} />
          </View>
        ))}
      </View>
    </ScrollView>

  );

  const ThirdRoute = () => (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 10 * vh }}>

        {[...houseHold].map((d, k) => (
          <View key={k} style={{
            flexDirection: "row",
            alignItems: "center", justifyContent: "flex-start", borderBottomWidth: 0.1 * vh,
          }}>
            <RowView title={d.title} image={d.image} price={d.price} values={d} />
            <NumericView count={d.count} onpressplus={() => React.lazy(houseHoldplusFunction(k))} onpressminus={() => React.lazy(houseHoldminusFunction(k))} />
         
          </View>
        ))}
      </View>
    </ScrollView>

  );

  const FourthRoute = () => (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 10 * vh }}>
        {[...kidsItems].map((d, l) => (
          <View key={l} style={{
            flexDirection: "row",
            alignItems: "center", justifyContent: "flex-start", borderBottomWidth: 0.1 * vh,
          }}>
            <RowView title={d.title} image={d.image} price={d.price} values={d} />
            <NumericView count={d.count} onpressplus={() => React.lazy(kidsplusFunction(l))} onpressminus={() => React.lazy(kidsminusFunction(l))} />
         
            
          </View>
        ))}
      </View>
    </ScrollView>

  );


const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
});

const renderTabBar = props => (
    
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "blue" }}
      style={{ backgroundColor: 'rgb(57,193,183)' ,justifyContent:"center"}}
      labelStyle={{textAlign:"center",fontFamily:"Muli-Bold",fontSize:2*vh}}
    />
    
);

function concatArray(){
  let sendArray=[...mencartItems,...womencartItems,...houseHoldcartItems,...kidscartItems];
  return sendArray;
}

const navigates = () => {
  if((mencartItems.length + womencartItems.length + houseHoldcartItems.length + kidscartItems.length) == 0){
    alert("No item selected !");
  }else{
      props.navigation.navigate('SelectAddress',{items:concatArray(),service:"Iron"})
  }
}    

  return (
    
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.width }}
        renderTabBar={renderTabBar}
      />
      <View style={{ width: 100 * vw, padding: 1 * vh, backgroundColor: Colors.gray, position: "absolute", bottom: 0, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.tabText}>{(mencartItems.length + womencartItems.length + houseHoldcartItems.length + kidscartItems.length) == 0 ? `No item selected` : `Total ${(mencartItems.reduce((a, c) => { return a + c.count}, 0)) + (womencartItems.reduce((a, c) => { return a + c.count}, 0)) + (houseHoldcartItems.reduce((a, c) => { return a + c.count}, 0)) + (kidscartItems.reduce((a, c) => { return a + c.count}, 0))} items selected`}</Text>
          <TouchableOpacity style={{ marginHorizontal: 4 * vw }}>
            <Text style={styles.titleText}>SubTotal: BDT {(mencartItems.reduce((a, c) => { return a + c.totalPrice}, 0))+(womencartItems.reduce((a, c) => { return a + c.totalPrice}, 0)) + (houseHoldcartItems.reduce((a, c) => { return a + c.totalPrice}, 0)) + (kidscartItems.reduce((a, c) => { return a + c.totalPrice}, 0))}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ padding: 1 * vh, marginTop: 1 * vh, backgroundColor: 'rgb(57,193,183)', width: 40 * vw, borderRadius: 1 * vh }} onPress={()=>navigates()}>

          <Text style={styles.tabText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: Colors.PASTELBLUE,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 1 * vh
  },
  tabText: { textAlign: "center", fontFamily: "Muli-Bold", fontSize: 2 * vh, color: "white" },
  rowImg: {
    height: 5 * vh,
    width: 5 * vh,
    marginHorizontal: 3 * vw
  },
  titleText: { fontFamily: "Muli-Bold", fontSize: 2.2 * vh, color: Colors.black },
  rowView1: { alignItems: "center", justifyContent: "center" },
  priceView: {
    backgroundColor: Colors.SKYBLUE,
    height: 7 * vh,
    width: 7 * vh,
    borderRadius: 3.5 * vh,
    alignItems: "center", justifyContent: "center"
  }
  
});

export default Iron;
