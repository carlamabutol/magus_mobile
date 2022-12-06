LogBox.ignoreAllLogs();
import { Dimensions,Animated, Modal, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity, Text, View, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNuavigator } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import Search from './Search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import MySubs from './Mysubs';
import Recommended from './Recommended';
import Discover from './Discover';
import Featured from './Featured';
import Featured_Track from './Featured_Track';
import Discover_Track from './Discover_Track';
import { UserContext } from '../UserContext';
import { StateContext } from '../StateContext';
import SearchCategory from './SearchCategory';
import SearchIcon from './SearchIcon';
import {Audio} from "expo-av";
import FormContainer from '../../app/components/FormContainer';
import MySubsSearch from './MysubsSearch';
import arrayShuffle from 'array-shuffle';
import MeFree from './MeFree';
import Today from './Today';
import Recommended_Track from './Recommended_Track';
import TodayAllPlaylist from './TodayAllPlaylist';
import TodayPlaylist from './TodayPlaylist';
import MyPlaylist from './MyPlaylist';
import Favorites from './Favorites';
import FavoritesMagus from './FavoritesMagus';
import Playlist from './Playlist';
import PlaylistMagus from './PlaylistMagus';
import PlaylistMagusSpecific from './PlaylistMagusSpecific';
import MyPlaylistSubliminals from './MyPlaylistSubliminal';
const Tab= createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const PlayStack=()=>{
  return(
    <Stack.Navigator initialRouteName='MySubs' screenOptions={{headerShown: false}}>
      <Stack.Screen name='MySubs' component={MySubs}/>
      <Stack.Screen name='Featured' component={Featured}/>
      <Stack.Screen name='MysubsSearch' component={MySubsSearch}/>
      <Stack.Screen name='TodayPlaylist' component={TodayPlaylist}/>

    </Stack.Navigator>
  )
}
const PlayStack2=()=>{
  return(
    <Stack.Navigator initialRouteName='Today1' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Today1' component={Today}/>
      <Stack.Screen name='Featured_Track' component={Featured_Track}/>
      <Stack.Screen name='Discover_Track' component={Discover_Track}/>
      <Stack.Screen name='Featured' component={Featured}/>
      <Stack.Screen name='Recommended' component={Recommended}/>
      <Stack.Screen name='Recommended_Track' component={Recommended_Track}/>
      <Stack.Screen name='Discover' component={Discover}/>
      <Stack.Screen name='TodayAllPlaylist' component={TodayAllPlaylist}/>
      <Stack.Screen name='TodayPlaylist' component={TodayPlaylist}/>

    </Stack.Navigator>
  )
}
const PlayStack4=()=>{
  return(
    <Stack.Navigator initialRouteName='Search1' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Search1' component={Search}/>
      <Stack.Screen name='SearchCategory' component={SearchCategory}/>
      <Stack.Screen name='SearchIcon' component={SearchIcon}/>
      <Stack.Screen name='TodayPlaylist' component={TodayPlaylist}/>

    </Stack.Navigator>
  )
}
const PlayStack3=()=>{
  return(
    <Stack.Navigator initialRouteName='MeFree1' screenOptions={{headerShown: false}}>
      <Stack.Screen name='MeFree1' component={MeFree}/>
      <Stack.Screen name='Playlist' component={Playlist}/>
      <Stack.Screen name='PlaylistMagus' component={PlaylistMagus}/>
      <Stack.Screen name='PlaylistMagusSpecific' component={PlaylistMagusSpecific}/>
      <Stack.Screen name='Favorites' component={Favorites}/>
      <Stack.Screen name='FavoritesMagus' component={FavoritesMagus}/>
      <Stack.Screen name='MyPlaylist' component={MyPlaylist}/>
      <Stack.Screen name='MyPlaylistSubliminals' component={MyPlaylistSubliminals}/>
    </Stack.Navigator>
  )
}
const Home =({navigation}) =>{
  const route = useRoute();
  const [biggerNext, setBiggerNext] = useState(false)
  const [indx, setIndx] = useState(0);
  const [time, setTime] = useState(1);
  const [value, setValue] = useState("");
  const [subliminal, setSubliminal] = useState("");
  const [playbackObj, setPlaybackObj] = useState([]);
  const [playbackObj1, setPlaybackObj1] = useState([]);
  const [playbackObj2, setPlaybackObj2] = useState([]);
  const [playbackObj3, setPlaybackObj3] = useState([]);
  const [universalArray, setUniversalArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState("playing");
  const [soundObj, setSoundObj] = useState('');
  const [soundObj1, setSoundObj1] = useState('');
  const [soundObj2, setSoundObj2] = useState('');
  const [soundObj3, setSoundObj3] = useState('');
  const [tap, setTap] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [color, setColor] = useState('rgba(4,157,217,0.4)');
  const [error, setError] = useState('');
  const [looping, setLooping] = useState(false);
  const [isVolumeClick, setIsVolumeClick] = useState(false);
  const [isGuideClick, setIsGuideClick] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);
  const [seekbar, setSeekbar] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [dati, setDati]=useState(1)
  const [min, setMin]=useState(false)
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  
   useEffect(() => {
    //findLiked()
    global.liked=false
    Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
       interruptionModeIOS: 0,
       playsInSilentModeIOS: true,
       shouldDuckAndroid: true,
       interruptionModeAndroid: 1,
       staysActiveInBackground: true,
       playThroughEarpieceAndroid: true,
    })
    //start()
   }, []);
   const start=()=>{
    if(global.playlist==true){
      console.log("PLAYER")
      setData(global.list)
      setData1(global.list)
    }else{
      console.log("ALL")
      setData(global.data)
      setData1(global.data)
    }
  }
  function renderPlayPauseBtn(){
    switch (isPlaying){
      case "playing":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{backgroundColor: 'rgba(4,157,217,1)', borderRadius: 50, height: 45, width: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3669/3669483.png"}} style={{width: 28, height: 28, marginTop: 0, tintColor: 'white'}} />
          </TouchableOpacity>
        )
      case "paused":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{backgroundColor: '#7EC8E3', borderRadius: 50, height: 45, width: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>  
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/27/27223.png"}} style={{width: 28, height: 28, marginTop: 0, marginLeft: 5, tintColor: 'white' }} />
          </TouchableOpacity>
        )
    }
    
  }
  function renderPlayPauseBtn1(){
    switch (isPlaying){
      case "playing":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{width:27, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3669/3669483.png"}} style={{width: 25, height: 25, marginTop: 0, tintColor: 'white'}} />
          </TouchableOpacity>
        )
      case "paused":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{width: 27, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/27/27223.png"}} style={{width: 25, height: 25, marginTop: 0, marginLeft: 5, tintColor: 'white' }} />
          </TouchableOpacity>
        )
    }
    
  }
  const playpause = async()=>{
    try{
      if(soundObj.isLoaded==true && soundObj.shouldPlay==true){
        setIsPlaying('paused')
        if(global.length==2){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status), setSoundObj1(status1)]
        }else if(global.length==3){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: false})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2)]
        }else if(global.length==4){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: false})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: false})
          const status3 = await playbackObj3.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2), setSoundObj3(status3)]
        }
        
      }
      
      else{
        setIsPlaying('playing')
        if(global.length==2){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status), setSoundObj1(status1)]
        }else if(global.length==3){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: true})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2)]
        }else if(global.length==4){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: true})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: true})
          const status3 = await playbackObj3.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2), setSoundObj3(status3)]
        }
      } }catch(e){
        console.log(e)
      }
  }
  const loos =async()=>{
    if(looping==true){
      global.looping=false
      if(global.length==2){
        await playbackObj1.setStatusAsync({isLooping:false})
        await playbackObj.setStatusAsync({isLooping:false})
      }else if(global.length==3){
        await playbackObj1.setStatusAsync({isLooping:false})
        await playbackObj.setStatusAsync({isLooping:false})
        await playbackObj2.setStatusAsync({isLooping:false})
      }else if(global.length==4){
        await playbackObj1.setStatusAsync({isLooping:false})
        await playbackObj3.setStatusAsync({isLooping:false})
        await playbackObj2.setStatusAsync({isLooping:false})
        await playbackObj.setStatusAsync({isLooping:false})
      }
      return updateError('Looping Audio: OFF', setError);

    }else{
      global.looping=true
      if(global.length==2){
        await playbackObj1.setStatusAsync({isLooping:true})
        await playbackObj.setStatusAsync({isLooping:true})
      }else if(global.length==3){
        await playbackObj1.setStatusAsync({isLooping:true})
        await playbackObj.setStatusAsync({isLooping:true})
        await playbackObj2.setStatusAsync({isLooping:true})
      }else if(global.length==4){
        await playbackObj1.setStatusAsync({isLooping:true})
        await playbackObj2.setStatusAsync({isLooping:true})
        await playbackObj.setStatusAsync({isLooping:true})
        await playbackObj3.setStatusAsync({isLooping:true})
      }
      return updateError('Looping Audio: ON', setError);
    }
  }
  function loopImage(){
    try{
      if(global.looping==true){
        return(
          <TouchableOpacity onPress={()=> loos()}  style={{backgroundColor: 'rgba(4,157,217,1)', tintColor: 'white', height: 50, width: 50, borderRadius: 120, borderWidth: 1, borderColor: 'white'  }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/4146/4146819.png"}} style={{ marginLeft: 5, marginTop: 8, height: 32, width: 38, tintColor: 'white'}} />
          </TouchableOpacity>
        )
      }else{
        
        return(
          <TouchableOpacity onPress={()=> loos()} style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 50, width: 50, borderRadius: 120, borderWidth: 1, borderColor: 'white'  }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/4146/4146819.png"}}  style={{ marginLeft: 5, marginTop: 8, height: 32, width: 38, tintColor: 'white'}} />
          </TouchableOpacity>
        )
  
      }
    }catch(e){
      console.log(e)
    }
  }
  const shuffleSUbliminal =async()=>{
      try{
      if(shuffling==true){
        setShuffling(false)
        setData1(data)
        return updateError('Shuffle Audio: OFF', setError);
  
      }else{
        setShuffling(true)
        const shuffled = arrayShuffle(data1)
        setData1(shuffled)
        return updateError('Shuffle Audio: ON', setError);
        }
      }catch(e){
        console.log(e)
      }
  }
  function shuffleImage(){
    try{
      if(shuffling==true){
        return(
          <TouchableOpacity onPress={()=> shuffleSUbliminal()} style={{backgroundColor: 'rgba(4,157,217,1)', tintColor: 'white', height: 50, width: 50, borderRadius: 120, borderWidth: 1, borderColor: 'white'  }}>
            <Image source={require('../../assets/playing/shuffle.png')} style={{ marginLeft: 2, marginTop: 2, height: 45, width: 45, tintColor: 'white'}} />
          </TouchableOpacity>
        )
      }else{
        return(
          <TouchableOpacity onPress={()=> shuffleSUbliminal()} style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 50, width: 50, borderRadius: 120, borderWidth: 1, borderColor: 'white'  }}>
            <Image source={require('../../assets/playing/shuffle.png')} style={{ marginLeft: 2, marginTop: 2, height: 45, width: 45, tintColor: 'white'}} />
          </TouchableOpacity>
        )
  
      }
    }catch(e){
      console.log(e)
    }
  }
  const volumeone=async (volume)=>{
    const status = await playbackObj.setStatusAsync({volume: volume})
    global.volume1=volume
    return setSoundObj(status)
  
  }
  const volumetwo=async (volume1)=>{
    const status1 = await playbackObj1.setStatusAsync({volume: volume1})
    global.volume2=volume1
  
    return setSoundObj1(status1)
  }
  const volumethree=async (volume1)=>{
    const status1 = await playbackObj2.setStatusAsync({volume: volume1})
    global.volume3=volume1
  
    return setSoundObj2(status1)
  }
  const volumefour=async (volume1)=>{
    const status1 = await playbackObj3.setStatusAsync({volume: volume1})
    global.volume4=volume1
  
    return setSoundObj3(status1)
  }
  const calculate =()=>{
    if(duration!==null && position!==null){
      return position/duration
    }
    return 0
  }
  const adjustSeekbar = async (time) =>{
    if(global.length==2){
      try{
        await playbackObj1.setStatusAsync({positionMillis:time, shouldPlay: true})
        await playbackObj.setStatusAsync({positionMillis:time, shouldPlay: true})
        }catch(e){
          console.log(e)
        }
    }else if(global.length==3){
      try{
        await playbackObj1.setStatusAsync({positionMillis:time})
        await playbackObj.setStatusAsync({positionMillis:time})
        await playbackObj2.setStatusAsync({positionMillis:time})
        }catch(e){
          console.log(e)
        }
    }else if(global.length==4){
      try{
        await playbackObj1.setStatusAsync({positionMillis:time})
        await playbackObj.setStatusAsync({positionMillis:time})
        await playbackObj2.setStatusAsync({positionMillis:time})
        await playbackObj3.setStatusAsync({positionMillis:time})
        }catch(e){
          console.log(e)
        }
    }
    
  }
  const convertTime = time =>{
    if(time!=null){
    const totalSeconds = time / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return(padWithZero(minutes) + ':' + padWithZero(seconds));
    }else{
      return '00:00'
    }
  }
  const onPlaybackStatusUpdate = async status => {
    setPosition(status.positionMillis)
    setDuration(status.durationMillis || 60000)
    setLooping(status.isLooping)
    setSeekbar(position/duration)
    
  }
  const onPrev =async()=>{
    universalArray.pop()
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = universalArray[universalArray.length-1]
          global.title=object.title
          global.cover=object.cover
          global.description=object.description
          setSubliminal(object)
          global.count=1
          global.subs_id=object.subliminal_id
         
          for(var i=0; i<object.info.length; i++){
            global.length=object.info.length;
            if(object.info.length==2){
              global.track1=object.info[0].track_id;
              global.volume1= object.info[0].audio_type.volume/100
              global.type1=object.info[0].audio_type.name;
              global.track2=object.info[1].track_id;
              global.volume2= object.info[1].audio_type.volume/100
              global.type2=object.info[1].audio_type.name;
            }else if(object.info.length==3){
              global.track1=object.info[0].track_id;
              global.volume1= object.info[0].audio_type.volume/100
              global.type1=object.info[0].audio_type.name;
              global.track2=object.info[1].track_id;
              global.volume2= object.info[1].audio_type.volume/100
              global.type2=object.info[1].audio_type.name;
              global.track3=object.info[2].track_id;
              global.volume3= object.info[2].audio_type.volume/100
              global.type3=object.info[2].audio_type.name;

            }else if(object.info.length==4){
              global.track1=object.info[0].track_id;
              global.volume1= object.info[0].audio_type.volume/100
              global.type1=object.info[0].audio_type.name;
              global.track2=object.info[1].track_id;
              global.volume2= object.info[1].audio_type.volume/100
              global.type2=object.info[1].audio_type.name;
              global.track3=object.info[2].track_id;
              global.volume3= object.info[2].audio_type.volume/100
              global.type3=object.info[2].audio_type.name;
              global.track4=object.info[3].track_id;
              global.volume4= object.info[3].audio_type.volume/100
              global.type4=object.info[3].audio_type.name;
            }
          }
  }
  const prev = async(tap, click) => {
      
      if(position!=undefined){
        if(global.length==2){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
        }else if(global.length==3){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
        }else if(global.length==4){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
          await playbackObj3.unloadAsync()
        }
        fetchMusic(global.subs_id)
      }
      else{
        if(universalArray.length!=1){
          if(click==false){
            if(global.length==2){
              await playbackObj.unloadAsync()
              await playbackObj1.unloadAsync()
            }else if(global.length==3){
              await playbackObj.unloadAsync()
              await playbackObj1.unloadAsync()
              await playbackObj2.unloadAsync()
            }else if(global.length==4){
              await playbackObj.unloadAsync()
              await playbackObj1.unloadAsync()
              await playbackObj2.unloadAsync()
              await playbackObj3.unloadAsync()
            }
            onPrev()
            setTime(3)
          }else{
            onPrev()
          }
        }else{
        }
      }
  }
  
  const next = async(tap, pick) => {
    if(global.location!="Today"){
      //console.log("NEXT?")

      if(tap==1){
        setTap(2)
        if(global.length==2){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
        }else if(global.length==3){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
        }else if(global.length==4){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
          await playbackObj3.unloadAsync()
        }
        if(pick==false){
          setTime(3)
          myPlayerforAllTypes()
        }else{
          myPlayerforAllTypes()
        }
        
      }
    }
  }
  const plays = async ()=> {
    //start()
      if(time==1){
        //console.log("MY PLAYS")
        fetchMusic(global.subs_id); 
        setTime(2);
      }else if(time==3){
        //console.log("MY PLAYS3")
        setTime(2);
      }else if(time==2){
          //console.log("STOP MALALA")
          if(dati==2){
            await playbackObj.unloadAsync()
            await playbackObj1.unloadAsync()
            if(time!=3){
            fetchMusic(global.subs_id);}
          }else if(dati==3){
            await playbackObj.unloadAsync()
            await playbackObj1.unloadAsync()
            await playbackObj2.unloadAsync()
            if(time!=3){
              fetchMusic(global.subs_id);} 
          }else if(dati==4){
            await playbackObj.unloadAsync()
            await playbackObj1.unloadAsync()
            await playbackObj2.unloadAsync()
            await playbackObj3.unloadAsync()
            if(time!=3){
              fetchMusic(global.subs_id);} 
          }
          
          //setTime(1);
      }
  }
  const myPlayerforAllTypes= async()=>{
    const index =data1.findIndex(object => {
      return object.subliminal_id === global.subs_id;
    })
    //console.log(data1[index+1].title)
    if(index+1==data1.length){
      universalArray.push(data1[0])
      setUniversalArray(universalArray)
      global.array=universalArray
      const object = data1[0]
      global.subs_id=object.subliminal_id
      global.title=object.title
      global.cover=object.cover
      global.description=object.description
      global.count=1;
      global.category=object.category.name;
      global.guide=object.guide

      for(var i=0; i<object.info.length; i++){
        global.length=object.info.length;
        if(object.info.length==2){
          global.track1=object.info[0].track_id;
          global.volume1= object.info[0].audio_type.volume/100
          global.type1=object.info[0].audio_type.name;
          global.track2=object.info[1].track_id;
          global.volume2= object.info[1].audio_type.volume/100
          global.type2=object.info[1].audio_type.name;

        }else if(object.info.length==3){
          global.track1=object.info[0].track_id;
          global.volume1= object.info[0].audio_type.volume/100
          global.type1=object.info[0].audio_type.name;
          global.track2=object.info[1].track_id;
          global.volume2= object.info[1].audio_type.volume/100
          global.type2=object.info[1].audio_type.name;
          global.track3=object.info[2].track_id;
          global.volume3= object.info[2].audio_type.volume/100
          global.type3=object.info[2].audio_type.name;
        }else if(object.info.length==4){
          global.track1=object.info[0].track_id;
          global.volume1= object.info[0].audio_type.volume/100
          global.type1=object.info[0].audio_type.name;
          global.track2=object.info[1].track_id;
          global.volume2= object.info[1].audio_type.volume/100
          global.type2=object.info[1].audio_type.name;
          global.track3=object.info[2].track_id;
          global.volume3= object.info[2].audio_type.volume/100
          global.type3=object.info[2].audio_type.name;
          global.track4=object.info[3].track_id;
          global.volume4= object.info[3].audio_type.volume/100
          global.type4=object.info[3].audio_type.name;
        }
      }
      
      
    }
    else{
      universalArray.push(data1[index+1])
      setUniversalArray(universalArray)
      global.array=universalArray
      const object = data1[index+1]
      global.subs_id=object.subliminal_id
      global.title=object.title
      global.cover=object.cover
      global.description=object.description
      global.count=1;
      global.category=object.category.name;
      global.guide=object.guide

      for(var i=0; i<object.info.length; i++){
        global.length=object.info.length;
        if(object.info.length==2){
          global.track1=object.info[0].track_id;
          global.volume1= object.info[0].audio_type.volume/100
          global.type1=object.info[0].audio_type.name;
          global.track2=object.info[1].track_id;
          global.volume2= object.info[1].audio_type.volume/100
          global.type2=object.info[1].audio_type.name;

        }else if(object.info.length==3){
          global.track1=object.info[0].track_id;
          global.volume1= object.info[0].audio_type.volume/100
          global.type1=object.info[0].audio_type.name;
          global.track2=object.info[1].track_id;
          global.volume2= object.info[1].audio_type.volume/100
          global.type2=object.info[1].audio_type.name;
          global.track3=object.info[2].track_id;
          global.volume3= object.info[2].audio_type.volume/100
          global.type3=object.info[2].audio_type.name;

        }else if(object.info.length==4){
          global.track1=object.info[0].track_id;
          global.volume1= object.info[0].audio_type.volume/100
          global.type1=object.info[0].audio_type.name;
          global.track2=object.info[1].track_id;
          global.volume2= object.info[1].audio_type.volume/100
          global.type2=object.info[1].audio_type.name;
          global.track3=object.info[2].track_id;
          global.volume3= object.info[2].audio_type.volume/100
          global.type3=object.info[2].audio_type.name;
          global.track4=object.info[3].track_id;
          global.volume4= object.info[3].audio_type.volume/100
          global.type4=object.info[3].audio_type.name;

        }
      }
    }
    //console.log("myPlayerforAllTypes")
    fetchMusic(global.subs_id)

  }
  const fetchMusic = async (current) => {
    //console.log("current")
    setIsPlaying('playing')
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal/"+ current)
    const data = await resp.json();
    global.category=data[0].category.name
    global.description=data[0].description
     if( global.length==2){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true, positionMillis:1500, volume: global.volume1});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true, positionMillis:1500, volume: global.volume2});
      
      soundObject1.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          setTime(3)
          myPlayerforAllTypes()
        }
      });
      
      setSoundObj1(status1)
      setSoundObj(status)
      setPlaybackObj1(soundObject1)
      setPlaybackObj(soundObject)
      
      await soundObject1.playAsync();
      await soundObject.playAsync();
      setTap(1)
     }
     else if( global.length==3){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {didJustFinish: true, shouldPlay: true, volume: global.volume1});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume2});
      const status2 = await soundObject2.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume3});
      
      soundObject2.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          soundObject2.unloadAsync();
          setTime(3)
          myPlayerforAllTypes()
        }
      });
      
      setSoundObj1(status1)
      setSoundObj2(status2)
      setSoundObj(status)
      setPlaybackObj1(soundObject1)
      setPlaybackObj2(soundObject2)
      setPlaybackObj(soundObject)
      
      await soundObject1.playAsync();
      await soundObject.playAsync();
      await soundObject2.playAsync();
      setTap(1)
     }
     else if( global.length==4){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const soundObject3 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {didJustFinish: true, shouldPlay: true, volume: global.volume1});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume2});
      const status2 = await soundObject2.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume3});
      const status3 = await soundObject3.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track4+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume4});
      
      soundObject2.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          soundObject2.unloadAsync();
          soundObject3.unloadAsync();
          setTime(3)
          myPlayerforAllTypes()
        }
      });
      
      setSoundObj1(status1)
      setSoundObj2(status2)
      setSoundObj(status)
      setSoundObj3(status3)
      setPlaybackObj1(soundObject1)
      setPlaybackObj2(soundObject2)
      setPlaybackObj(soundObject)
      setPlaybackObj3(soundObject3)
      
      await soundObject1.playAsync();
      await soundObject.playAsync();
      await soundObject3.playAsync();
      await soundObject2.playAsync();
      setTap(1)
     }
   
     setDati(data[0].info.length)
  }
  const sliderVolume=()=>{
    if(global.length==2){
      return(
        <>
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                step={.1}
                value={global.volume2}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumetwo(value)}
            />
        </>
      )
    }else if(global.length==3){
      return(
        <>
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume2}
                step={.1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumetwo(value)}
            />
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type3}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                step={.1}
                value={global.volume3}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumethree(value)}
            />
        </>
      )
    }else if(global.length==4){
      return(
        <>
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',    marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume2}
                step={.1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumetwo(value)}
            />
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type3}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                step={.1}
                value={global.volume3}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumethree(value)}
            />
          <Text style={{fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type4}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                step={.1}
                value={global.volume4}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=> volumefour(value)}
            />
        </>
      )
    }
  }
  const volumeClick =()=>{
    if(isVolumeClick==true){
      return(
            <View style={{ height: Dimensions.get('window').height, marginTop: -Dimensions.get('window').height, width: Dimensions.get('window').width, marginLeft: -10}}>
              <TouchableOpacity onPress={()=> setIsVolumeClick(false)} style={{ height: +Dimensions.get('window').height/1.32,}} >
              </TouchableOpacity>
                <View style={{backgroundColor: 'rgba(67,156,212,0.9)',paddingBottom: 20, width: Dimensions.get('window').width-30, borderRadius: 15, marginLeft: 15}}>
                  <Text style={{fontSize: 17, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   padding: 10,}}>Advance Volume Setting</Text>
                  {sliderVolume()}
                </View>
              <TouchableOpacity onPress={()=> setIsVolumeClick(false)} style={{height: 100,}} >
              </TouchableOpacity>
            </View>
      )
    }
  }

  const guideClick=()=>{
    if(isGuideClick==true){
      return(
            <ImageBackground source={require('../../assets/playing/playbg.png')}  onPress={()=> setIsGuideClick(false)} style={{ height: Dimensions.get('window').height, marginTop: -Dimensions.get('window').height+85, width: Dimensions.get('window').width, marginLeft: -10}}>
              <TouchableOpacity onPress={()=> [setIsGuideClick(false), setModalVisible(true)]}  style={{width: 40, height: 40, left: 20,marginTop: 85}} >
                <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26,  marginLeft: 2}} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: -20, justifyContent: 'space-between'}}>
                <Text style={{paddingLeft: 35, marginTop: 20, color: '#0D0D0D', fontWeight: 'bold', fontSize: 17, }}>{global.title}</Text>
              </View>
              <Text style={{marginTop: 8, paddingLeft: 35, color: 'black',   fontSize: 13, }}>{global.category}</Text>
              <Text style={{paddingLeft: 35, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 13, marginTop: 30 }}>Guide</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 35, marginBottom: 85, marginTop: 10, }}>
                <View>
                  <Text style={{lineHeight: 22, textAlign: 'justify', fontSize: 13}}>{subliminal.guide}</Text>
                </View>
              </ScrollView>
            </ImageBackground>
      )
    }
  }
  const stopandout=async()=>{
    if(global.length==2){
      await playbackObj.unloadAsync()
      await playbackObj1.unloadAsync()
      navigation.navigate("Magusone")

    }else if(global.length==3){
      await playbackObj.unloadAsync()
      await playbackObj1.unloadAsync()
      await playbackObj2.unloadAsync()
      navigation.navigate("Magusone")

    }else if(global.length==4){
      await playbackObj.unloadAsync()
      await playbackObj1.unloadAsync()
      await playbackObj2.unloadAsync()
      await playbackObj3.unloadAsync()
      navigation.navigate("Magusone")

    }
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  const likeOrNot= async()=>{
    if(global.liked==true){
      await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
        body: JSON.stringify({playlist_id: global.subs_id, status:0,
          user_id: global.id, track_id: global.subs_id,
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()
      })
    }else if(global.liked==false){
      //console.log("FALSE")
      await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: global.subs_id, status:1,
        user_id: global.id, track_id: global.subs_id,
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
  const findLiked=async()=>{
    await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked/all`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        user_id: global.id
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      var arr=[]
      arr.push(result)
      if(arr[0].featured_track_liked!=undefined){
        global.favorites=(getDifference(global.data, result.featured_track_liked));
        const index =result.featured_track_liked.findIndex(object => {
          return object.track_title === global.title;
        })
        if(index!=-1){
          global.liked=true
          setLiked(true)
        }else{
          global.liked=false
          setLiked(false)
        }
      }else{
        global.liked=false
        setLiked(false)
        global.favorites=[]
      }

    })
  }
  const isLiked1=()=>{
      if(global.liked==true){
        return(
          <TouchableOpacity onPress={()=> likeOrNot()} >
            <View style={{marginTop: 38,width: 38, height: 38, right: 20, borderColor: 'white', borderRadius: 30, borderWidth: 1.5, backgroundColor: 'rgba(4,157,217,1)' }}>
              <Image source={require('../../assets/playing/heart.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'white'}} />
            </View>
          </TouchableOpacity>
        )
      }else{
        return(
          <TouchableOpacity onPress={()=> likeOrNot()} >
            <View style={{marginTop: 38,width: 38, height: 38, right: 20, borderColor: 'white', borderRadius: 30, borderWidth: 1.5, }}>
              <Image source={require('../../assets/playing/heart.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'white'}} />
            </View>
          </TouchableOpacity>
        )
      }
  }
  const isLiked=()=>{
    if(global.liked==false){
      return(
        <TouchableOpacity onPress={()=>likeOrNot()} style={{marginLeft: 17, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/151/151910.png'}} style={{  width: 30, height: 30,  tintColor: 'white', }} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=>likeOrNot()} style={{}}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'}} style={{ marginLeft: 17, width: 30, height: 30,  tintColor: 'white', }} />
        </TouchableOpacity>
      )
    }
  }  
  return(
      <>
      <ImageBackground source={require('../../assets/home2bg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <ImageBackground source={require('../../assets/playing/playbg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1,}}>
            <View style={{ height: Dimensions.get('window').height/1.8}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <TouchableOpacity onPress={()=> [setModalVisible(false), setValue('MINIMIZE'), global.value="MINIMIZE", global.count=2]}  style={{width: 40, height: 40, left: 10,marginTop: 48}} >
                <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26, marginLeft: 2}} />
              </TouchableOpacity>
              {isLiked1()}
              
            </View> 
            <View style={{flexDirection: 'row', marginTop: 25, justifyContent: 'space-around', height: Dimensions.get('window').height/2.8,width: Dimensions.get('window').width-20, marginHorizontal: 0,alignItems: 'center',}}>
              <TouchableOpacity onPress={()=> prev(tap, true)}>
                <Image source={require('../../assets/playing/back.png')} style={{width: 54, height: 54,  tintColor: 'white', marginTop: 27}} />
              </TouchableOpacity>
              <Image source={require('../../assets/playing/flower.png')} style={{width: Dimensions.get('window').height/3 ,height: Dimensions.get('window').height/3}} />
              <TouchableOpacity onPress={()=> [next(tap, true)]}>
                <Image source={require('../../assets/playing/forward.png')} style={{width: 54, height: 54,  tintColor: 'white', marginTop: 27}} />
              </TouchableOpacity>
            </View>

            <ImageBackground onPress={()=> playpause()} source={{uri: global.cover}} imageStyle={{borderRadius: 150}} style={{height: Dimensions.get('window').height/5.7, marginTop:  -Dimensions.get('window').height/4, marginHorizontal: Dimensions.get('window').width/3.5, borderRadius: 150, justifyContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}, shadowRadius: 3, elevation: 1}}>
              {renderPlayPauseBtn()}
            </ImageBackground>

            <View style={{justifyContent: 'center', alignSelf: 'center', marginTop: 65}}>
              <Text style={{textAlign: 'center', marginTop: 0, fontSize: 13}}>{convertTime(position)} / {convertTime(duration)}</Text>
            </View>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 70, marginRight: 70, marginTop: 20 }}>
              {shuffleImage()}
              <TouchableOpacity onPress={()=> [setIsVolumeClick(true)]} style={[styles.volumeBtn, {backgroundColor: color}]}>
                <Image source={require('../../assets/playing/sound.png')} style={{ marginLeft: 4, marginTop: 3, width: 40, height:40, tintColor: 'white'}} />
              </TouchableOpacity>
              {loopImage()}
            </View>
            <View style={{flexDirection: 'row', marginTop: 38, justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{ width: Dimensions.get('window').width-100, paddingLeft: 20, color: '#0D0D0D', fontWeight: 'bold',  fontSize: 20, }}>{global.title}</Text>
              <View style={{ width: 40, height: 40, marginRight: 20}}>
                <Image  source={{uri: 'https://cdn-icons-png.flaticon.com/128/8032/8032471.png'}} style={{width: 35, height: 35,  tintColor: '#439CD4', }} />
              </View>
            </View>
            <Text style={{marginTop: 0, paddingLeft: 20, color: 'black',   fontSize: 16, }}>{global.category}</Text>
            <View style={{height: 118}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 8, marginHorizontal: 20, marginBottom: 45,}}>
              <Text style={{marginTop: 8, color: 'black',   fontSize: 16, }}>Description : {global.description}</Text>
            </ScrollView></View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end',bottom: 80, right: 25, position: 'absolute', width: Dimensions.get('window').width/6, height: 30, shadowOpacity: 0.2}}>
              <View style={{position: "absolute", }}>
                <TouchableOpacity onPress={()=> [setModalVisible(true),setIsGuideClick(true)]} style={[styles.guideBtn, {backgroundColor: color, borderWidth: 1, borderColor: 'white' }]}>
                  <Text style={{fontSize: 15, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',  padding: 7, }}>Guide</Text>
                </TouchableOpacity>
              </View>
            </View>
            {volumeClick()}
            {guideClick()}
            </ImageBackground>

          
        </Modal>
        <StateContext.Provider value={{subliminal, setSubliminal}}>
        <UserContext.Provider value={{value, setValue}}>
          <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarStyle: [{backgroundColor: 'white', shadowColor: 'gray', shadowOpacity: 0.4, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', paddingLeft:20, paddingRight: 20, elevation: 20}]}}>
            <Tab.Screen name="Today" component={PlayStack2} 
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image source={require('../../assets/nav/Today.png')} style={{width: 30, height: 30, tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold',   fontSize: 10, color: focused ? 'rgba(24,119,242,1)' : 'black'}}>Today</Text>
              </View> 
              )}}
            />
            <Tab.Screen name="My Subs" component={PlayStack}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image source={require('../../assets/nav/Mysubs.png')} style={{width: 30, height: 30, tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold',    fontSize: 10, color: focused ? 'rgba(24,119,242,1)' : 'black'}}>My Subs</Text>
              </View> 
              )}}
            />
            <Tab.Screen name="Search" component={PlayStack4}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image source={require('../../assets/nav/Search.png')} style={{width: 30, height: 30, tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold',   fontSize: 10, color: focused ? 'rgba(24,119,242,1)' : 'black'}}>Search</Text>
              </View> 
              )}}
            />
            
            <Tab.Screen name="Me" component={PlayStack3}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image source={require('../../assets/nav/Me.png')} style={{width: 30, height: 30, tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold',   fontSize: 10, color: focused ? 'rgba(24,119,242,1)' : 'black'}}>Me</Text>
              </View> 
              )}}
            />
          </Tab.Navigator>
          {PlayerWidget()}
          </UserContext.Provider>
        </StateContext.Provider>
      </ImageBackground>
      </>
    )
    
    function PlayerWidget (){
      //console.log(global.count)
      if(global.value=="MINIMIZE"){
        findLiked()
        if(global.count==1){
          start()
          //console.log("global.value")
          plays();
          universalArray.push(subliminal);
          setUniversalArray(universalArray);
          global.array=universalArray;
          global.count=2
        }
        else if(global.count==undefined){
          plays();
          universalArray.push(subliminal);
          setUniversalArray(universalArray);
          global.array=universalArray;
          global.count=2
        }else if(global.count==3){
          universalArray.push(subliminal);
          setUniversalArray(universalArray);
          global.array=universalArray;
          global.count=2
        }else{
          
        }
        return(

          <View style={{marginBottom: 5, shadowOpacity: 0.5, shadowColor: 'black', position: 'absolute', bottom: 77}}>
            <ImageBackground imageStyle={{borderRadius: 10}} style={{backgroundColor: 'rgba(67,156,212,0.9)', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width-20, height: 70, borderRadius: 10, shadowOpacity: 0.2, opacity: 1, marginHorizontal: 10,}}>
              
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=> [setModalVisible(true), setValue(''), global.value=""]} style={{width: 80, alignItems: 'center', height: 70, borderRadius:10, marginLeft: -10}}> 
                  <Image source={{uri: global.cover}} style={{width: 80, height: 70, borderBottomLeftRadius:10, borderTopLeftRadius: 10}} />
                </TouchableOpacity>
        
                <View style={{width: Dimensions.get('window').width-110, alignItems: 'center', height: 70, flexDirection: 'row' }}>
                  <TouchableOpacity onPress={()=> [setModalVisible(true), setValue(''), global.value=""]} >
                  <View style={{ marginTop: 5, marginBottom: 10, alignItems: 'center', width: Dimensions.get('window').width-210, marginLeft: 10, }}>
                    <Text numberOfLines={1} style={{ width: Dimensions.get('window').width-210,  color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'left', marginBottom: 5}}>{global.title}</Text>
                    <Text numberOfLines={1} style={{ width: Dimensions.get('window').width-210,  color: '#E8E8E8',   fontSize: 13, textAlign: 'left', }}>{global.category}</Text>
                  </View>
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={()=> pause1()} >
                      {renderPlayPauseBtn1()}
                    </TouchableOpacity>
                    {isLiked()}
                  </View>
                </View>
              </View>

            </ImageBackground>

          </View>
          )
      }else if(global.value=="OUT")
      {
        stopandout()
      }
    }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  volumeBtn: {
    tintColor: 'white',  height: 50, width: 50, borderRadius: 120, borderWidth: 1, borderColor: 'white',  
  },
  guideBtn: {
    width: Dimensions.get('window').width/5, height: 35, borderRadius: 20, justifyContent: 'center', alignItems: 'center'
  },
  downBtn: {
    backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20, borderWidth: 1, borderColor: 'white' 
  },
  upBtn: {
    backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20, borderWidth: 1, borderColor: 'white'  
  }, 
});
export default Home;
/*
<TouchableOpacity onPress={()=> prev1(tap, false)} style={{backgroundColor: '#7EC8E3', borderRadius: 50, height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>
                      <Image source={require('../../assets/playing/back.png')} style={{width: 25, height: 25,  tintColor: 'white', }} />
                    </TouchableOpacity>
<TouchableOpacity onPress={()=> next(tap, false)} style={{backgroundColor: '#7EC8E3', borderRadius: 50, height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>
                      <Image source={require('../../assets/playing/forward.png')} style={{width: 25, height: 25,  tintColor: 'white', }} />
                    </TouchableOpacity> */

            //{error ? (<Text style={{color: 'rgba(4,157,217,1)', fontSize: 17, marginTop: -10,textAlign: 'center', marginBottom: 10}}>{error}</Text>):null}
            //

/*<Slider
              style={{width: Dimensions.get('window').width-80, height: 40, color: '#7EC8E3', marginHorizontal:30, marginTop: 60}}
              minimumValue={0}
              maximumValue={1}
              value={calculate() ||0}
              minimumTrackTintColor="#7EC8E3"
              maximumTrackTintColor="#000000"
              onValueChange={value => {adjustSeekbar(Math.floor(value * duration))}}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50}}>
              <Text style={{textAlign: 'center', marginTop: 0, fontSize: 13}}>{convertTime(position)}</Text>
              <Text style={{textAlign: 'center', marginTop: 0, fontSize: 13}}>{convertTime(duration)}</Text>
            </View> */