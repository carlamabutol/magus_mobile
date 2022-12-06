import React, { useState, useEffect, useContext } from "react";
import { TextInput, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const PlaylistMagusSpecific =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [list, setList] = useState(false);
  const [data1, setData1] = useState([]);
  const [data11, setData11] = useState([]);
  const [data10, setData10] = useState([]);
  const [array, setArray] = useState([]);
  const [text, setText] = useState('');
  const [index, setIndex] = useState('');
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  useEffect(() => {
    if(text==""){
      setData10([])
    }
    
    fetch1()
    fetchData11()
  }, []);
  const fetch1=async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.playlist_id);
    const data1 = await resp.json();
    if(data1.tracks==undefined){
      setList(false)
    }else{
      setList(true)
      setData(getDifference(global.data,data1.tracks))
      global.list=getDifference(global.data,data1.tracks)
    }
  }
  const fetchData11 = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist");
    const data1 = await resp1.json();
    const index =data1.findIndex(object => {
      return object.playlist_id === global.playlist.playlist_id;
    })
    setData11(data1)
    setIndex(index)
  };
  const search = async(text)=>{
    if(text==''){
      setData10([])
    }
    else{
    await fetch(`https://dev.magusaudio.com/api/v1/playlist/search`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({user_id: global.id, search: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData10(getDifference1(getDifference(global.data, result[0]), data11[index].info))
      })
    }
  }

  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.title;
      });
    });
  }
  
  function getDifference1(array1,array2){
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.subliminal_id == object2.subliminal_id;
      });
    });
  }
  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.playlist_id);
    const data1 = await resp.json();
    if(data1.tracks==undefined){
      setList(true)
    }else{
      setList(true)
      setData(getDifference(global.data,data1.tracks))
      global.list=getDifference(global.data,data1.tracks)
    }
  };
  const texting =(text)=>{
    if(text==""){
      setData10([])
      setText('')
    }else if(text!=""){
      setText(text)
      search(text)
    }
  }
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
          fetchData11()
          setData10([])
          setText('')
          return updateError("Subliminal successfully added to playlist!", setError);
          
      })
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 90
    }
    else{
      return 160
    }
  }
  const deleting=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({subliminal_id: item.subliminal_id, playlist_id: global.playlist.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          fetchData()
          fetchData11()
          search('')
          return updateError("Subliminal successfully deleted!", setError);
      })
  }
  const play1=()=>{

    global.playlist=true
    global.cover=global.list[0].cover
    global.location="NotToday"
    global.title=global.list[0].title
    global.subs_id=global.list[0].subliminal_id
    global.category=global.list[0].category.name
    global.list=data
    global.count=1
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.count=1
      global.value="MINIMIZE"
      
    }else{global.count=1}
    setSubliminal(global.list[0])
    global.category=global.list[0].category.name
    for(var i=0; i<global.list[0].info.length; i++){
      if( global.list[0].info.length==2){
        global.track1=global.list[0].info[0].track_id;
        global.volume1= global.list[0].info[0].volume/100
        global.type1=global.list[0].info[0].audio_type.name;
        
        global.track2=global.list[0].info[1].track_id;
        global.volume2= global.list[0].info[1].volume/100
        global.type2=global.list[0].info[1].audio_type.name;
        
      }else if(global.list[0].info.length==3){
        global.track1=global.list[0].info[0].track_id;
        global.volume1= global.list[0].info[0].volume/100
        global.type1=global.list[0].info[0].audio_type.name;
        
        global.track2=global.list[0].info[1].track_id;
        global.volume2= global.list[0].info[1].volume/100
        global.type2=global.list[0].info[1].audio_type.name;

        global.track3=global.list[0].info[2].track_id;
        global.volume3= global.list[0].info[2].volume/100
        global.type3=global.list[0].info[2].audio_type.name;
        
      }else if(global.list[0].info.length==4){
        global.track1=global.list[0].info[0].track_id;
        global.volume1= global.list[0].info[0].volume/100
        global.type1=global.list[0].info[0].audio_type.name;
        
        global.track2=global.list[0].info[1].track_id;
        global.volume2= global.list[0].info[1].volume/100
        global.type2=global.list[0].info[1].audio_type.name;

        global.track3=global.list[0].info[2].track_id;
        global.volume3= global.list[0].info[2].volume/100
        global.type3=global.list[0].info[2].audio_type.name;

        global.track4=global.list[0].info[3].track_id;
        global.volume4= global.list[0].info[3].volume/100
        global.type4=global.list[0].info[3].audio_type.name;
      }
    }
    global.length=global.list[0].info.length;
}
  const play = (item)=>{
    global.playlist=false

    if(global.subs_id!=item.subliminal_id){
    const object = global.data.find(obj => obj.subliminal_id === item.subliminal_id);
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
  const myList=()=>{
    if(list==false){
      return(
        <>
        <View style={{marginTop: 20}}>
          <View style={{ padding: 10, borderRadius: 10, width: width-40, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ padding: 10, borderRadius: 10, width: width-60, justifyContent: 'center', alignItems: 'center'}}>
              <TextInput placeholder="Add Subliminal to Playlist"  autoComplete={true} autoCorrect={true} autoFocus={false} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-50,height: 30,  fontSize: 14, fontWeight: 'bold', marginTop: 3, textAlign: 'center' }}/>
              <View style={{height:2, backgroundColor: 'gray', width: width-50, marginTop: 10}}></View>
            </View>
            <View style={{width: width-40, alignSelf: 'center', height: 108}}>
              <FlatList
                data={data10}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                    <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                    
                    <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                      <View>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16, marginBottom: 5}}>{item.title}</Text>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D',  fontSize: 13,}}>{item.category.name}</Text>
                      </View>
                    </View>
                    
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title}
                style={{marginTop: 10, marginBottom:30, padding: 1}}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
        </View>

        </>
      )
    }else{
      return(
        <>
          <TouchableOpacity onPress={()=> play1()} style={{backgroundColor: '#04afd9', marginLeft: 20, marginRight: 20, width: width-40, borderRadius: 10, padding: 8, marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/347/347941.png"}} style={{width:33, height: 33, tintColor: 'white'}}/>
            <Text style={{ color: 'white', fontWeight: 'bold',   fontSize: 18, marginLeft: 15}}>Play</Text>
          </TouchableOpacity>
            <View style={{width: width-40, alignSelf: 'center',height: 249}}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> play(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                    <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                    
                    <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                      <View>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16, marginBottom: 5}}>{item.title}</Text>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D',  fontSize: 13,}}>{item.category.name}</Text>
                      </View>
                      <TouchableOpacity  onPress={()=> deleting(item)} style={{marginRight: -30, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 1, shadowOffset: {width: 1, height: 1}}}>
                        <Image source={require('../../assets/me/delete.png')} style={{width: 25, height: 25, tintColor: 'black',}}/>
                      </TouchableOpacity>
                    </View>
                    
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title}
                style={{marginTop: 10, marginBottom: 30, padding: 1}}
                showsVerticalScrollIndicator={true}
              />
            </View>

            <View style={{ padding: 10, borderRadius: 10, width: width-60, justifyContent: 'center', alignItems: 'center'}}>
              <TextInput placeholder="Search to Add Subliminal"  autoComplete={true} autoCorrect={true} autoFocus={false} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-50,height: 30,  fontSize: 14, fontWeight: 'bold', marginTop: 3, textAlign: 'center' }}/>
              <View style={{height:2, backgroundColor: 'gray', width: width-50, marginTop: 10}}></View>
            </View>
            
            <View style={{width: width-40, alignSelf: 'center', height: 108}}>
              <FlatList
                data={data10}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                    <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                    
                    <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                      <View>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16, marginBottom: 5}}>{item.title}</Text>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D',  fontSize: 13,}}>{item.category.name}</Text>
                      </View>
                    </View>
                    
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title}
                style={{marginTop: 10, marginBottom:30, padding: 1}}
                showsVerticalScrollIndicator={true}
              />
            </View>
        </>
      )
    }
  }
  return(
    <ImageBackground source={require('../../assets/homebg.png')} style={{width: width, height: height}}>
      <TouchableOpacity onPress={() => navigation.navigate("Playlist")} style={{width: 40, height: 40, left: 15, marginTop: 48}} >
        <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26, marginLeft: 10}} />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Image source={{uri: global.playlist.cover}} style={{width: width/2.5, height: width/2.5, borderRadius: 20, alignSelf: 'center'}} />
        <Text numberOfLines={1}style={{color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, marginTop: 10, paddingLeft: 30, paddingRight: 30 , textAlign: 'center' }}>{global.playlist.title}</Text>
        {myList()}        
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

export default PlaylistMagusSpecific;