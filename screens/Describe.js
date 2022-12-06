import React from "react";
import { ScrollView,ImageBackground, View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Describe =({navigation})=>{
  let navigate=useNavigate();
  const [subliminal, setSub]=useState('');
  const [cname, setCname]=useState('');
  const [aname, setAname]=useState('');
  const [des, setDes]=useState('');
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
    try{
      AsyncStorage.getItem('cname')
      .then(value=>{
        if(value!=null){
          setCname(value);
        }
        else{
          setCname('cname');
        }
      })
    } catch (error){
      console.log(error);
    }
    try{
      AsyncStorage.getItem('aname')
      .then(value=>{
        if(value!=null){
          setAname(value);
        }
        else{
          setAname('aname');
        }
      })
    } catch (error){
      console.log(error);
    }
    
    try{
      AsyncStorage.getItem('des')
      .then(value=>{
        if(value!=null){
          setDes(value);
        }
        else{
          setDes('des');
        }
      })
    } catch (error){
      console.log(error);
    }
  }
  const guiding = (subliminal, cname, aname, guide)=>{
    AsyncStorage.setItem('subliminal', subliminal);
    AsyncStorage.setItem('cname', cname);
    AsyncStorage.setItem('aname', aname);
    AsyncStorage.setItem('guide', guide);

    console.log(subliminal + ' ' + cname + ' ' + aname)
    navigation.navigate('Playing')
  };

    return (
      <ImageBackground style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 19}}>
          <TouchableOpacity onPress={()=> navigation.navigate("Playing")} style={{ width: 40, height: 40, left: 15,marginTop: 48}} >
            <Image source={require('../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
          
        </View>

        
        
        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
          <Text style={{paddingLeft: 35, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, }}>{subliminal}</Text>
        
        </View>
        <Text style={{marginTop: 8, paddingLeft: 35, color: 'black',   fontSize: 14, }}>{aname}</Text>
        <Text style={{marginTop: 8, paddingLeft: 35, color: 'black',   fontSize: 12, marginBottom: 10 }}>3 min</Text>
        <TouchableOpacity style={{ borderRadius: 50, padding: 35, flexDirection: 'row', marginTop: -30}}>
          <View style={{borderRadius: 20,backgroundColor: 'rgba(4,157,217,1)', }}>
            <Text style={{fontSize: 13, justifyContent: 'center', alignSelf: 'center', color: 'white',   padding: 5, paddingLeft: 10, paddingRight: 10}}>{cname}</Text>
          </View>
        </TouchableOpacity>
        <Text style={{paddingLeft: 35, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 17, marginTop: -10 }}>Description</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 35, marginBottom: 80, marginTop: 10}}>
          <View>
            <Text style={{lineHeight: 40}}>{des}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    )
}
export default Describe;