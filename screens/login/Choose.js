import React from "react";
import { Alert,ImageBackground, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity, Button, TextInput } from "react-native";
import * as Yup from 'yup';
import { useNavigate } from "react-router-native";
import FormContainer from "../../app/components/FormContainer";
import { useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().trim().min(8, 'Password is too short').required('Password is required'),
   
})
const Choose =({navigation}) =>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  useEffect(() => {
    global.email="";
    global.first_name="";
    global.mainname=""
    global.maincover="";
    global.subs ="";
    global.member = "";
    global.id ="";
    global.reco=""
    global.track1=""
    global.volume1=""
    global.type1=""
    global.track2=""
    global.volume2=""
    global.type2=""
    global.track3=""
    global.volume3=""
    global.type3=""
    global.location=""
    global.count=""
    global.subs_id=""
    global.selectedCategory=""
    global.selectedName=""
    global.value=""
    global.array="";
    global.title="";
    global.cover="";
    global.liked="false"
    global.myPlaylist_liked="false"
    global.playlist="false"
    global.favorites=[]
   }, []);
    return(
      <>
    <ImageBackground source={require('../../assets/welcome1bg.png')} style={styles.container}>
        <FormContainer>
          <Image source={require('../../assets/thedeer.png')} style={{width: '38%', height: '24%', marginTop: width/2.8, alignSelf: 'center', shadowColor: 'black', shadowOffset:{width: 1, height: 2}, }}/>
          <View >
            <Text style={{marginBottom: width/7,   fontSize: 27, fontWeight: 'bold', padding: 5, textAlign: 'center', color: 'rgba(242,242,242,1)',  textShadowColor: 'black', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5, }}>Magus Audio</Text>
          </View>

          <TouchableOpacity onPress={()=> navigation.navigate("Login")}  style={{marginBottom: 30,flexDirection: 'row',backgroundColor: '#4C89C6', width: width-100, height: 50, borderRadius: 50,alignItems: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width:0, height: 0}}}>
            <Image source={require('../../assets/gmail.png')} style={{width: 25, height: 25, marginRight: 25}}/> 
            <Text style={{color: 'gray', fontSize: 15, fontWeight: 'bold', color: 'white', width: width-250, justifyContent: 'center', textAlign: 'center' }}>Sign in with Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Login")}  style={{marginBottom: 30,flexDirection: 'row',backgroundColor: '#1877F2', width: width-100, height: 50, borderRadius: 50,alignItems: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width:0, height: 0}}}>
            <Image source={require('../../assets/facebook.png')}style={{width: 25, height: 25, marginRight: 25}}/> 
            <Text style={{color: 'gray', fontSize: 15, fontWeight: 'bold', color: 'white', width: width-250, justifyContent: 'center', textAlign: 'center', }}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 150,flexDirection: 'row',backgroundColor: 'white', width: width-100, height: 50, borderRadius: 50,alignItems: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width:0, height: 0}}}>
            <Image source={require('../../assets/google.png')} style={{width: 25, height: 25, marginRight: 25}}/> 
            <Text style={{color: 'gray', fontSize: 15, fontWeight: 'bold', color: 'black', width: width-250, justifyContent: 'center', textAlign: 'center' }}>Sign in with Google</Text>
          </TouchableOpacity>
        </FormContainer> 
        </ImageBackground>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },btn: {
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
export default Choose;