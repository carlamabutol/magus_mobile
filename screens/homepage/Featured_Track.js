import React from 'react';
import { ImageBackground, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect,useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";

const Featured_Track = ({navigation}) => {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const route = useRoute();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.feat_id);
    const data = await resp.json();

    let i=0;
    while(i<data.tracks.length){
      const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
      const data1 = await resp.json();
      setData1(data1);
      const object = data1.find(obj => obj.subliminal_id === data.tracks[i].track_id);
      array.push(object)
      i++
      }
      setArray(array)
      setData(data);
  };
  const play = async(item)=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal/"+item);
    const data1 = await resp.json();
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.value="MINIMIZE"
    }
      global.location="NotToday"
      global.title=data1[0].title
      setSubliminal(data1[0])
      global.count=1
      global.cover=data1[0].cover
      global.category=data1[0].category.name
      global.subs_id=data1[0].subliminal_id
      for(var i=0; i<data1[0].info.length; i++){
        global.length=data1[0].info.length;
        if(data1[0].info.length==2){
          global.track1=data1[0].info[0].track_id;
          global.volume1="0."+data1[0].info[0].volume;
          if(data1[0].info[0].audio_type_id==1){
            global.type1="Pure";
          }else{
            global.type1="Ultrasonic";
          }
          global.track2=data1[0].info[1].track_id;
          global.volume2="0."+data1[0].info[1].volume;
          if(data1[0].info[1].audio_type_id==1){
            global.type2="Pure";
          }else{
            global.type2="Ultrasonic";
          }
  
        }else if(data1[0].info.length==3){
          global.track1=data1[0].info[0].track_id;
          global.volume1="0."+data1[0].info[0].volume;
          if(data1[0].info[0].audio_type_id==1){
            global.type1="Pure";
          }else{
            global.type1="Ultrasonic";
          }
          global.track2=data1[0].info[1].track_id;
          global.volume2="0."+data1[0].info[1].volume;
          if(data1[0].info[1].audio_type_id==1){
            global.type2="Pure";
          }else{
            global.type2="Ultrasonic";
          }
          global.track3=data1[0].info[2].track_id;
          global.volume3="0."+data1[0].info[2].volume;
          if(data1[0].info[2].audio_type_id==1){
            global.type2="Pure";
          }else{
            global.type2="Ultrasonic";
          }
        }
      }
  };
  
  const count =()=>{
   
    return(
      <SafeAreaView>
        <FlatList
        data={data.tracks}
        renderItem={renderItem2}
        keyExtractor={(item) => item.cover.toString()}
        style={{marginTop: 15, marginBottom: 130}}
        showsHorizontalScrollIndicator={false}
      />
      </SafeAreaView>
      
    )

  }
  useEffect(() => {
   
   fetchData();
   
  }, []);

  const renderItem2= ({ item }) => {
    return (
     
      <View style={{backgroundColor: 'white', width: Dimensions.get('window').width-40, marginRight: -10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10}}>
        <TouchableOpacity onPress={()=> play(item.track_id)}  style={{ width: Dimensions.get('window').width/2-25,borderRadius: 10, flexDirection: 'row'}}>
          <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
          <View style={{justifyContent: 'center',width: Dimensions.get('window').width-100,}}>
            <Text numberOfLines={1}style={{ marginLeft: 10,  paddingLeft: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, }}>{item.title}</Text>
          </View>
          
          
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
          <Image source={{uri: data.playlist_cover}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height/2.7,  borderTopLeftRadius: 10, marginTop: -50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, shadowColor: 'pink', shadowOpacity: 1, shadowOffset: {width:0, height: 1}, shadowRadius: 3,}}/>
          <TouchableOpacity onPress={() => navigation.navigate("Featured")} style={{width: 40, height: 40, left: 15,marginTop: -Dimensions.get('window').height/3.15}} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>

          <View style={{ marginTop: Dimensions.get('window').height/3.5, justifyContent: 'space-between'}}>
            <Text style={{ width: Dimensions.get('window').width-40, paddingLeft: 20, marginBottom: 10, color: 'black', fontWeight: 'bold',   fontSize: 20, }}>{data.playlist_title}</Text>
            <Text numberOfLines={3} style={{ width: Dimensions.get('window').width-40, lineHeight: 25, paddingLeft: 20, color: 'black',    fontSize: 14, textAlign: 'justify'}}>{data.playlist_description}</Text>
            
          </View>
      {count()}        
      
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Featured_Track;