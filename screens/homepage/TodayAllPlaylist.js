import React, { useState, useEffect, useContext } from "react";
import { ScrollView, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { array } from "yup";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const TodayAllPlaylist =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([])
  const [liked, setLiked] = useState('')
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchData = async () => {
    console.log(global.playlist.featured_id)
    if(global.playlist.featured_id!=undefined){
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.featured_id);
    const data5 = await resp.json();
    setData(getDifference(global.data, data5.tracks));
    global.list=getDifference(global.data, data5.tracks)
    }else{
      const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.playlist_id);
      const data5 = await resp.json();
      setData(getDifference(global.data, data5.tracks));
      global.list=getDifference(global.data, data5.tracks)
    }
  };
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.title;
      });
    });
  }
  const play=()=>{

      global.playlist=true
      global.cover=global.list[0].cover
      global.location="NotToday"
      global.title=global.list[0].title
      global.subs_id=global.list[0].subliminal_id
      global.category=global.list[0].category.name

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

  useEffect(() => {
    findLiked()
    fetchData();
  }, []);

  const renderItem1= ({ item }) => {
    
    return (
      <View style={{ flexDirection: 'row', width: width-40, marginTop: 10, alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 15,}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderRadius: 10,shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.5 }}/>
        </View>
        <View style={{width: width-100, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
          <View>
            <Text numberOfLines={1}style={{width: width-170, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16, marginBottom: 5}}>{item.title}</Text>
            <Text numberOfLines={1}style={{width: width-170, color: '#0D0D0D',  fontSize: 13,}}>{item.category.name}</Text>

          </View>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/8032/8032471.png'}} style={{ paddingRight: 10, width: 35, height: 35,  tintColor: 'white', backgroundColor: 'rgba(4,157,217,1)', borderRadius: 50 }} />
        </View>
        
      </View>
    );
  };
  const addlistToPlaylist =async (item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: '', moods_id: item.moods_id,
        user_id: global.id, featured_id: item.featured_id, title: item.title
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      if(result.message != 'success'){
        setColor('red')
        return updateError("Playlist already added as own playlist!", setError); 
      }else{
        setColor('white')
        return updateError("Playlist successfully added as own playlist!", setError); 
      }
    })
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return height/2.6
    }
    else{
      return height/2.8
    }
  }
  const findLiked=async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/liked/playlist/"+global.id);
    const data5 = await resp.json();
    const index =data5.findIndex(object => {
      return object.title === global.playlist.title;
    })
    if(index!=-1){
      global.myPlaylist_liked=true
      setLiked(data5[index].playlist_id)
    }else{
      global.myPlaylist_liked=false
      setLiked("")
    }
  }
  const likeOrNot=async()=>{
    if(global.myPlaylist_liked==true){
      await fetch(`https://dev.magusaudio.com/api/v1/liked/playlist/delete`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: liked, 
          user_id: global.id
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()
      })
    }else{
      await fetch(`https://dev.magusaudio.com/api/v1/liked/playlist-info/add`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: "",  featured_id: global.playlist.featured_id,
          user_id: global.id, title: global.playlist.title, 
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()

      })
    }
  }
  const isLiked1=()=>{
    if(global.myPlaylist_liked==true){
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} >
          <View style={{marginTop: 38,width: 38, height: 38, right: 20, borderColor: 'white', borderRadius: 30, borderWidth: 1.5, backgroundColor: '#049DD9' }}>
            <Image source={require('../../assets/playing/heart.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'white'}} />
          </View>
        </TouchableOpacity>
      )
    }else if(global.myPlaylist_liked==false){
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} >
          <View style={{marginTop: 38,width: 38, height: 38, right: 20, borderColor: 'white', borderRadius: 30, borderWidth: 1.5, }}>
            <Image source={require('../../assets/playing/heart.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'white'}} />
          </View>
        </TouchableOpacity>
      )
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
        <TouchableOpacity onPress={() => navigation.navigate(global.myLocation)} style={{width: 40, height: 40, left: 10,marginTop: 48}} >
          <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26, marginLeft: 10}} />
        </TouchableOpacity>
          {isLiked1()}
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: global.playlist.cover}} style={{width: width/2.5, height: width/2.5, borderRadius: 20}} />
        <Text numberOfLines={1}style={{color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, marginTop: 10, paddingLeft: 30, paddingRight: 30 , textAlign: 'center' }}>{global.playlist.title}</Text>
        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={()=> addlistToPlaylist(global.playlist)} style={{backgroundColor: '#049DD9', width: width-40, borderRadius: 10, padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', }}>
            <Image  source={require('../../assets/playing/add_playlist.png')}  style={{width:40, height: 40, tintColor: 'white'}}/>
            <Text style={{ color: 'white', fontWeight: 'bold',   fontSize: 18, marginLeft: 15}}>Add to My Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> play()} style={{backgroundColor: '#04afd9', width: width-40, borderRadius: 10, padding: 8, marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/347/347941.png"}} style={{width:33, height: 33, tintColor: 'white'}}/>
            <Text style={{ color: 'white', fontWeight: 'bold',   fontSize: 18, marginLeft: 15}}>Play</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{height:space(), marginTop: 10}}>
          <FlatList
            data={data}
            renderItem={renderItem1}
            keyExtractor={(item) => item.title}
            style={{marginLeft: 20, marginRight: 20, borderRadius: 10, padding: 0}}
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

export default TodayAllPlaylist;
/*<FlatList
            data={all}
            renderItem={renderItem1}
            keyExtractor={(item) => item}
            style={{marginLeft: 20, marginRight: 20, paddingLeft: 3, paddingTop: 3,}}
            showsVerticalScrollIndicator={false}
          />
           */