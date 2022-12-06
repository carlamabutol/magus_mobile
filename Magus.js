import React from "react";
import { useState, useEffect } from "react";
import { Box, FlatList, NativeBaseProvider } from "native-base";
import { ScrollView,ImageBackground, View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "react-router-native";
import { useRoute } from "@react-navigation/native";
import {Audio} from "expo-av";
const Playing =({navigation})=>{
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState();
  const [playbackObj, setPlaybackObj] = useState('');
  const [soundObj, setSoundObj] = useState('');
  const [soundObj1, setSoundObj1] = useState('');
  const soundObject = new Audio.Sound();
  const soundObject1 = new Audio.Sound();

  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal/"+ route.params.subliminal_id);
    const data = await resp.json();
// finding the length of an array to do for loop for track ID
    let length =data[0].info.length;
    
    let id= data[0].info[0].track_id;
    let id1= data[0].info[1].track_id;
    let volume= 100/data[0].info[0].volume;
    let volume1= 100/data[0].info[1].volume;
    
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+id+"&version=1"}, {shouldPlay: true}, {volume: 0.2});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+id1+"&version=1"}, {shouldPlay: true}, {volume: volume1});
      console.log(status);
      console.log(status1);
      setSoundObj(status)
      setSoundObj1(status1)

     
      
    setData(data);
    setLoading(false);
  };
  
  const pause = ()=> {
    console.log('Unloading Sound');
    sound.unloadAsync();
  }
  
  
  useEffect(() => {
    fetchData();
  }, []);


  const renderItem= ({ item }) => {
    return (
     
      <View style={{height: Dimensions.get('window').height-170}}>
          
          
          <View style={{flexDirection: 'row', marginTop: 28, justifyContent: 'space-around', height: 300,width: Dimensions.get('window').width-20, marginHorizontal: 10,alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> describe(subliminal, cname, des)}>
              <Image source={require('../../assets/playing/back.png')} style={{width: 54, height: 59, }} />
            </TouchableOpacity>
            <Image source={require('../../assets/playing/bgplaying.png')} style={{width: 294, height: 274 }} />
            <TouchableOpacity onPress={()=> guiding(subliminal, cname, guide)}>
              <Image source={require('../../assets/playing/forward.png')} style={{width: 54, height: 59,}} />
            </TouchableOpacity>
          </View>

          <ImageBackground imageStyle={{borderRadius: 150}} source={{uri: item.cover}} style={{width: 155, height: 155, marginTop: -225, marginHorizontal: 120, borderRadius: 150, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> pause()}>
              <Image source={require('../../assets/playing/pause.png')} style={{width: 45, height: 45, marginTop: 0,  }} />
            </TouchableOpacity>
          </ImageBackground>
          
          <Text style={{textAlign: 'center', marginTop: 70}}>10:00</Text>
          
          <View style={{flexDirection: 'row', marginTop: 28, justifyContent: 'space-between', marginLeft: 30, marginRight: 30}}>
            <TouchableOpacity style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20 }}>
              <Image source={require('../../assets/playing/shuffle.png')} style={{ marginLeft: 5, marginTop: 1}} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20 }}>
              <Image source={require('../../assets/playing/10bef.png')} style={{ marginLeft: 1, marginTop: 0}} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white',  height: 38, width: 38, borderRadius: 20 }}>
              <Image source={require('../../assets/playing/volume.png')} style={{ marginLeft: 0, marginTop: 0}} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20 }}>
              <Image source={require('../../assets/playing/10after.png')} style={{ marginLeft: 0, marginTop: 1}} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20 }}>
              <Image source={require('../../assets/playing/repeat.png')} style={{ marginLeft: 2, marginTop: 2}} />
            </TouchableOpacity>
          </View>
          
          <View style={{flexDirection: 'row', marginTop: 38, justifyContent: 'space-between'}}>
            <Text style={{ width: Dimensions.get('window').width-100, paddingLeft: 20, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 20, }}>{item.title}</Text>
            <View style={{ width: 26, height: 26, marginTop: 3,marginRight: 20, paddingLeft: 3, paddingTop: 3, borderRadius: 20, borderColor: '#439CD4', borderWidth: 1.5 }}>
              <Image source={require('../../assets/playing/down.png')} style={{width: 18, height: 18,  tintColor: '#439CD4', }} />
            </View>
          </View>

          <Text style={{marginTop: 8, paddingLeft: 20, color: 'black',   fontSize: 14, }}>{item.category.description}</Text>
          <Text style={{marginTop: 8, paddingLeft: 20, color: 'black',   fontSize: 12, marginBottom: 10 }}>10:00 mins</Text>
            
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end',bottom: 10, right: 20, position: 'absolute', width: Dimensions.get('window').width/6, height: 30, shadowOpacity: 0.2}}>
            <View style={{position: "absolute", }}>
              <TouchableOpacity onPress={()=> guiding(subliminal, cname, guide)}  style={{width: Dimensions.get('window').width/6, height: 30, backgroundColor: '#439CD4', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   padding: 5,}}>Guide</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
    );
  };
      
  return (
    <NativeBaseProvider>
      <ImageBackground source={require('../../assets/playing/playbg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: -15}}>
          <TouchableOpacity onPress={()=> navigation.navigate("MySubs")} style={{width: 40, height: 40, left: 15,marginTop: 48}} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Home")} >
            <View style={{marginTop: 38,width: 38, height: 38, right: 15, borderColor: 'white', borderRadius: 30, borderWidth: 1.5 }}>
              <Image source={require('../../assets/playing/heart.png')} style={{width: 24, height: 20, marginTop: 8, marginLeft: 6, tintColor: 'white'}} />
            </View>
          </TouchableOpacity>
        </View> 
         
        {loading &&<Box style={{marginLeft: 25}}>Loading</Box>}
        {data  && (<FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={{marginTop: 15, marginBottom: 80}}
          />)}

          
      </ImageBackground>
    </NativeBaseProvider>

  ); 
}
export default Playing;
/*<View style={{marginTop: 2, paddingRight: 5, color: 'black',   fontSize: 10, marginBottom: 10 }}>{item.info.map(id=>{
  return <Text key={id.id}>{id.track_id}</Text>
})}</View>


https://dev.node.magusaudio.com/api/v1/s3/audio/track?id=vc2fl9k0nLLJsX2CMeVjFJ&version=1
https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3
https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
*/