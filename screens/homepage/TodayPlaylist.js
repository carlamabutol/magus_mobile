import React, { useState, useEffect, useContext } from "react";
import { TextInput, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";

const TodayPlaylist =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
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
  }
  useEffect(() => {
    fetchData()
    
   }, []);
  const addToNewPLaylist = async (item, text) =>{
    if(text!=""){
      await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({moods_id: item.moods_id,
        user_id: global.id, title: text, featured_id: item.featured_id
      })
      })
      .then(res =>{
        return res.json();
      })
      .then(async (result) =>{
        if(result.message=="success"){
          setColor('white')
          fetchData();
          setText('')
          return updateError("Subliminal successfully added to playlist!", setError);
        }else{
          fetchData();
          setColor('red')
          setText('')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }else{
      fetchData();
      setColor('red')
      return updateError("Please enter playlist name!", setError);
 
    }
  }
  const addToOldPlaylist = async (item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({featured_id: global.playlist.featured_id, playlist_id: item.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        const index =result.data.findIndex(object => {
          return object.id === item.id;
        })
        if(item.subliminal_count==result.data[index].subliminal_count){
          fetchData()
          setColor('red')
          return updateError("Subliminal is already part of this playlist!", setError);
        }else{
          fetchData()
          setColor('white')
          return updateError("Subliminal successfully added!", setError);
        }
      })
    fetchData()
  }
  const noData =()=>{
    if(data.length>=5){
      return height/3.5
    }
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 90
    }
    else{
      return 160
    }
  }
  return(
    <ImageBackground source={require('../../assets/homebg.png')} style={{width: width, height: height}}>
      <TouchableOpacity onPress={() => navigation.navigate(global.myLocation)} style={{width: 40, height: 40, left: 15, marginTop: 48}} >
        <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26, marginLeft: 10}} />
      </TouchableOpacity>
      <View style={{height: height/3.2, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: global.playlist.cover}} style={{width: width/2.5, height: width/2.5, borderRadius: 20}} />
        <Text numberOfLines={1}style={{color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, marginTop: 10, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>{global.playlist.title}</Text>
      </View>

      <View style={{padding: 15, alignItems: 'center', justifyContent: 'center', height: noData()}}>
        <FlatList
          data={data}
          renderItem={({ item }) => (          
            <TouchableOpacity onPress={()=> addToOldPlaylist(item)} style={{ height:50, width: width/1.3, flexDirection: 'row', marginBottom: 10, shadowColor: 'gray',  borderColor: 'gray', borderBottomWidth: 0.5}}>
              <Image source={{uri: item.cover}} style={{width: 45, height: 45, borderRadius: 30, marginBottom: 5, marginLeft: 10}}/>
              <View style={{ width: width-90, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5}}>
                <Text numberOfLines={1}style={{ marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 14, }}>{item.title}</Text>
              </View>
              
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.playlist_id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{ width: width/1.3, alignSelf: 'center', }}>
        <TextInput placeholder="Enter Playlist Name"  autoComplete={true} autoCorrect={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: 35,   fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 3, }}/>
        <View style={{backgroundColor: 'gray', height: 2, width: width/1.3, marginTop: 0}}></View>
      </View>
      <View style={{width: width/1.3, alignSelf: 'center', marginTop: 25, marginBottom: 200}}>
        <TouchableOpacity onPress={()=> addToNewPLaylist(global.playlist, text)} style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', backgroundColor: '#049DD9', borderRadius: 15 }}>
          <Text style={{ color: '#0D0D0D', fontWeight: 'bold', textAlign: 'center',  fontSize: 17}}>Add to New Playlist</Text>
        </TouchableOpacity>
      </View>
        {error ? (
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end',bottom: space(), position: 'absolute', width: Dimensions.get('window').width, height: 30, shadowOpacity: 0.2, alignSelf: 'center'}}>
            <View style={{position: "absolute", }}>
              <TouchableOpacity style={{backgroundColor: 'rgba(67,156,212,0.9)',width: Dimensions.get('window').width, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize: 14, justifyContent: 'center', fontWeight: 'bold', alignSelf: 'center', color: 'white',  padding: 7, }}>{error}</Text>
              </TouchableOpacity>
            </View>
          </View>):null}
    </ImageBackground>
  )
}

export default TodayPlaylist;