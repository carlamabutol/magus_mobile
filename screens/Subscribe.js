import React from "react";
import { ScrollView,ImageBackground, View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";
const Subscribe =()=>{
  let navigate=useNavigate();
  const [subliminal, setSub]=useState('');
  useEffect(()=>{
    getData();
  }, []);
  const getData =()=>{
    
    try{
      AsyncStorage.getItem('subliminal')
      .then(value=>{
        if(value!=null){
          setSub(value);
        }
        else{
          setSub('subliminal');
        }
      })
    } catch (error){
      console.log(error);
    }
    
  }
    return (
      <ImageBackground source={require('../assets/subscribe/subscbg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <TouchableOpacity onPress={()=> navigate("/home")} >
          <Image source={require('../assets/pageback.png')} style={{width: 26, height: 26, left: 15, marginTop: 48}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{backgroundColor: ' rgba(17,79,118,1)', width: Dimensions.get('window').width-60, height: 70, marginTop: 33, marginLeft: 30 }}>
            <Image source={require('../assets/subscribe/coin.png')} style={{alignSelf: 'flex-end', width: 40, height: 40, marginTop: -20, marginRight: -20}}/>
            <View style={{flexDirection: 'row', justifyContent: 'center', }}>
              <Text style={{  fontSize: 22, color: 'white'}}>Enjoy your first week for </Text>
              <Text style={{  fontSize: 22, fontWeight: 'bold', color: 'white'}}>FREE!</Text>
            </View>
          </View>
        </TouchableOpacity>  
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: 'white', marginLeft: 30, marginTop: 20}}>Unlock Magus Audio</Text>
        <View style={{marginLeft: 30, marginTop: 20, width: Dimensions.get('window').width-60, }}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Image source={require('../assets/subscribe/subsc7.png')} style={{alignSelf: 'flex-end', width: 27, height: 27, alignSelf: 'flex-start'}}/>
            <Text style={{marginLeft: 10, color: 'white',   fontSize: 15, marginRight: 20}}>Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidunt</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Image source={require('../assets/subscribe/subsc7.png')} style={{alignSelf: 'flex-end', width: 27, height: 27, alignSelf: 'flex-start'}}/>
            <Text style={{marginLeft: 10, color: 'white',   fontSize: 15, marginRight: 20}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nomuny eirmod tempor invidunt</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Image source={require('../assets/subscribe/subsc7.png')} style={{alignSelf: 'flex-end', width: 27, height: 27,alignSelf: 'flex-start'}}/>
            <Text style={{marginLeft: 10, color: 'white',   fontSize: 15, marginRight: 20}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nomuny eirmod temporay invidunt</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Image source={require('../assets/subscribe/subsc7.png')} style={{alignSelf: 'flex-end', width: 27, height: 27, alignSelf: 'flex-start'}}/>
            <Text style={{marginLeft: 10, color: 'white',   fontSize: 15, marginRight: 20}}>Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidunt</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center',bottom: 0, position: 'absolute', width: Dimensions.get('window').width, height: 170, borderRadius: 10, shadowOpacity: 0.2}}>
          <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor: 'white',  width: Dimensions.get('window').width, height: 170, borderRadius: 10, shadowOpacity: 0.2, opacity: 0.45}}>
          </View>
          <View style={{position: "absolute", }}>
            <Text style={{  fontSize: 20, marginBottom: 10, alignSelf: 'center'}}>Try 7 Days for Free</Text>
            <TouchableOpacity style={{width: Dimensions.get('window').width-120, height: 50, backgroundColor: '#439CD4', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{  fontSize: 17, color: 'white'}}>Continue</Text>
            </TouchableOpacity>
            <Text style={{  fontSize: 15, marginTop: 10, marginBottom: 20, alignSelf: 'center'}}>One week free, then 39.99 PHP/Year</Text>
          </View>
          
        </View>
        
        
        
      </ImageBackground>
    )
}
export default Subscribe;