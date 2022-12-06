import React, { useState, useEffect, useContext } from "react";
import { ScrollView, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import Moment from 'moment';
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";

function Item({ id, title, image, selected, onSelect, colorPallete }) {
  return (
    <TouchableOpacity onPress={() => onSelect(id, selected)} style={[{backgroundColor: selected ? colorPallete : 'rgba(4,157,217,0.4)', height: 35, width: Dimensions.get('window').width/5, marginBottom: 10, borderRadius: 5, flexDirection: 'row', marginRight: 12.5, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',} ]}>
      <View style={{width: 25, height: 20,}}>
        <Image source={{uri: image}} style={{width: 20, height: 20, borderTopLeftRadius: 10, marginLeft: 5 }}/>
      </View>
      <Text style={{ color: selected ? 'white' : 'white', width: Dimensions.get('window').width/5-25, fontSize: 9, justifyContent: 'center', textAlign: 'left',   paddingLeft: 7, paddingRight: 7 }}>{title}</Text>
    </TouchableOpacity>
  );
}
function Item1({ id, title, selected1, onSelect1 }) {
  return (
    <TouchableOpacity onPress={() => onSelect1(id, selected1)} style={[{backgroundColor: selected1 ? 'rgba(4,157,217,1)' : 'rgba(4,157,217,0.4)', height: 28, borderRadius: 15, flexDirection: 'row', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}, ]}>
      <Text style={{ color: selected1 ? 'white' : 'white', fontSize: 10, justifyContent: 'center', alignSelf: 'center',   paddingLeft: 15, paddingRight: 15, }}>{title}</Text>
    </TouchableOpacity>
  );
}
const Today =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [ID, setID] = useState(global.id)
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState([])
  const [continue1, setContinue1] = useState(false)
  const [selected, setSelected] = useState(new Map());
  const [selected1, setSelected1] = useState(new Map());
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const space=()=>{
    if(global.value!="MINIMIZE"){return 80}
    else{return 155}
  }
  const onSelect = ((id, selected1)=>{
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));
    setSelected(newSelected);
    if(selected1==false){
      array1.push(id)
      setArray1(array1)
      mood(array1.toString(),ID)
    }else{
      const filteredItems = array1.filter(item => item !== id)
      setArray1(filteredItems)
      mood(filteredItems.toString(),ID)
    }
  });
  const onSelect1 = ((id, selected)=>{
    const newSelected = new Map(selected1);
    newSelected.set(id, !selected1.get(id));
    setSelected1(newSelected);
    if(selected==false){
      array2.push(id)
      setArray2(array2)
      category(array2.toString(),ID)
      fetchData4(array1.toString(), array2.toString(), array1.length, array2.length)
    }else{
      const filteredItems = array2.filter(item => item !== id)
      setArray2(filteredItems)
      category(filteredItems.toString(),ID)
      fetchData4(array1.toString(), filteredItems.toString(), array1.length, filteredItems.length)
    }
  });
  const mood = async(id, ID)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/update/moods`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({moods: id,
      user_id: ID
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      fetchData4(id, array2.toString, id.length, array2.length)
    })
  } 
  const category = async(id, ID)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/update/category`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({category: id,
      user_id: ID
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
    })
  }
  const fetchData1 = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/moods");
    const data1 = await resp1.json();
    setData1(data1.data);
  };
  const fetchData2 = async () => {
    const resp2 = await fetch("https://dev.magusaudio.com/api/v1/category");
    const data2 = await resp2.json();
    setData2(data2);
  };
  const fetchData3 = async () => {
    const resp3 = await fetch("https://dev.magusaudio.com/api/v1/audio/history/"+ID);
    const data3 = await resp3.json();
    const unique = [
      ...new Map(data3.track_history.map((item) => [item["track_title"], item])).values(),
  ];
    setData3(unique)
    console.log(unique.length)
    if(unique.length==0){
      setContinue1(false)
    }else{
      setContinue1(true)
    }
  };
  const fetchData4 = async (mood, category, moodlength, categorylength) => {
    if(categorylength==0 && moodlength!=0){
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category=&mood="+mood);
    const data1 = await resp1.json();
      try{
        setData4(data1)
      }catch(e){
      }
    }else if(moodlength==0 && categorylength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category="+category+"&mood=");
      const data1 = await resp1.json();
      setData4(data1)
      setLoading(false);
    }else if(moodlength!=0 && categorylength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category="+category+"&mood="+mood);
      const data1 = await resp1.json();
      setData4(data1)
    }else{
      setData4([])
    }
  };
  const fetchData5= async () => {
    const resp5 = await fetch("https://dev.magusaudio.com/api/v1/playlist/featured");
    const data5 = await resp5.json();
    setData5(data5);
  };
  const fetchData6= async () => {
    const resp6 = await fetch("https://dev.magusaudio.com/api/v1/playlist/discover");
    const data6 = await resp6.json();
    setData6(data6);
  };
  useEffect(() => {
    fetchData1()
    fetchData2()
    fetchData3()
    fetchData4()
    fetchData5()
    fetchData6()
   }, []);
  const featured_flatlist=()=>{
    return (
      <FlatList
        data={data5}
        renderItem={({ item }) => (
                        
         <View style={{width: width/2.8, marginHorizontal: 20, marginBottom: 10, marginRight: -10, right: 20,  shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10,  flexDirection: 'row'}}>
            <TouchableOpacity onLongPress={()=> addToPlaylist(item, item.subliminal_ids.length)} onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "featured")]} style={{ width: width/2.35,borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: item.cover}} style={{width: width/2.9, height: width/2.9, borderRadius: 150, }}/>
              <TouchableOpacity onPress={()=> addToPlaylist(item, item.subliminal_ids.length)} style={{alignSelf: 'flex-end', marginRight: 5}}>
                <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32, alignSelf: 'flex-end', marginTop: -Dimensions.get('window').width/2.9, tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
              </TouchableOpacity>
              <View style={{}}>
                <Text numberOfLines={1} style={{width: width/2.9, paddingLeft: 15, paddingRight: 15, marginTop: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 13, marginBottom: 5, textAlign: 'center' }}>{item.title}</Text>
              </View>
              
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.featured_id}
        extraData={data5}
        horizontal
        pagingEnabled
        style={{marginRight: 20, marginLeft: 20, paddingLeft: 2, paddingTop: 3}}
        showsHorizontalScrollIndicator={false}
      /> 
    )
   }
  const recommendedPlaying = async(item, length, location)=>{
    if(length==0){
      
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.featured_id;
      })
      global.playlist=false

      if(global.subs_id!=item.featured_id){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.category=global.data[index].category.name

        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
        for(var i=0; i<global.data[index].info.length; i++){
          if( global.data[index].info.length==2){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;
            
          }else if(global.data[index].info.length==3){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;
            
          }else if(global.data[index].info.length==4){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;

            global.track4=global.data[index].info[3].track_id;
            global.volume4= global.data[index].info[3].volume/100
            global.type4=global.data[index].info[3].audio_type.name;
          }
        }
        global.length=global.data[index].info.length;

      }
    }else{
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("TodayAllPlaylist")
    }
  }
  const addToPlaylist = (item, length) =>{
    if(length==0){
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("TodayPlaylist")
    }else{
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("TodayAllPlaylist")
    }
  }
  const recommendationYesOrNo=()=>{
    if (data4.length!=0){
      return(
        <View>
          <Text style={{  fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 15, marginBottom: -5}} >Featured</Text>
            <TouchableOpacity  onPress={()=> [navigation.navigate("Featured"), global.feature=data5]}style={{alignItems: 'flex-end', height: 30,}}>
              <Text style={{  fontSize: 15,  marginRight: 20,   }} >See All</Text>
            </TouchableOpacity>
            {featured_flatlist()}

          <Text style={{  fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 15}} >Recommended For You</Text>
            <TouchableOpacity onPress={()=> [navigation.navigate("Recommended"), global.reco=data4]} style={{alignItems: 'flex-end',height: 30, }}>
              <Text style={{  fontSize: 15,  marginRight: 20,  }} >See All</Text>
            </TouchableOpacity>
            
            <FlatList
              data={data4}
              renderItem={({ item }) => (
                <View style={{ width: width/2.8, marginHorizontal: 25, marginRight: -10, right: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20,  flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onLongPress={()=> addToPlaylist(item, item.subliminal_ids.length)} onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "discover")]}  style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius:20}}/>
                  <TouchableOpacity onPress={()=> addToPlaylist(item, item.subliminal_ids.length)} style={{alignSelf: 'flex-end', marginRight: 0}}>
                    <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32, marginTop: -Dimensions.get('window').width/2.9, tintColor: 'white', shadowColor: 'black', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
                  </TouchableOpacity>
                  <View style={{width: width/2.8, height: 40, marginTop: -40, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)'}}>
                  </View>
                  <View style={{marginTop:-35}}>
                    <Text numberOfLines={1} style={{marginTop: 5, paddingLeft: 20, paddingRight: 20,color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold',   fontSize: 13}}>{item.title}</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data4}
              horizontal
              pagingEnabled
              style={{marginRight: 20, marginLeft: 20, paddingLeft: 2, paddingTop: 3 }}
              showsHorizontalScrollIndicator={false}
            />
          
          <Text style={{  fontSize: 18, fontWeight: 'bold', marginTop: 0, marginLeft: 15,}} >Discover</Text>
            <TouchableOpacity onPress={()=> [navigation.navigate("Discover"), global.discove=data6]} style={{alignItems: 'flex-end',  height: 30}}>
              <Text style={{  fontSize: 15, marginRight: 20, }} >See All</Text>
            </TouchableOpacity>

            <FlatList
              data={data6}
              renderItem={({ item }) => (
                        
              <View style={{width: width/2.8,  marginHorizontal: 20, marginBottom: 10, marginRight: -5, right: 20, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10, flexDirection: 'row'}}>
                <TouchableOpacity onLongPress={()=> addToPlaylist(item, item.subliminal_ids.length)} onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "discover")]} style={{ width: width/2.35,borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius: 150, }}/>
                  <TouchableOpacity onPress={()=> addToPlaylist(item, item.subliminal_ids.length)} style={{alignSelf: 'flex-end', marginRight: 4}}>
                    <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32, marginTop: -Dimensions.get('window').width/2.9, tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
                  </TouchableOpacity>
                  <View style={{}}>
                    <Text numberOfLines={1} style={{width: width/2.35, paddingLeft: 15, paddingRight: 15, marginTop: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 13, marginBottom: 5, textAlign: 'center' }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data6}
              horizontal
              pagingEnabled
              style={{marginRight: 20, marginLeft: 20, paddingLeft: 2, paddingTop: 3 }}
              showsHorizontalScrollIndicator={false}
            />
        </View>
      )
    }else{
      return(
        <>
            <Text style={{  fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 15,}} >Featured</Text>
            <TouchableOpacity onPress={()=> [navigation.navigate("Featured"), global.feature=data5]}style={{alignItems: 'flex-end', height: 30,}}>
              <Text style={{  fontSize: 15,  marginRight: 20,   }} >See All</Text>
            </TouchableOpacity>
            {featured_flatlist()}

            <Text style={{  fontSize: 18, fontWeight: 'bold', marginTop: 0, marginLeft: 15,}} >Discover</Text>
            <TouchableOpacity onPress={()=> [navigation.navigate("Discover"), global.discove=data6] } style={{alignItems: 'flex-end', height: 30,}}>
              <Text style={{  fontSize: 15,  marginRight: 20,  }} >See All</Text>
            </TouchableOpacity>

            <FlatList
              data={data6}
              renderItem={({ item }) => (
              <View style={{ width: width/2.8, marginHorizontal: 25, marginRight: -10, right: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20,  flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onLongPress={()=> addToPlaylist(item, item.subliminal_ids.length)} onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "discover")]}  style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius:20}}/>
                  <TouchableOpacity onPress={()=> addToPlaylist(item, item.subliminal_ids.length)} style={{alignSelf: 'flex-end', marginRight: 5}}>
                    <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: 32, height: 32, marginTop: -Dimensions.get('window').width/2.9, tintColor: 'white', shadowColor: 'black', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
                  </TouchableOpacity>
                  <View style={{width: width/2.8, height: 40, marginTop: -40, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)'}}>
                  </View>
                  <View style={{marginTop:-35}}>
                    <Text numberOfLines={1} style={{marginTop: 5, paddingLeft: 20, paddingRight: 20,color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold',   fontSize: 13}}>{item.title}</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data6}
              horizontal
              pagingEnabled
              style={{marginRight: 20, marginLeft: 20, paddingLeft: 2, paddingTop: 3 }}
              showsHorizontalScrollIndicator={false}
            />
        </>
      )
    }
  }
  const isContinued=()=>{
    if(continue1==true){
      return(
        <>
        <Text style={{  fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 15, marginTop: 10}} >Continue your Journey</Text>
        <View style={{ height: 172, marginRight: 20,}}>
            <FlatList
              data={data3}
              renderItem={({ item }) => (
                
              <View style={{backgroundColor: 'white', height: 165, width: width/2-25, marginRight: -10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20}}>
                <TouchableOpacity style={{ height: 165, width: width/2-25,borderRadius: 20, }}>
                  <Image source={{uri: item.cover}} style={{width: width/2-25, height: 165, borderRadius: 20}}/>
                  <View style={{width: width/2-25, height: 50, marginTop: -50, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
                  </View>
                  <View style={{marginTop:-43}}>
                    <Text numberOfLines={1} style={{marginTop: 1, paddingLeft: 10, paddingRight: 10,color: '#0D0D0D', fontWeight: 'bold', fontSize: 13}}>{item.track_title}</Text>
                  </View>
                  <View style={{width: width/2-25,justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{marginTop: 2,  paddingLeft: 10, paddingRight: 10, color: 'black',   fontSize: 9, }}>Last Played: {Moment(item.created_at).format('MMM DD, hh:mm a')}</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>

              )}
              keyExtractor={(item) => item.track_title}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
        </View>
        {recommendationYesOrNo()}  
        </>
      )
    }
    else{
      return(
        <>
          {recommendationYesOrNo()}  
          <View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
        </>
      )
    }
  }
  return(
    <ImageBackground source={require('../../assets/home2bg.png')} style={{width: width, height: height}}>
      <Text style={{  fontSize: 24, fontWeight: 'bold', alignSelf: 'center', marginTop: 60}} >Hey {global.first_name}!</Text>
      <Text style={{  fontSize: 17, alignSelf: 'center', marginTop: 1, color: 'white'}} >How are you feeling?</Text>
        <FlatList
          data={data1}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              image={item.image}
              title={item.name}
              colorPallete={item.description}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          scrollEnabled={false}
          numColumns={4}
          keyExtractor={item => item.id}
          extraData={selected}
          style={{margin:20, height: 130, padding:2, width: width-40, alignContent: 'center'}}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={data2}
          renderItem={({ item }) => (
            <Item1
              id={item.id}
              title={item.name}
              selected1={!!selected1.get(item.id)}
              onSelect1={onSelect1}
            />
          )}
          horizontal
          pagingEnabled
          keyExtractor={item => item.id}
          extraData={selected}
          style={{height: 50, padding:2, margin: 20, marginTop:-10}}
          showsHorizontalScrollIndicator={false}
        />
      <ScrollView style={{ marginTop: -10, marginBottom: space()}} showsVerticalScrollIndicator={false}>
        {isContinued()}        
      </ScrollView>
    </ImageBackground>
  )
}
export default Today;