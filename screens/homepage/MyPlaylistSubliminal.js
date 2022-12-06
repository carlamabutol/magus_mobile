import React, { useState, useEffect, useContext } from "react";
import { ScrollView, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";

const MyPlaylistSubliminals =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.playlist_id);
    const data1 = await resp.json();
    setData(data1);
  };
  function getDifference(array1,array2){
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.subliminal_id == object2;
      });
    });
  }
  useEffect(() => {
    fetchData()
    global.idea = getDifference(global.data , global.playlist.subliminals);
  }, []);
  const deleting=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({subliminal_id: item.track_id, playlist_id: global.playlist.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          fetchData()
          const index =result.data.findIndex(object => {
            return object.id === global.playlist.id;
          })
          global.idea = getDifference(global.data, result.data[index].subliminals)
          
          setColor('white')
          return updateError("Subliminal successfully deleted!", setError);
      })
  }
  const renderItem2= ({ item }) => {
    return (
      <TouchableOpacity onLongPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
      <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
      
      <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
        <View>
          <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16}}>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={()=> [global.playlist=item, global.myLocation="FavoritesMagus", navigation.navigate("TodayAllPlaylist")]} style={{marginRight: -30}}>
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32,alignSelf: 'flex-end', tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
        </TouchableOpacity>
      </View>
      
    </TouchableOpacity>
    );
  };
  const addToPlaylist=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({featured_id: item.subliminal_id, playlist_id: global.playlist.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          fetchData()
          const index =result.data.findIndex(object => {
            return object.id === global.playlist.id;
          })
          global.idea = getDifference(global.data, result.data[index].subliminals)
          
          setColor('white')
          return updateError("Subliminal successfully added!", setError);
      })
  }
  const heightPic=()=>{
    if(data.tracks== undefined){
      return 0
    }else{
      return 140
    }
  }
  const picHeight=()=>{
    if(data.tracks== undefined){
      return width/2
    }else{
      return width/3
    }
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 2
    }
    else{
      return 60
    }
  }
  const playAll=()=>{
    if(data.tracks==undefined){
      return(
        <View style={{marginTop: 10}}>
          <View style={{ padding: 10, borderRadius: 10, width: width-60, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput style={{ color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, marginLeft: 15}} placeholder="Add Subliminal to Playlist"/>
            <View style={{height:2, backgroundColor: 'gray', width: width-100, marginTop: 10}}></View>
          </View>
        </View>
      )
    }
    else{
      
    }
  }
  const space1=()=>{
    if(global.value!="MINIMIZE"){
      return 90
    }
    else{
      return 160
    }
  }
  return(
    <ImageBackground source={require('../../assets/homebg.png')} style={{width: width, height: height}}>
      <TouchableOpacity onPress={() => [navigation.navigate("Playlist"),]} style={{width: 40, height: 40, left: 15, marginTop: 48}} >
        <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26,}} />
      </TouchableOpacity>
      <View style={{height: height/2.6, alignItems: 'center', justifyContent: 'center', marginTop: -20}}>
        <Image source={{uri: global.playlist.cover}} style={{width: picHeight(), height: picHeight(), borderRadius: 20}} />
        <Text numberOfLines={1}style={{color: '#0D0D0D', fontWeight: 'bold',   fontSize: 23, marginTop: 10 }}>{global.playlist.title}</Text>
        <View style={{height: heightPic(), marginTop: 10}}>
        <FlatList
        data={data.tracks}
        renderItem={({ item }) => (
          
          <TouchableOpacity onLongPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
            <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
            
            <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
              <View>
                <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16}}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={()=> [global.playlist=item, global.myLocation="FavoritesMagus", navigation.navigate("TodayAllPlaylist")]} style={{marginRight: 30}}>
                <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32,alignSelf: 'flex-end', tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
              </TouchableOpacity>
            </View>
            
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
        style={{marginTop: 10, marginBottom:30, padding: 1}}
        showsVerticalScrollIndicator={false}
      />
        </View>
        <View style={{marginTop: 10}}>
          <View style={{ padding: 10, borderRadius: 10, width: width-60, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput style={{ color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, textAlign: 'center'}} placeholder="Add Subliminal to Playlist"/>
            <View style={{height:2, backgroundColor: 'gray', width: width-100, marginTop: 10}}></View>
          </View>
        </View>
        
        <View style={{width: width, height: 75, marginBottom: -height/2.5,}}>
        <FlatList
          data={global.idea}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> addToPlaylist(item) } style={{ width: width/1.2, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10,shadowOpacity: 0.5, shadowOffset: {width: 0.5, height: -.05}, shadowColor: 'rgba(4,157,217,.8)', }}>
              <Image source={{uri: item.cover}} style={{width: 50, height: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
              <View style={{width: width/1.2-60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text numberOfLines={1}style={{ width:width/1.2-80, marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, }}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
          style={{height: 70, marginTop: 10, alignSelf: 'center', padding: 10}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </View>
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
}

export default MyPlaylistSubliminals;
/*<View style={{width: width, height: height/2.75, marginBottom: -height/2.75,}}>
      <FlatList
          data={global.set}
          renderItem={({ item }) => (
            <View style={{ width: width/1.2, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10,shadowOpacity: 0.5, shadowOffset: {width: 0.5, height: -.05}, shadowColor: 'rgba(4,157,217,.8)', }}>
              <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
              <View style={{width: width/1.2-60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text numberOfLines={2}style={{width:width/2.7, marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold', fontFamily: 'Helvetica Neue', fontSize: 15, }}>{item.title}</Text>
                
              </View>
              
            </View>
          )}
          keyExtractor={(item) => item.title}
          style={{height: 70, marginTop: 10, backgroundColor: 'red', marginBottom: 10, alignSelf: 'center', padding: 10}}
          showsVerticalScrollIndicator={false}
        />
      </View> */