import { useState, useEffect } from "react";
import { Image, TextInput, TouchableOpacity, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";

function MysubsSearch({navigation}) {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [array, setArray] = useState([]);
  const [data4, setData4] = useState([]);
  const [data1, setData1] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);
  const [text, setText] = useState("");
  const [searchingFirst, setSearchingFirst] = useState(false)
  const [ID, setID] = useState(global.id);
  
  const play = (item)=>{
    if(global.subs_id!=item.subliminal_id){
    const object = data10.find(obj => obj.title === item.title);
    global.subs_id=item.subliminal_id
    global.cover=item.cover
    global.title=item.title
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.value="MINIMIZE"
    }
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
    }}
  };
  const fetchDataSubliminal = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
    const data = await resp.json();
    setData9(data)
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
  const searchBar = async (text, ID)=>{
    if(text!=""){
      await fetch(`https://dev.magusaudio.com/api/v1/user/add/search/history`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({user_id: ID, search: text
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
      body: JSON.stringify({user_id: ID, search: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setArray([])
        for(let i = 0; i < result[0].length; i++) {
          for(let j = 0; j < data10.length; j++) {
              if(data10[j].title=== result[0][i].title ) {
                array.push(data10[j])
              }
          }
        }
        setData4(array)
      })
      setSearchingFirst(true)
    }
  }
  
  useEffect(() => {
    setData10(global.data)
    fetchData1(global.id)
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="MysubsSearch"
    navigation.navigate("TodayPlaylist")
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
          <Text numberOfLines={1} style={{marginTop: 8, paddingLeft: 10, paddingRight: 10,color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, flex:1}}>{item.title}</Text>
        </View>
        <View style={{width: Dimensions.get('window').width/2-25,justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{marginTop: 3, paddingLeft: 10, color: 'black',   fontSize: 10, }}>{item.category.name}</Text>
          <Text style={{marginTop: 3, paddingRight: 10, color: 'black',   fontSize: 10, marginBottom: 10 }}>10:00</Text>
          
        </View>
      </TouchableOpacity>
    </ImageBackground>
    );
  };
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
        <View style={{paddingBottom: 50, marginLeft: -10}}>
          <FlatList
            data={data4}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item) => item.title}
            style={{marginTop: 15, marginBottom: 130, paddingTop: 2}}
            showsHorizontalScrollIndicator={false}
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
  return (
    <ImageBackground style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1,  }}>
      <View style={{flexDirection: 'row', left: 15,marginTop: 48, right:15, marginBottom: 10}}>
        <TouchableOpacity onPress={()=> [navigation.navigate("MySubs")]} style={{width: 40, height: 40, }} >
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/151/151846.png"}} style={{width: 30, height: 30, marginTop: 7}} />
        </TouchableOpacity>
        <View style={{marginLeft: 0, borderWidth:2, marginRight: 10, borderRadius: 20}}>
          <TextInput placeholder="Search"  autoComplete={true} autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-150,height: 35,  fontSize: 14, fontWeight: 'bold', marginTop: 3, marginLeft: 20, }}/>
        </View>
        <TouchableOpacity onPress={()=> searchBar(text, global.id )} style={{width: 40, height: 40, }} >
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: 35, height: 35, marginTop: 4}} />
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
export default MysubsSearch;