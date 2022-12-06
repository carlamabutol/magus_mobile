import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import Choose from './screens/login/Choose';
import LoginForm from './screens/login/LoginForm';
import SignupForm from './screens/login/SignupForm';
import ChangePass from './screens/login/ChangePass';
//import Home from './screens/homepage/Home';
import Magusone from './Magusone';
import Home from './screens/homepage/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
export default function App() {
  const fetchDataSubliminal = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data11 = await resp1.json();
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
    const data = await resp.json();

    global.data=data
    global.datas=data
    const value = await AsyncStorage.getItem('id')
    if(value !== null) {
      const index =data11.findIndex(object => {
        return object.user_id === value;
      })
        global.first_name=data11[index].info.first_name;
        global.last_name=data11[index].info.last_name;
        global.email=data11[index].email;
        global.mainname=data11[index].name;
        global.maincover=data11[index].info.cover;
  
        global.subs =data11[index].info.subscription_id;
        global.member = data11[index].created_at;
        global.id =data11[index].user_id;

    }else{
      console.log("NO DATA")
    }
  };
  useEffect(() => {
    fetchDataSubliminal()
   }, []);
  return (
      
      <NavigationContainer>
        <StatusBar
        animated={true}
        backgroundColor="black"
        hidden={true} />
        <Stack.Navigator initialRouteName='Magusone' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Magusone' component={Magusone} />
          <Stack.Screen name='Choose' component={Choose} />
          <Stack.Screen name='Change' component={ChangePass} />
          <Stack.Screen name='Signup' component={SignupForm}/>
          <Stack.Screen name='Login' component={LoginForm}/>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
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
