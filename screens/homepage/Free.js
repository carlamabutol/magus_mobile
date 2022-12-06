import React, { useEffect, useState } from "react";
import { ScrollView,ImageBackground, View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

const Free =({navigation})=>{
  const route = useRoute();
  
  useEffect(()=>{
    console.log(route.params.item)
  }, []);
  
    return (
      <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        
 <Text>{route.params.item}</Text>
        
      </ImageBackground>
    )
}
export default Free;