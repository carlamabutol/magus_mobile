import { useState, useEffect } from "react";
import { Modal, Image, TouchableOpacity, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";

function Search({navigation}) {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0)
  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/category");
    const data = await resp.json();
    setData(data);

  };
  const action =(item)=>{
    global.selectedCategory=item.id
    global.selectedName=item.name
    navigation.navigate("SearchCategory")
  }
  useEffect(() => {
    fetchData()
    space()
  }, []);
  const renderItem= ({ item }) => {
    return (
     
      <ImageBackground style={{borderColor: 'rgba(4,157,217,1)', borderWidth:2, height: 70,  borderRadius: 20, width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: 12, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)',}}>
        <TouchableOpacity onPress={()=> action(item)} style={{ width: Dimensions.get('window').width/2-25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 150,justifyContent: 'center',}}>
            <Text style={{ color: 'black',   fontSize: 14, color: 'black', textAlign: 'center' }}>{item.name}</Text>
          </View>
          
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 120;
    }
    else{
      return 210;
    }
  }
  return (
    
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
        <View style={{left: 20, marginTop: -8, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: 23, color: '#0D0D0D', fontWeight: 'bold', }} >Search</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SearchIcon')}style={{ marginLeft: -20,}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: 35, height: 35, marginBottom: -5, tintColor: 'black'}} />
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 10,   left: 20, fontSize: 16, color: '#0D0D0D', fontWeight: 'bold', }} >Browse Category</Text>
        <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        style={{marginTop: 15, marginBottom: space()}}
        showsVerticalScrollIndicator={false}
        />
        
      </ImageBackground>
    </SafeAreaView>
    
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
export default Search;