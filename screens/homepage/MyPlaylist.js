import React, { useState, useEffect, useRef } from 'react';
import { Modal,FlatList, SafeAreaView, View, BottomSheet, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import { LogBox } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from '../../app/components/FormInput';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import Swipeable from 'react-native-gesture-handler/Swipeable';
 
const MyPlaylist = ({navigation}) => {
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [text, setText] = useState('')
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [color, setColor] = useState('white');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchData= async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
    const data = await resp.json();
    setData(data)
    //console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, []);
  const createPlaylist = async (text)=>{
    if(text==""){
      setColor('red')
      return updateError('Please enter playlist name to add!', setError);
    }else{
      await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({moods_id: "",
        user_id: global.id, title: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then(async (result) =>{
        if(result.message=="success"){
          fetchData()
          setText('')
          setColor('rgba(4,157,217,1)')
          return updateError('Playlist successfully added!', setError);
        }else{
          fetchData();
          setColor('red')
          setText('')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }
  }
  const deleting= async(item)=>{
    //console.log(item)
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist/delete/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({playlist_id: item,
        user_id: global.id
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      setText('')
      fetchData();
      setColor('rgba(4,157,217,1)')
      return updateError('Playlist Successfully Deleted!', setError);
    })
  }
  const adding=async(item)=>{
    global.playlist=item
    navigation.navigate("MyPlaylistSubliminals")
  }
  const space1=()=>{
    if(global.value!="MINIMIZE"){
      return 90
    }
    else{
      return 160
    }
  }
  const withPlaylist=()=>{
    if(data.length==0){
      return (
        <>
          <View style={{flexDirection: 'row', marginTop: 48, left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigation.navigate("MeFree1")} style={{width: 40, height: 40}} >
              <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
            </TouchableOpacity>
          </View>
          <View style={{ width: width/1.3, alignSelf: 'center', marginTop: height/3.5 }}>
            <TextInput placeholder="Enter Playlist Name"  autoComplete={true} autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: 35,   fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 3, }}/>
            <View style={{backgroundColor: 'gray', height: 2, width: width/1.3, marginTop: 0}}></View>
          </View>
          <View style={{justifyContent: 'center', width: width, alignItems: 'center', marginTop: 20}} >
            <TouchableOpacity onPress={()=> createPlaylist(text)} style={{width: width/1.3, borderColor: 'rgba(4,157,217,1)', borderRadius: 15, borderWidth: 1.5, padding: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../assets/playing/plus.png')} style={{width: 24, height: 24, marginTop: 0, marginLeft: 6, tintColor: 'rgba(4,157,217,1)'}} />
              <Text style={{  fontSize: 20, color: 'rgba(4,157,217,1)', marginLeft: 10, fontWeight: 'bold' }} >Create New Playlist</Text>
            </TouchableOpacity>
          </View>
        </>
      )
    }else{
      return(
        <>
          <View style={{flexDirection: 'row', marginTop: 48, left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigation.navigate("MeFree1")} style={{width: 40, height: 40}} >
              <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setData([])} style={{}} >
              <View style={{width: 38, height: 38, marginTop: -7, marginRight:5, borderColor: 'rgba(4,157,217,1)', borderRadius: 30, borderWidth: 1.5 }}>
                <Image source={require('../../assets/playing/add_playlist.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'rgba(4,157,217,1)'}} />
              </View>
            </TouchableOpacity>
          </View>
      
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{ width: width/1.2, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10,shadowOpacity: 0.5, shadowOffset: {width: 0.5, height: -.05}, shadowColor: 'rgba(4,157,217,.8)', }}>
                <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                <View style={{width: width/1.2-60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text numberOfLines={1}style={{width:width/2.7, marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, }}>{item.title}</Text>
                  <View style={{flexDirection: 'row',  justifyContent: 'space-between', marginRight:20}}>
                    <TouchableOpacity onPress={()=> adding(item)}>
                      <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/1828/1828926.png"}} style={{width: 25, marginLeft: 10, marginRight: 10,height: 25, marginRight: 10, tintColor: 'rgba(4,157,217,1)'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> deleting(item.playlist_id)}>
                      <Image source={require('../../assets/me/delete.png')} style={{width: 25, height: 25, marginLeft: 10,marginRight: 10, tintColor: 'red',}}/>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </View>
            )}
            keyExtractor={(item) => item.playlist_id}
            style={{height: 70, marginTop: 10,  marginBottom: 30, alignSelf: 'center', padding: 4}}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )
    }
  }
  return(
    <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
      {withPlaylist()}
      {error ? (
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end',bottom: space1(), position: 'absolute', width: Dimensions.get('window').width, height: 30, shadowOpacity: 0.2, alignSelf: 'center'}}>
            <View style={{position: "absolute", }}>
              <TouchableOpacity style={{backgroundColor: 'rgba(67,156,212,0.9)',width: Dimensions.get('window').width, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',  padding: 7, }}>{error}</Text>
              </TouchableOpacity>
            </View>
          </View>):null}
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default MyPlaylist;
