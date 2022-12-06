import React, { useEffect, useState } from "react";
import { ScrollView,ImageBackground, FlatList, View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';

const MeFree =({navigation})=>{
  const subs=global.subs;
  const [color, setColor ] = useState("");
  const [colorName, setColorName ] = useState("");
  const [moods, setMoods ] = useState([]);
  const [getmoods, setgetMoods ] = useState([]);
  const [subsType, setSubsType]=useState('');
  const [myStatus, setMyStatus]=useState(false);
  const [statusList, setStatusList]=useState([])
  const subscription =()=>{
    if(subs===3){
      setColor('#31A0FF');
    }else if(subs===1){
      setColor('#BEBEBE');
    }else if(subs===2){
      setColor('#F4D73B');
    }else if(subs===4){
      setColor('#6EC98A');
    }else if(subs===5){
      setColor('#FF7757');
    }else if(subs===6){
      setColor('#FF5DB4');
    }
    else{ setColor('black')}
  }
  useEffect(()=>{
    getValue(subs);
    subscription();
    mood();
    getMoods()
  }, [moods]);
  const renderItem1 = ({item})=>{
    
    return (
      <View style={{flexDirection: "row", backgroundColor: item.description,width: 100, marginTop: 15, height: 45, borderRadius: 25, marginRight: 10}}>
        <Image source={{uri: item.image}} style={{width: 27, height: 27, justifyContent: 'center', alignSelf: 'center', marginLeft: 10,}}/>
        <Text style={{fontSize: 11, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', marginLeft: 5, color: 'white',   }}>{item.name}</Text>
      </View>
      
    );
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object2=== object1.id.toString() ;
      });
    });
  }
  const status = () => {
    
    if(myStatus==true){
      return(
        <View>
          <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 12, left: 30}} >My Status</Text>
          <FlatList
          data={getDifference(getmoods, moods)}
          renderItem={renderItem1}
          horizontal
          pagingEnabled
          keyExtractor={item => item.id}
          //extraData={selected}
          style={{height: 60, marginTop: 0, marginLeft: 30, marginRight:20}}
          showsHorizontalScrollIndicator={false}
        />
        </View>
      )
    }
  }
  const mood = async()=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/moods/history`, {
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
      //.log(result.data.current_summary)
      setMoods(result.data.summary);
      if (result.data.summary.length==0){
        setMyStatus(false)
      }
      else{
        setMyStatus(true)
      }

    })
} 
  const getValue =async(value)=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subscription")
    const data = await resp.json();
    const object = data.find(obj => obj.id === Number(value));
    setSubsType(object.name)
  }
  const getMoods =async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/moods")
    const data = await resp.json();
    //const object = data.find(obj => obj.id === Number(value));
    setgetMoods(data.data)
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 80
    }
    else{
      return 160
    }
  }
  const out=()=>{
    if(global.value=="MINIMIZE"){
      global.value="OUT"
      
    }
    else{
      navigation.navigate("Magusone")
      
    }
  }
    return (
      <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <View style={[styles.subscrip,{backgroundColor: color}]}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 11, fontWeight: 'bold'}}>{subsType}</Text>
        </View>

        <View style={{flexDirection: 'row',}}>
          <View style={{width: 100, height: 100, marginTop: 15, left: 20, alignSelf: 'flex-start', borderRadius: 100, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 0.8, shadowOffset: {width:1, height: 0}, shadowRadius: 3}}>
            <Image source={{uri: global.maincover}} style={{width: 80, height: 80, alignSelf: 'flex-start', borderRadius: 100, shadowColor: 'rgba(4,157,217,0.4)', shadowOpacity: 0.8, shadowOffset: {width:2, height: 2}, shadowRadius: 3}} />
          </View>
          <View style={{ marginTop: 5, marginLeft: 30}}>
            <Text style={{fontSize: 17, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 40}} >{global.mainname}</Text>
            <Text style={{fontSize: 10, color: '#0D0D0D',  alignSelf: 'flex-start', marginTop: 0}} >{global.email}</Text> 
            <Text style={{fontSize: 10, color: 'gray',  alignSelf: 'flex-start', marginTop: 3}} >Member since {Moment(global.member).format('MMM YYYY')}</Text>
          </View>
          <Image source={require('../../assets/me/edit.png')} style={{width: 17, height: 17, marginTop: 50, marginLeft: 35, alignSelf: 'flex-start'}} />
        </View>
      
        
        {status()}
        <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 30, marginTop: 12, justifyContent: 'center'}} >Menu</Text>
        <ScrollView style={{marginBottom: space()}}>
          <View>
            <View style={{width: Dimensions.get('window').width-70, alignSelf: 'center'}}>
              <TouchableOpacity onPress={()=> navigation.navigate("Favorites")} style={{flexDirection: 'row', marginTop: 19, }}>
                <Image source={require('../../assets/me/heart.png')} style={{height: 45, width: 45}}/>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Playlist")}  style={{flexDirection: 'row', marginTop: 19, }}>
                <View style={{width:48, height: 48, backgroundColor: '#40DEC0', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: -5}}>
                  <Image source={require('../../assets/playing/add_playlist.png')} style={{height: 35, width: 35, tintColor: 'white'}}/>
                </View>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Playlists</Text>
                
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/download.png')} style={{height: 45, width: 45}}/>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Download</Text>
                
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/payment.png')} style={{height: 45, width: 45}}/>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Payment</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/settings.png')} style={{height: 45, width: 45}}/>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Settings</Text>
                          
              </View>
              <TouchableOpacity onPress={()=> navigation.navigate("Playlist")} style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/help.png')} style={{height: 45, width: 45}}/>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Help</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 30, marginTop: 12, justifyContent: 'center'}} >My Account</Text>
          <Text style={{   fontSize: 14, color: '#0D0D0D', fontWeight: 'bold',left: 40, marginTop: 15, justifyContent: 'center', color: '#4A6DAF'}} >Switch to other account</Text>
          <TouchableOpacity onPress={()=> out()} style={{marginBottom: 20}} >
            <Text style={{   fontSize: 14, color: '#0D0D0D', fontWeight: 'bold',left: 40, marginTop: 15, justifyContent: 'center', color: '#407BFF'}} >Log out</Text>
          </TouchableOpacity>
        </ScrollView>
        

        
      </ImageBackground>
    )
}
const styles = StyleSheet.create({
  subscrip: {
    width: 95, height: 28, justifyContent: 'center', borderRadius:5, alignSelf: 'flex-end', borderWidth: 0.3, marginRight: 20, marginTop:45, marginBottom: -15
  },
  
});

export default MeFree;
/*<TouchableOpacity style={[{backgroundColor: 'rgba(4,157,217,0.4)', height: 28, borderRadius: 15, flexDirection: 'row', marginRight: 10}, ]}>
        <View style={{flexDirection: "row", backgroundColor: '#606262',width: 130, marginTop: 15, height: 45, borderRadius: 25, opacity: 0.2}}>
              <Image source={require('../../assets/today/upset.png')} style={{width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginLeft: 10,}}/>
              <Text style={{fontSize: 15, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', marginLeft: 5, color: 'white',   }}>Upset</Text>
            </View>
        <Text style={{ color:'white', fontSize: 13, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center',    paddingLeft: 15, paddingRight: 15, }}>{item.name}</Text>
      </TouchableOpacity>*/