import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ImageBackground, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../FormSubmitBtn";
import { useNavigate } from "react-router-native";
import moment from 'moment'
import { useRoute } from "@react-navigation/native";
const validationSchema = Yup.object({
  password: Yup.string().trim().min(8, '').required('Current Password is required!'),
  newpassword: Yup.string().trim().min(8, '').required('New Password is required!'),
  confirm: Yup.string().equals([Yup.ref('newpassword'), null], 'Does not match!')
   
})
const isValidObjField =(obj) =>{
  return Object.values(obj).every(value => value.trim())
}
const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(()=>{
    stateUpdater('')
  }, 2500);
}

const ChangePass =({navigation}) =>{
  const route = useRoute();
  const userInfo={
     password: '',newpassword: '', confirm: ''
  };
  const {newpassword, confirm} =userInfo;
  const [error, setError] = useState('');
  const handleOnChangeText = (value, fieldName) =>{
    setUserInfo({...userInfo, [fieldName]: value})
  };
  const isValidForm =()=>{
    if(!isValidObjField(userInfo)) return updateError('Required', setError);
    if(newpassword.length<8) return updateError('Invalid pass', setError);
    return true;
  }
  
  let resetpass = async(password, newpassword, confirm)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/change/password`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: global.email,
        current_password: password, new_password: newpassword, confirm_new_password: confirm
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      if(result.success==false){
        return updateError('Incorrect current password!', setError);
      }
      else{
        global.email=result.user.email;
        global.first_name=result.user.info.first_name;
        global.mainname=result.user.name
        global.maincover=result.user.info.cover;
        global.subs =result.user.info.subscription_id;
        global.member = result.user.created_at;
        global.id =result.user.user_id;
        navigation.navigate('Home');

      }
    })
  };


    return( 
      <>
        <ImageBackground source={require('../../assets/login/bg4.png')} style={styles.container}>
        <FormContainer>
          <Image source={require('../../assets/login/reset.png')} style={{width: '100%', height: '50%' }}/>
          <Text style={{  fontSize: 25, fontWeight: 'bold', marginTop: -15}}>Reset Password</Text>
          <Text style={{  fontSize: 11,  marginTop: 10, marginBottom: 20}}>Reset your Temporary Password for security purposes.</Text>
          <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values, {resetForm}) =>resetpass(values.password, values.newpassword, values.confirm, resetForm({values: ''}))}>
            {({values,errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit })=>{  
              const {password, newpassword, confirm} = values
              return <> 
                <FormInput error={touched.password && errors.password} onBlur={handleBlur('password')} value={password} onChangeText={handleChange('password')} autoCapitalize='none' secureTextEntry title='Password' placeholder='Current Password'/>
                <FormInput error={touched.newpassword && errors.newpassword} onBlur={handleBlur('newpassword')} value={newpassword} onChangeText={handleChange('newpassword')} autoCapitalize='none' secureTextEntry title='Password' placeholder='New Password'/>
                <FormInput error={touched.confirm && errors.confirm} onBlur={handleBlur('confirm')} value={confirm} onChangeText={handleChange('confirm')} autoCapitalize='none' secureTextEntry title='Confirm Password' placeholder='Confirm Password'/>
                {error ? (<Text style={{color: 'red', fontSize: 13, marginBottom: -10, marginTop: -5,textAlign: 'center'}}>{error}</Text>): null}
                <FormSubmitBtn onPress={handleSubmit} title='Login'/>
                <TouchableOpacity onPress={()=> navigation.navigate("Magusone")} style={[styles.sub]}>
                  <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>Cancel</Text>
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
  sub: {
    height: 55, borderRadius: 10, marginTop: 25,justifyContent: 'center',  alignItems: 'center', marginHorizontal: 20, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8, backgroundColor: '#049DD9' 
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

export default ChangePass;

