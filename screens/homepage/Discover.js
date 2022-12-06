
/*<View style={{marginTop: 2, paddingRight: 5, color: 'black', fontFamily: 'Helvetica Neue', fontSize: 10, marginBottom: 10 }}>{item.info.map(id=>{
  return <Text key={id.id}>{id.track_id}</Text>
})}</View>*/
import React from 'react';
import { ImageBackground, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect, useContext } from "react";
import arrayShuffle from 'array-shuffle';
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const Discover = ({navigation}) => {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const play = async(item)=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+item.featured_id);
    const data = await resp.json();
    if(data.tracks.length==1){
      
      const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal/"+data.tracks[0].track_id);
      const data1 = await resp.json();
      global.cover=data1[0].cover
      global.location="NotToday"
      global.title=data1[0].title
      global.subs_id=data1[0].subliminal_id
      if(value!="MINIMIZE"){
        setValue("MINIMIZE")
        global.count=1
        global.value="MINIMIZE"
      }else{global.count=1}
      setSubliminal(data1[0])
      global.category=data1[0].category.name
      for(var i=0; i<data1[0].info.length; i++){
        global.length=data1[0].info.length;
        if(data1[0].info.length==2){
          global.track1=data1[0].info[0].track_id;
          global.volume1=data1[0].info[0].volume;
          global.type1="Pure";
          
          global.track2=data1[0].info[1].track_id;
          global.volume2="0."+data1[0].info[1].volume;
          
          global.type2="Ultrasonic";
  
        }else if(data1[0].info.length==3){
          global.track1=data1[0].info[0].track_id;
          global.volume1="0."+data1[0].info[0].volume;
          global.type1="Pure";

          global.track2=data1[0].info[1].track_id;
          global.volume2="0."+data1[0].info[1].volume;
          global.type2="Ultrasonic";

          global.track3=data1[0].info[2].track_id;
          global.volume3="0."+data1[0].info[2].volume;
          global.type3="Ultrasonic";
          
        }
      }
    }else if(data.tracks.length>1){
      global.playlist=item
      global.myLocation="Discover"
      navigation.navigate("TodayAllPlaylist")
    }
  };
  useEffect(() => {
   setData(global.discove);
  }, []);
  const renderItem= ({ item }) => {
    return (
     
      <View style={{backgroundColor: 'white',eight: 165, width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20}}>
        <TouchableOpacity onPress={()=> play(item)}  style={{ eight: 165,width: Dimensions.get('window').width/2-25,borderRadius: 20,marginBottom: 10 }}>
          <Image source={{uri: item.cover}} style={{width: Dimensions.get('window').width/2-25, height: 165,  borderRadius: 20}}/>
          <View style={{width: Dimensions.get('window').width/2-25, height: 40, marginTop: -40, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
          </View>
          <View style={{marginTop:-35}}>
            <Text numberOfLines={1} style={{marginTop: 8, paddingLeft: 10, paddingRight: 10,color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold',   fontSize: 13}}>{item.title}</Text>
          </View>
          
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
        <View style={{ flexDirection: 'row', alignItems: 'center',}}>
        <TouchableOpacity onPress={() => navigation.navigate("Today1")} style={{width: 40, height: 40, left: 15, marginBottom: -12, }} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
        <Text style={{  fontSize: 25, color: '#0D0D0D', fontWeight: 'bold', left: 20, marginTop: -5}} >Discover</Text>
      
        </View>
          
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.featured_id.toString()}
        style={{marginTop: 15, marginBottom: 130}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      
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

export default Discover;