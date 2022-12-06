import { useState, useEffect } from "react";
import { TouchableOpacity, Button, Image, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { Imae } from "react-native-expo-image-cache";
import { useRoute } from "@react-navigation/native";
import { StateContext } from "../StateContext";

function SearchCategory({navigation}) {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const {value, setValue} = useContext(UserContext);
  const [number, setNumber] = useState(0)
  
  const fetchData = async (ids) => {
    if(ids==1){
      setData(global.data)
      
    }else if(ids!=1){
    await fetch(`https://dev.magusaudio.com/api/v1/search/playlist/category`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({category: ids})
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData(getDifference(global.data, result[0]))
      })
    }
  };
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.subliminal_id === object2.featured_id;
      });
    });
  }
  const play = (item)=>{
    const object = data1.find(obj => obj.title === item.title);
    if(object!=undefined){
      global.playlist=false

      if(global.subs_id!=object.subliminal_id){
        global.subs_id=object.subliminal_id
        global.cover=object.cover
        global.title=object.title
        global.liked=true
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.value="MINIMIZE"
        }
        space()
        global.location="NotToday"
        setSubliminal(item)
        global.count=1
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
    }
  };
  useEffect(() => {
    setData1(global.data)
    fetchData(global.selectedCategory)
    space()
  }, []);
  const space=()=>{
    if(global.value!="MINIMIZE"){
      setNumber(130)
    }
    else{
      setNumber(200)
    }
  }
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="SearchCategory"
    navigation.navigate("TodayPlaylist")
  }
  return (
    <ImageBackground source={require('../../assets/playing/playbg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1,}}>
      <View style={{ marginBottom: -15, flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> navigation.navigate("Search1")} style={{width: 40, height: 40, left: 10,marginTop: 48}} >
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/151/151846.png"}} style={{width: 26, height: 26}} />
        </TouchableOpacity>
        <Text style={{  fontSize: 25, alignSelf: 'center', marginTop: 30, color: 'black', fontWeight: 'bold', marginLeft: 10}} >{global.selectedName}</Text>
        
      </View> 
      <View style={{marginBottom: number, marginTop: 10}}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={()=> play(item)} onLongPress={()=> addToPlaylist(item)} style={{ width: Dimensions.get('window').width-60,borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginLeft: 20,marginTop: 0}}>
            <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
            
            <View style={{ width: Dimensions.get('window').width-130, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
              <View>
                <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 16, marginBottom: 5}}>{item.title}</Text>
                <Text numberOfLines={1}style={{width: Dimensions.get('window').width-190, color: '#0D0D0D',  fontSize: 13,}}>{item.category.name}</Text>
              </View>
              <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{marginRight: -10}}>
                <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32,alignSelf: 'flex-end', tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
              </TouchableOpacity>
            </View>
            
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
        style={{marginTop: 10, marginBottom:30}}
        showsVerticalScrollIndicator={false}
      />
      </View>

    </ImageBackground>
  );
}
export default SearchCategory;
//<Image source={{uri:'https://cdn-icons-png.flaticon.com/128/8032/8032471.png'}} style={{ marginRight: 20, width: 35, height: 35,  tintColor: 'white', backgroundColor: 'rgba(4,157,217,1)', borderRadius: 50 }} />
//