import React, { useEffect, useState } from "react";
import { ImageBackground, Alert, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../FormSubmitBtn";
import { useNavigate } from "react-router-native";
import moment from 'moment'
import AsyncStorage from "@react-native-async-storage/async-storage";
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().trim().min(8, '').required('Password is required'),
   
})
const LoginForm =({navigation}) =>{
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  let login = async (email, password)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email,
        password: password
      })
      
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      // If user does exist
      if(result.success==true){
        // Old user
        if(result.user.info.is_first_login== 0){
          global.first_name=result.user.info.first_name;
          global.email=result.user.email;
          global.mainname=result.user.info.first_name+ ' ' +result.user.info.last_name;
          global.maincover=result.user.info.cover;
  
          global.subs =result.user.info.subscription_id;
          global.member = result.user.created_at;
          global.id =result.user.user_id;
          AsyncStorage.setItem('id', result.user.user_id);

          /*AsyncStorage.setItem('first_name', first_name);
          AsyncStorage.setItem('name', name);
          AsyncStorage.setItem('email', email);
          AsyncStorage.setItem('cover', cover);
          AsyncStorage.setItem('subs', subs.toString());
          AsyncStorage.setItem('member', member);
          AsyncStorage.setItem('id', id);*/
          navigation.navigate('Home');

        }
        else{
          global.email=email
          navigation.navigate("Change");
        }
      // User does not exist
      }else if (result.success==false){
        return updateError('Incorrect email and password!', setError);
      };      
    })
    
  };

  const userInfo={
    email: '', password: ''
  };
  const { email, password} =userInfo;
  const [error, setError] = useState('');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const handleOnChangeText = (value, fieldName) =>{
    setUserInfo({...userInfo, [fieldName]: value})
  };
  const isValidForm =()=>{
    if(!isValidObjField(userInfo)) return updateError('Required', setError);
    if(password.length<8) return updateError('Invalid pass', setError);
    return true;
  }
    return( 
      <>
      <ImageBackground source={require('../../assets/login/bg4.png')} style={styles.container}>
        <FormContainer>
          <Image source={require('../../assets/login/emaillogin.png')} style={{width: '100%', height: '50%' }}/>
          <Text style={{  fontSize: 25, fontWeight: 'bold', marginTop: -15}}>Hello Again!</Text>
          <Text style={{  fontSize: 11,  marginTop: 10, marginBottom: 40}}>Welcome back, you've been missed!</Text>
          <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values, {resetForm}) =>login(values.email, values.password)}>
            {({values,errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit })=>{  
              const {email, password} = values
              return <> 
                <FormInput error={touched.email && errors.email} onBlur={handleBlur('email')} value={email} onChangeText={handleChange('email')} autoCapitalize='none' title='Email' placeholder='Email Address/Mobile Number'/>
                <FormInput error={touched.password && errors.password} onBlur={handleBlur('password')} value={password} onChangeText={handleChange('password')} autoCapitalize='none' secureTextEntry title='Password' placeholder='Password'/>
                {error ? (<Text style={{color: 'red', fontSize: 13, marginBottom: -10, marginTop: -5,textAlign: 'center'}}>{error}</Text>): null}
                <FormSubmitBtn onPress={handleSubmit} title='Login'/>
                
                <TouchableOpacity onPress={()=> navigation.navigate("Signup")} style={{marginTop:25, alignContent:'center'}}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={{fontSize: 13,}}>Don't have an account? </Text>
                    <Text style={{fontSize: 13,   fontWeight:'bold', color: 'rgba(24,119,242,1)'}}>Sign up</Text>
                  </View>
                </TouchableOpacity>
              </>
             }}
          </Formik>
        </FormContainer> 
        </ImageBackground>
      </>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    borderColor: "black",
    borderWidth: 0.5,
    height: 38,
    width: 270,
    backgroundColor: '#0F52BA',
    elevation:2,
    marginTop: 30,
    borderRadius: 5,
  },
})

export default LoginForm;

