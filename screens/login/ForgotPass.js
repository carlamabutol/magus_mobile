import React from "react";
import { Alert, ImageBackground, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity, Button, TextInput } from "react-native";
import * as Yup from 'yup';
import { useNavigate } from "react-router-native";
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
const ForgotPass =({navigation}) =>{
    return(
      <>
        <ImageBackground source={require('../../assets/login/bg1.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10}}>
          <Text style={{  fontSize: 35, fontWeight: 'bold', marginTop: 417}}>Forgot</Text>
          <Text style={{  fontSize: 35, fontWeight: 'bold', marginTop: -11, marginBottom: 20}}>Password?</Text>
          <Text style={{  fontSize: 12,  marginTop: -10, marginBottom: 38, lineHeight: 20}}>Don't worry! It happens. Please enter the E-mail Address/Mobile Number associated with your account.</Text>
          <TextInput placeholder="Email Address / Mobile Number" style={{width: Dimensions.get('window').width-60, marginLeft: 20,  fontSize: 15,borderBottomColor: 'white', borderBottomWidth:2, height: 35, marginBottom: 45}}/> 
          <TouchableOpacity onPress={()=> navigation.navigate("Change")} style={{flexDirection: 'row', backgroundColor: '#4C89C6' , width: Dimensions.get('window').width-60, height: 55, borderRadius: 10,alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
            <Text style={{color: 'white',   fontSize: 20, fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={{marginTop:20, alignContent:'center'}}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={{fontSize: 15,   color: 'rgba(24,119,242,1)'}}>Back</Text>
            </View>
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
export default ForgotPass;