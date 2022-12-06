import React from "react";
import { Alert, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity, Button, TextInput, ImageBackground } from "react-native";
import * as Yup from 'yup';
import { useNavigate } from "react-router-native";
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
const Otp =() =>{
  let navigate=useNavigate();
    return(
      <>
        <ImageBackground source={require('../../assets/login/bg2.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10}}>
          <Text style={{  fontSize: 35, fontWeight: 'bold', marginTop: 417, marginBottom: 20}}>Enter OTP</Text>
          <Text style={{  fontSize: 12,  marginTop: -10, marginBottom: 64}}>Enter the 4-digit code that was sent to 09557621383</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{width: Dimensions.get('window').width/6, marginLeft: 25, textAlign: 'center',  fontSize: 45,borderBottomColor: 'white', borderBottomWidth:2, paddingBottom: 10,  marginBottom: 45}}/> 
            <TextInput style={{width: Dimensions.get('window').width/6, marginLeft: 20,  textAlign: 'center', fontSize: 45,borderBottomColor: 'white', borderBottomWidth:2, paddingBottom: 10,  marginBottom: 45}}/> 
            <TextInput style={{width: Dimensions.get('window').width/6, marginLeft: 20,  textAlign: 'center', fontSize: 45,borderBottomColor: 'white', borderBottomWidth:2, paddingBottom: 10,  marginBottom: 45}}/> 
            <TextInput style={{width: Dimensions.get('window').width/6, marginLeft: 20,  textAlign: 'center', fontSize: 45,borderBottomColor: 'white', borderBottomWidth:2, paddingBottom: 10,  marginBottom: 45}}/> 
          </View>
          <TouchableOpacity onPress={()=> navigate("/subscribe")}  style={{flexDirection: 'row', backgroundColor: '#4C89C6' , width: Dimensions.get('window').width-60, height: 55, borderRadius: 10,alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
            <Text style={{color: 'white',   fontSize: 20, fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
        </ImageBackground>
      </>
    )
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    borderColor: "black",
    borderWidth: 0.5,
    height: 38,
    width: 270,
    backgroundColor: '#0F52BA',
    elevation:2,
    marginTop: 30,
    borderRadius: 5,
  },
})
export default Otp;