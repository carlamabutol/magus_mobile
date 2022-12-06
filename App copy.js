import { StatusBar } from 'expo-status-bar';
import { ImageBackground, TouchableOpacity, Image, Dimensions, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View, Button } from 'react-native';
import Magusone from './Magusone';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Choose from './screens/login/Choose';
import LoginForm from './screens/login/LoginForm';
import Home from './screens/homepage/Home';
import { useEffect } from 'react';
import { Audio } from 'expo-av';
import SignupForm from './screens/login/SignupForm';
import ChangePass from './screens/login/ChangePass';
const Stack = createNativeStackNavigator();
const {width} = Dimensions.get('window');
export default function App() {
  const fetchDataSubliminal = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
    const data = await resp.json();
    global.data=data
    global.datas=data
  };
  useEffect(() => {
    fetchDataSubliminal()
   }, []);
   const play = (item)=>{
    global.playlist=false

    if(global.subs_id!=item.subliminal_id){
    const object = global.data.find(obj => obj.subliminal_id === item.subliminal_id);
    global.subs_id=item.subliminal_id
    global.cover=item.cover
    global.title=item.title
    global.category=item.category.name
    global.location="NotToday"
   
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
    fetchMusic(global.subs_id)
  }
  };
  const fetchMusic = async (current) => {
    console.log("current")
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal/"+ current)
    const data = await resp.json();
    global.category=data[0].category.name
    global.description=data[0].description
     if( global.length==2){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true, positionMillis:1500, volume: global.volume1});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true, positionMillis:1500, volume: global.volume2});
      
      
      
      await soundObject1.playAsync();
      await soundObject.playAsync();
     }
     else if( global.length==3){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {didJustFinish: true, shouldPlay: true, volume: global.volume1});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume2});
      const status2 = await soundObject2.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {didJustFinish: true,shouldPlay: true, volume: global.volume3});
      
    
      await soundObject1.playAsync();
      await soundObject.playAsync();
      await soundObject2.playAsync();
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
      
     
      
      await soundObject1.playAsync();
      await soundObject.playAsync();
      await soundObject3.playAsync();
      await soundObject2.playAsync();
     }
   
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
    <>
    <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
      <View style={{left: 20, marginTop: -8, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
        <Text style={{  fontSize: 23, color: '#0D0D0D', fontWeight: 'bold', }} >My Subs</Text>
          <TouchableOpacity onPress={()=> [navigation.navigate('MysubsSearch'), global.location="MysubsSearch"]} style={{}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: 35, height: 35, marginBottom: -5, tintColor: 'black'}} />
          </TouchableOpacity>
      </View>
      <FlatList
        data={global.data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.title}
        style={{marginTop: 15, marginBottom: 130,}}
        showsHorizontalScrollIndicator={false}
      />
     
      
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
