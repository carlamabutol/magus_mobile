import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Image, Dimensions, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Audio} from "expo-av";
const {width} = Dimensions.get('window');
function Magusone({navigation}) {

  const [soundObj,setSoundObj1] = useState();
  const [sound, setSound] = useState();
  const scrollView = useRef();

  const playSound = async()=> {
    console.log('Loading Sound');
    const soundObject = new Audio.Sound([]);

    const  status  = await soundObject.loadAsync(
      {uri:  "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id=RxXnOJdDFuUAEjTJLAMPhe&version=1"}, {volume: 0.5, shouldPlay: false}
    );
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    setSoundObj1(status)
    setSound(soundObject);
    //sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    console.log('Playing Sound');
    await soundObject.playAsync(); 
  }
  
  const onPlaybackStatusUpdate = async status => {
    console.log(status)
    if(status.positionMillis>=27232){
      const status = await sound.setStatusAsync({isMuted: true})
      return [setSoundObj1(status)]
    }
  }
  
  useEffect(() => {
   Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: 1,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: 1,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
   })
  }, []);
  
 
  return (
    <ImageBackground source={require('./assets/welcome1bg.png')} style={styles.container}>
      <Image source={require('./assets/thedeer.png')} style={{width: '45%', height: '25%', marginTop: width/3, 
      shadowColor: 'black', shadowOffset:{width: 0, height: 0}, shadowOpacity: 0, shadowRadius: 3}}/>
      <View>
        <Text style={{padding: 5, marginTop: 18, fontSize: 35, fontWeight: 'bold', textAlign: 'center', color: 'rgba(242,242,242,1)', textShadowColor: 'black', textShadowOffset: {width: 2, height: 2}, textShadowRadius: 5}}>Magus Audio</Text>
      </View>
     
      <TouchableOpacity onPress={()=> navigation.navigate("Choose")} style={{paddingTop:width/2.2, borderRadius: 100, shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}}}>
        <Image source={require('./assets/next.png')} style={{width: 45, height: 45, borderRadius: 50}}/>
      </TouchableOpacity>
      
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Magusone;