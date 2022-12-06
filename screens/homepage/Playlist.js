import React, { useState, useEffect, useContext } from "react";
import { TextInput, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const Playlist =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [unmount, setUnmount] = useState(true);
  const [one, setOne] = useState(true);
  const [text, setText] = useState("");
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  useEffect(()=>{
    fetchData1()
    return()=> setUnmount(false)
  }, [data]);
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
          fetch1()
          setText('')
          return updateError('Playlist successfully added!', setError);
        }else{
          fetch1();
          setText('')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }
  }
  const fetchData1 = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
    const data1 = await resp1.json();
    if(data1.length!=0){
      if(unmount){setData(data1);}
      setOne(true)
    }
    else{
      setOne(false)
    }
  };
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
  
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="Favorites"
    navigation.navigate("TodayPlaylist")
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 90
    }
    else{
      return 160
    }
  }
  const fetch1=async()=>{
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
      const data1 = await resp1.json();
      if(data1.length!=0){
        setData(data1)
        setOne(true)
      }else{
        setOne(false)
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
      fetch1()
      return updateError('Playlist Successfully Deleted!', setError);
    })
  }
  const adding=async(item)=>{
    global.playlist=item
    navigation.navigate("PlaylistMagusSpecific")
  }
  const playlistCount=()=>{
    if(one==true){
      return(
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> adding(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
            <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
            
            <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
              <View>
                <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16,}}>{item.title}</Text>
              </View>
              <TouchableOpacity  onPress={()=> deleting(item.playlist_id)} style={{marginRight: -30, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 1, shadowOffset: {width: 1, height: 1}}}>
                <Image source={require('../../assets/me/delete.png')} style={{width: 25, height: 25, tintColor: 'black',}}/>
              </TouchableOpacity>
            </View>
            
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
        style={{marginTop: 10, marginBottom:30, padding: 1, marginBottom: 200}}
        showsVerticalScrollIndicator={false}
      />
      )
    }else{
      return(
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <View style={{ width: width/1.3, alignSelf: 'center', marginTop: height/3.5 }}>
            <TextInput placeholder="Enter Playlist Name"  autoComplete={true} autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: 35,   fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 3, }}/>
            <View style={{backgroundColor: 'gray', height: 2, width: width/1.3, marginTop: 0}}></View>
          </View>
          <View style={{justifyContent: 'center', width: width, alignItems: 'center', marginTop: 20}} >
            <TouchableOpacity onPress={()=> createPlaylist(text)} style={{width: width/1.3, borderColor: 'rgba(4,157,217,1)', borderRadius: 15, borderWidth: 1.5, padding: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../assets/playing/plus.png')} style={{width: 24, height: 24, marginTop: 0, marginLeft: 6, tintColor: 'rgba(4,157,217,1)', }} />
              <Text style={{  fontSize: 20, color: 'rgba(4,157,217,1)', marginLeft: 10, fontWeight: 'bold' }} >Create New Playlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  return(
    
    <ImageBackground source={require('../../assets/homebg.png')} style={{width: width, height: height}}>
      <View style={{flexDirection: 'row', marginTop: 48, left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigation.navigate("MeFree1")} style={{width: 40, height: 40}} >
              <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setOne(false)} style={{}} >
              <View style={{width: 38, height: 38, marginTop: -7, marginRight:5, borderColor: 'white', borderRadius: 30, borderWidth: 1.5 }}>
                <Image source={require('../../assets/playing/add_playlist.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'white'}} />
              </View>
            </TouchableOpacity>
          </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: 23, color: '#0D0D0D', fontWeight: 'bold', }} >Playlists</Text>
        </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <View style={{backgroundColor: 'white', width: 120, height: 38, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'rgba(4,157,217,1)', fontWeight: 'bold', fontSize: 13, justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>By You</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate("PlaylistMagus")} style={{backgroundColor: 'rgba(4,157,217,1)', width: 120, height: 38, borderRadius: 15, flexDirection: 'row',justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'white', fontWeight: 'bold', fontSize: 13, justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>By Magus</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: width-40, alignSelf: 'center', marginBottom: 160}}>
      {playlistCount()}
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

export default Playlist;