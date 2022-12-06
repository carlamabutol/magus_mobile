import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import React from 'react';
import { TextInput, ImageBackground, Modal, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect, useContext } from "react";
import arrayShuffle from 'array-shuffle';
const MySubs = ({navigation}) => {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [ID, setID] = useState(global.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  
  const play = (item)=>{
    global.playlist=false

    if(global.subs_id!=item.subliminal_id){
    const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
    global.subs_id=item.subliminal_id
    global.cover=item.cover
    global.title=item.title
    global.category=item.category.name
    global.location="NotToday"
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.value="MINIMIZE"
    }
    setSubliminal(item)
    global.count=1
    for(var i=0; i<item.info.length; i++){
      global.length=item.info.length;
      if(item.info.length==2){
        global.track1=item.info[0].track_id;
        global.volume1=item.info[0].audio_type.volume/100;
        global.type1=item.info[0].audio_type.name;
        global.track2=item.info[1].track_id;
        global.volume2=item.info[1].audio_type.volume/100;
        global.type2=item.info[1].audio_type.name;

      }else if(item.info.length==3){
        global.track1=item.info[0].track_id;
        global.volume1=item.info[0].audio_type.volume/100;
        global.type1=item.info[0].audio_type.name;
        global.track2=item.info[1].track_id;
        global.volume2=item.info[1].audio_type.volume/100;
        global.type2=item.info[1].audio_type.name;
        global.track3=item.info[2].track_id;
        global.volume3=item.info[2].audio_type.volume/100;
        global.type3=item.info[2].audio_type.name;

      }else if(item.info.length==4){
        global.track1=item.info[0].track_id;
        global.volume1=item.info[0].audio_type.volume/100;
        global.type1=item.info[0].audio_type.name;
        global.track2=item.info[1].track_id;
        global.volume2=item.info[1].audio_type.volume/100;
        global.type2=item.info[1].audio_type.name;
        global.track3=item.info[2].track_id;
        global.volume3=item.info[2].audio_type.volume/100;
        global.type3=item.info[2].audio_type.name;
        global.track4=item.info[3].track_id;
        global.volume4=item.info[3].audio_type.volume/100;
        global.type4=item.info[3].audio_type.name;

      }
    }
  }
  };
  
  
  useEffect(() => {
   setData(global.data)
   
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="MySubs"
    navigation.navigate("TodayPlaylist")
  }
  const renderItem= ({ item }) => {
    return (
      <ImageBackground style={{backgroundColor: 'white', width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: 12, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20}}>
      <TouchableOpacity onPress={()=> play(item)} onLongPress={()=> addToPlaylist(item)} style={{ width: Dimensions.get('window').width/2-25,borderRadius: 20, }}>
        <Image source={{uri: item.cover}} style={{width: Dimensions.get('window').width/2-25, height: 160, borderRadius:20}}/>
        <View style={{width: Dimensions.get('window').width/2-25, height: 50, marginTop: -50, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
        </View>
        <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{}}>
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32,alignSelf: 'flex-end', marginTop: -Dimensions.get('window').width/2.9, tintColor: 'white', shadowColor: 'black', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
        </TouchableOpacity>

        <View style={{marginTop:-53}}>
          <Text numberOfLines={1} style={{ marginTop: 8, paddingLeft: 10, paddingRight: 10,color: 'white', fontWeight: 'bold',   fontSize: 14, flex:1}}>{item.title}</Text>
        </View>
        <View style={{width: Dimensions.get('window').width/2-25,justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text numberOfLines={1} style={{marginTop: 3, paddingLeft: 10, color: 'white',   fontSize: 10, width: Dimensions.get('window').width/2-68 }}>{item.category.name}</Text>
          <Text style={{marginTop: 3, paddingRight: 10, color: 'white',   fontSize: 10, marginBottom: 10 }}>1:00</Text>
          
        </View>
      </TouchableOpacity>
    </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
      <View style={{left: 20, marginTop: -8, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
        <Text style={{  fontSize: 23, color: '#0D0D0D', fontWeight: 'bold', }} >My Subs</Text>
          <TouchableOpacity onPress={()=> [navigation.navigate('MysubsSearch'), global.location="MysubsSearch"]} style={{}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: 35, height: 35, marginBottom: -5, tintColor: 'black'}} />
          </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.title}
        style={{marginTop: 15, marginBottom: 130,}}
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

export default MySubs;