import { useState, useEffect } from "react";
import { Modal, TextInput, Image, TouchableOpacity, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";

function SearchIcon({navigation}) {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [data4, setData4] = useState([]);
  const [data1, setData1] = useState([]);
  const [data10, setData10] = useState([]);
  const [text, setText] = useState("");
  const [searchingFirst, setSearchingFirst] = useState(false)
  const [number, setNumber] = useState(0)
 
  const play = (item)=>{
    const object = data10.find(obj => obj.title === item.title);
    if(object!=undefined){
      global.subs_id=object.subliminal_id
    global.cover=object.cover
    global.title=object.title
    global.liked=true
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.value="MINIMIZE"
    }
    global.playlist=false
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

      }else if(object.info.length==2){
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
  };
  const fetchData1 = async (ID) => {
    await fetch(`https://dev.magusaudio.com/api/v1/user/search/history`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({user_id: ID,
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      setData1(result.data)
    })
  };
  const searchBar = async (find, ID)=>{
    if(find!=''){
      await fetch(`https://dev.magusaudio.com/api/v1/user/add/search/history`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({user_id: ID, search: find
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData1(result.data)
      })

      await fetch(`https://dev.magusaudio.com/api/v1/playlist/search`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({user_id: ID, search: find
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData4(getDifference(global.data, result[0]))


      })
      setSearchingFirst(true)
    }
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.subliminal_id === object2.featured_id;
      });
    });
  }
  useEffect(() => {
    space()
    space2()
    setData10(global.data)
    fetchData1(global.id)
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="SearchIcon"
    navigation.navigate("TodayPlaylist")
  }
  const ifSearching =()=>{
    if(searchingFirst==false){
      return(
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: space()}}>
          {data1.map((item, key)=>(
            <TouchableOpacity onPress={()=> [setText(item), searchBar(item, global.id )]} style={{marginLeft: 20, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}, borderRadius: 20,backgroundColor: 'white', padding: 10, width: Dimensions.get('window').width-60, marginTop: 20, marginBottom: -10}} key={key} >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ marginLeft: 10, fontSize: 15,}}> { item || "null" } </Text>
                <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/484/484026.png"}} style={{width: 15, height: 15, marginTop: 4, marginRight: 10}} />

              </View>
            </TouchableOpacity>)
          )}
        </ScrollView>
      )
    }else{
      return(
        <View style={{marginBottom: space2()}}>
          <FlatList
            data={data4}
            renderItem={({ item }) => (
              
              <TouchableOpacity onPress={()=> play(item)} onLongPress={()=> addToPlaylist(item)} style={{ width: Dimensions.get('window').width-60,borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.8, shadowOffset: {width: 0, height: 0}, shadowColor: 'rgba(4,157,217,.8)',  marginLeft: 20,marginTop: 0}}>
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
            style={{marginTop: 20, paddingTop: 3}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )
    }
  }
  const texting =(text)=>{
    if(text==""){
      setSearchingFirst(false)
      setText('')
    }else{
      setText(text)
    }
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 80
    }
    else{
      return 180
    }
  }
  const space2=()=>{
    if(global.value!="MINIMIZE"){
      return 170
    }
    else{
      return 270
    }
  }
  return (
    <ImageBackground source={require('../../assets/playing/playbg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1,  }}>
      <View style={{flexDirection: 'row', left: 15,marginTop: 48, right:15}}>
        <TouchableOpacity onPress={()=> navigation.navigate("Search1")} style={{width: 40, height: 40, }} >
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/151/151846.png"}} style={{width: 30, height: 30, marginTop: 7}} />
        </TouchableOpacity>
        <View style={{marginLeft: 0, borderWidth:2, marginRight: 10, borderRadius: 20}}>
          <TextInput placeholder="Search"  autoComplete={true} autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-150,height: 35,   fontSize: 16, fontWeight: 'bold', marginTop: 3, marginLeft: 10, }}/>
        </View>
        <TouchableOpacity onPress={()=> searchBar(text, global.id )} style={{width: 40, height: 40, }} >
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: 35, height: 35, marginTop: 4}} />
        </TouchableOpacity>
      </View>
      {ifSearching()}

    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default SearchIcon;