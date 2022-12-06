import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, TextInput, ScrollView,ImageBackground, View, Image, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Moment from 'moment';
import Discover from "../../data/homepage/Discover";
import Featured1 from "../../data/homepage/Featured";
function Item({ id, title, image, selected, onSelect, colorPallete }) {
  return (
    <TouchableOpacity onPress={() => onSelect(id, selected)} style={[{backgroundColor: selected ? colorPallete : 'rgba(4,157,217,0.4)', height: 35, width:Dimensions.get('window').width/5, marginBottom: 10, borderRadius: 5, flexDirection: 'row', marginRight: 12.5, alignItems: 'center', justifyContent: 'center'}, ]}>
      <View style={{width: 25, height: 20,}}>
        <Image source={{uri: image}} style={{width: 20, height: 20, borderTopLeftRadius: 10, marginLeft: 5 }}/>
      </View>
      <Text style={{ color: selected ? 'white' : 'white', width:Dimensions.get('window').width/5-25, fontSize: 11, fontWeight: 'bold', justifyContent: 'center', textAlign: 'left',   paddingLeft: 7, paddingRight: 7 }}>{title}</Text>
    </TouchableOpacity>
  );
}
function Item1({ id, title, selected1, onSelect1 }) {
  return (
    <TouchableOpacity onPress={() => onSelect1(id, selected1)} style={[{backgroundColor: selected1 ? 'rgba(4,157,217,1)' : 'rgba(4,157,217,0.4)', height: 28, borderRadius: 15, flexDirection: 'row', marginRight: 10}, ]}>
      <Text style={{ color: selected1 ? 'white' : 'white', fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center',   paddingLeft: 15, paddingRight: 15, }}>{title}</Text>
    </TouchableOpacity>
  );
}
const {width} = Dimensions.get('window');

const Today =({navigation})=>{
  const [selected, setSelected] = useState(new Map());
  const [selected1, setSelected1] = useState(new Map());
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [featured_id, setFeatured_id] = useState('');
  const [text, setText] = useState('');
  const [data6, setData6] = useState([]);
  const [ID, setID] = useState(global.id);
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
      fetchData1(array1.toString(), array2.toString(), array1.length, array2.length)
    }else{
      const filteredItems = array2.filter(item => item !== id)
      setArray2(filteredItems)
      category(filteredItems.toString(),ID)
      fetchData1(array1.toString(), filteredItems.toString(), array1.length, filteredItems.length)
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
        fetchData1(id, array2.toString, id.length, array2.length)
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
  const [data5, setData5] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchData1 = async (mood, category, moodlength, categorylength) => {
    if(categorylength==0 && moodlength!=0){
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category=&mood="+mood);
    const data1 = await resp1.json();
      try{
        setData1(data1)
        setLoading(false);
      }catch(e){
        console.log(e)
      }
    }else if(moodlength==0 && categorylength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category="+category+"&mood=");
      const data1 = await resp1.json();
      setData1(data1)
      setLoading(false);
    }else if(moodlength!=0 && categorylength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category="+category+"&mood="+mood);
      const data1 = await resp1.json();
    setData1(data1)
    }else{
      setData1([])
    }
  };
  const fetchData5 = async (ID) => {
    const resp5 = await fetch("https://dev.magusaudio.com/api/v1/audio/history/"+ID);
    const data5 = await resp5.json();
    const unique = [
      ...new Map(data5.track_history.map((item) => [item["track_title"], item])).values(),
  ];
    setData5(unique)
    setLoading(false);
  };
  const fetchData3 = async () => {
    const resp3 = await fetch("https://dev.magusaudio.com/api/v1/category");
    const data3 = await resp3.json();
    setData3(data3);
    setLoading(false);

  };
  const fetchData4 = async () => {
    const resp4 = await fetch("https://dev.magusaudio.com/api/v1/moods");
    const data4 = await resp4.json();
    setData4(data4.data);
    setLoading(false);

  };
  useEffect(()=>{
    fetchData1('','','','');
    fetchData3();
    fetchData4();
    fetchData5(ID);
  }, []);
  
  
  const fetchData6= async()=>{
    const resp6 = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+ID);
    const data6 = await resp6.json();
    setData6(data6)
    
  }
  const addPlaylist = async (title1)=>{
    if(title1==''){
      
    }else{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title1,
        user_id: ID
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      addingSub(result[result.length-1].playlist_id)
    })
    }
  };
  const addingSub = async(playlist_id)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: playlist_id,
        user_id: ID, featured_id: featured_id, title: title
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      setText('')
      setModalVisible(false)
    })
  }
  const scrollPlaylist=()=>{
    fetchData6()
    if(data6.length!=0 && data6.length!=1){
    return(
      <FlatList
          data={data6}
          renderItem={({ item }) => (
          
          
            <TouchableOpacity onPress={()=> addingSub(item.playlist_id)} style={{ height:50, width: Dimensions.get('window').width-60,borderRadius: 10, flexDirection: 'row', marginBottom: 10, shadowColor: 'gray',  borderColor: 'gray', borderBottomWidth: 0.5}}>
              <Image source={{uri: item.cover}} style={{width: 45, height: 45, borderRadius: 30, marginBottom: 5, marginLeft: 10}}/>
              <View style={{ width: Dimensions.get('window').width-90, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5}}>
                <Text numberOfLines={1}style={{ marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, }}>{item.title}</Text>
                
              </View>
              
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.playlist_id}
          style={{ marginTop: 15, marginHorizontal: 0, height: 20}}
          showsVerticalScrollIndicator={false}
        />
    )
    }else if(data6.length==1){
      return(
        <FlatList
            data={data6}
            renderItem={({ item }) => (
            
            
              <TouchableOpacity  onPress={()=> addingSub(item.playlist_id)}  style={{ height:50, width: Dimensions.get('window').width-60,borderRadius: 10, flexDirection: 'row', marginBottom: 10, shadowColor: 'gray',  borderColor: 'gray', borderBottomWidth: 0.5}}>
                <Image source={{uri: item.cover}} style={{width: 45, height: 45, borderRadius: 30, marginBottom: 5, marginLeft: 10}}/>
                <View style={{ width: Dimensions.get('window').width-90, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5}}>
                  <Text numberOfLines={1}style={{ marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, }}>{item.title}</Text>
                  
                </View>
                
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.playlist_id}
            style={{ marginTop: 50, marginHorizontal: 0, height: 20}}
            showsVerticalScrollIndicator={false}
          />
      )
    }
  }

  const seeall = ()=>{
    try{
    if (data1.length!=0){
      return(
        <View>
        <Text style={{  fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 15}} >Featured</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Featured")}style={{alignItems: 'flex-end', marginBottom: -15, height: 30}}>
              <Text style={{  fontSize: 16, marginTop: -5, marginRight: 20, marginBottom: -10  }} >See All</Text>
            </TouchableOpacity>
            
          <Featured1/>
          <Text style={{  fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 15}} >Recommended For You</Text>
            <TouchableOpacity onPress={()=> [navigation.navigate("Recommended"), global.reco=data1]} style={{alignItems: 'flex-end',marginBottom: -15, height: 30}}>
              <Text style={{  fontSize: 16, marginTop: -5, marginRight: 20, marginBottom: -10  }} >See All</Text>
            </TouchableOpacity>
            
            <FlatList
              data={data1}
              renderItem={({ item }) => (
                        
              <View style={{backgroundColor: 'white', width: Dimensions.get('window').width/2-30, marginHorizontal: 20, marginRight: 0, marginBottom: 20,  shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10, marginTop: 25, flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=> console.log(":kdem")} style={{ width: Dimensions.get('window').width/2-30,borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri: item.cover}} style={{width: Dimensions.get('window').width/2-80, height: Dimensions.get('window').width/2-80, borderRadius: 150, }}/>
                  <View style={{}}>
                    <Text numberOfLines={1} style={{width: Dimensions.get('window').width/2-30, paddingLeft: 5, paddingRight: 5, marginTop: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, marginBottom: 5, textAlign: 'center' }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data1}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
          
            <Text style={{  fontSize: 20, fontWeight: 'bold', marginTop: 0, marginLeft: 15,}} >Discover</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Discover")} style={{alignItems: 'flex-end', marginBottom: -18, height: 30}}>
              <Text style={{  fontSize: 16, marginTop: -5, marginRight: 20, marginBottom: -10  }} >See All</Text>
            </TouchableOpacity>

          <Discover/>
        </View>
      )
    }else{
      return(
        <>
            <Text style={{  fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 15,}} >Featured</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Featured")}  style={{alignItems: 'flex-end', marginBottom: -18, height: 30}}>
              <Text style={{  fontSize: 16, marginTop: 5, marginRight: 20, marginBottom: -10  }} >See All</Text>
            </TouchableOpacity>
              <Featured1/>
            <Text style={{  fontSize: 20, fontWeight: 'bold', marginTop: 0, marginLeft: 15,}} >Discover</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Discover") } style={{alignItems: 'flex-end', marginBottom: -18, height: 30}}>
              <Text style={{  fontSize: 16, marginTop: -5, marginRight: 20, marginBottom: -10  }} >See All</Text>
            </TouchableOpacity>

          <Discover/>
        </>
      )
    }
  }catch(e){
    console.log(e)
  }
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 80
    }
    else{
      return 170
    }
  }
  return (
      <ImageBackground source={require('../../assets/home2bg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <Text style={{  fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginTop: 60}} >Hey {global.first_name}</Text>
        <Text style={{  fontSize: 20, alignSelf: 'center', marginTop: 1, color: 'white'}} >How are you feeling?</Text>
        <FlatList
          data={data4}
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
          numColumns={4}
          keyExtractor={item => item.id}
          extraData={selected}
          style={{height: 200, marginTop: 30, marginHorizontal: 20, width: Dimensions.get('window').width-40, alignContent: 'center', marginBottom: -50}}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={data3}
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
          style={{height: 70, marginTop: 30, marginHorizontal: 20,}}
          showsHorizontalScrollIndicator={false}
        />
      
        <ScrollView style={{ marginTop: 0, marginBottom: space()}} showsVerticalScrollIndicator={false}>
        <Text style={{  fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginLeft: 15, marginTop: 10}} >Continue your Journey</Text>
          
          <View style={{ height: 172, marginRight: 20,}}>
          <FlatList
              data={data5}
              renderItem={({ item }) => (
                
              <View style={{backgroundColor: 'white', height: 165, width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20}}>
                <TouchableOpacity onPress={()=> play(item)}  style={{ height: 165, width: Dimensions.get('window').width/2-25,borderRadius: 20, }}>
                  <Image source={{uri: item.cover}} style={{width: Dimensions.get('window').width/2-25, height: 165, borderRadius: 20}}/>
                  <View style={{width: Dimensions.get('window').width/2-25, height: 50, marginTop: -50, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
                  </View>
                  <View style={{marginTop:-43}}>
                    <Text numberOfLines={1} style={{marginTop: 1, paddingLeft: 10, paddingRight: 10,color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15}}>{item.track_title}</Text>
                  </View>
                  <View style={{width: Dimensions.get('window').width/2-25,justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{marginTop: 2,  paddingLeft: 10, paddingRight: 10, color: 'black',   fontSize: 10, }}>Last Played: {Moment(item.created_at).format('MMM DD, hh:mm a')}</Text>
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
          
          {seeall()}
        </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
      <TouchableOpacity onPress={()=> setModalVisible(false)} style={{height: Dimensions.get('window').height,}}>
        <ImageBackground imageStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30}} source={require('../../assets/playing/playbg.png')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/3, marginTop: Dimensions.get('window').height/1.5, shadowColor: 'gray', shadowOpacity: 1, shadowRadius:2, justifyContent: 'center', alignItems: 'center', paddingBottom:30}}>
          <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
                
          {scrollPlaylist()}
          <View style={{width: Dimensions.get('window').width-60, justifyContent: 'center', alignItems: 'center', height: 50, borderBottomColor: 'black', borderWidth: 0.5, paddingBottom: -15, borderRadius: 10, marginTop: 10}}>
            <TextInput placeholder='Enter Playlist Name' name='playlist' onChangeText={newText => setText(newText)} defaultValue={text} style={{  fontSize: 17, color: 'black',}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,width: Dimensions.get('window').width-60, marginBottom: 20}}>
            <TouchableOpacity onPress={() => addPlaylist(text)}   style={{borderColor: 'rgba(4,157,217,0.4)', backgroundColor: 'rgba(4,157,217,0.4)', borderWidth:2, borderRadius: 10, height: 50, justifyContent: 'center', alignItems:'center',width: Dimensions.get('window').width-60}}>
              <Text style={{  fontSize: 20}}>Create New Playlist</Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
        </ImageBackground>
      </TouchableOpacity>
      </Modal>
      </ImageBackground>
    )
}
const styles = StyleSheet.create({
  guideBtn: {
    width: width/4., height: 30, borderWidth:2, borderColor: 'rgba(4,157,217,1)', justifyContent: 'center', alignItems: 'center'
  },
  guideBtn1: {
    width: width/3.43, height: 30, borderWidth:2, borderColor: 'rgba(4,157,217,1)', justifyContent: 'center', alignItems: 'center'
  },
  moods:{
    height: 35, width:Dimensions.get('window').width/5, marginBottom: 10, borderRadius: 5, flexDirection: 'row', marginRight: 12.5, alignItems: 'center', justifyContent: 'center'}
})
export default Today;
