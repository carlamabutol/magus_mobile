import React, { useEffect, useState } from "react";
import { ImageBackground, Alert, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../FormSubmitBtn";
import { useNavigate } from "react-router-native";
import moment from 'moment'

const validationSchema = Yup.object({
  firstname: Yup.string().trim('Invalid First Name').required('First Name is required!'),
  lastname: Yup.string().trim('Invalid Last Name').required('Last Name is required!'),
  email: Yup.string().email('Invalid email').required('Email is required!'),
  password: Yup.string().trim().min(8, '').required('Password is required!'),
  confirm: Yup.string().equals([Yup.ref('password'), null], 'Does not match!')
   
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


const SignupForm =({navigation}) =>{
  
  const userInfo={
    firstname: '', lastname: '', email: '', password: '', confirm: ''
  };
  const {firstname, lastname, email, password, confirm} =userInfo;
  const [error, setError] = useState('');
  const handleOnChangeText = (value, fieldName) =>{
    setUserInfo({...userInfo, [fieldName]: value})
  };
  const isValidForm =()=>{
    if(!isValidObjField(userInfo)) return updateError('Required', setError);
    if(password.length<8) return updateError('Invalid pass', setError);
    return true;
  }


  let today = moment().format('YYYY-MM-DD hh:mm:ss');
  let cover = 'sample.png';
  let lenth=12;
  const [string, setString] = React.useState('');
  useEffect(()=>{
    const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
      {length: lenth},
        () => char[Math.floor(Math.random() * char.length)]
      );
    const randomString = random.join("");
    setString(randomString);
    
  }, [])
  


  let createUser = async(firstname, lastname, email, password)=>{
    var name=firstname+" "+lastname;
    await fetch(`https://dev.magusaudio.com/api/v1/user/register`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, first_name: firstname, last_name: lastname, name: name,
        password: password, subscription_id: 1
      })
      
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      return updateError("Registered Successfully", setError); 
    })
  };


    return( 
      <>
      <ImageBackground source={require('../../assets/welcome1bg.png')} style={styles.container}>
        <FormContainer>
          <Image source={require('../../assets/thedeer.png')} style={{width: '19%', height: '15%', paddingTop: 10, alignSelf: 'center', shadowOffset:{width: 1, height: 2}, shadowOpacity: 0, shadowRadius: 1}}/>
          <View > 
            <Text style={{ marginTop: 5, marginBottom: 20,   fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'rgba(242,242,242,1)', textShadowColor: 'black', textShadowOffset: {width: 0.5, height: 1}, textShadowRadius: 2}}>Magus Audio</Text>
          </View>
          <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values, {resetForm}) =>createUser(values.firstname, values.lastname, values.email, values.password, resetForm({values: ''}))}>
            {({values,errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit })=>{  
              const {firstname, lastname, email, password, confirm} = values
              return <> 
                <FormInput error={touched.firstname && errors.firstname} onBlur={handleBlur('firstname')} value={firstname} onChangeText={handleChange('firstname')} title='First name' placeholder='First Name'/>
                <FormInput error={touched.lastname && errors.lastname} onBlur={handleBlur('lastname')} value={lastname} onChangeText={handleChange('lastname')} title='Last name' placeholder='Last Name'/>
                <FormInput error={touched.email && errors.email} onBlur={handleBlur('email')} value={email} onChangeText={handleChange('email')} autoCapitalize='none' title='Email' placeholder='Email Address'/>
                <FormInput error={touched.password && errors.password} onBlur={handleBlur('password')} value={password} onChangeText={handleChange('password')} autoCapitalize='none' secureTextEntry title='Password' placeholder='Password'/>
                <FormInput error={touched.confirm && errors.confirm} onBlur={handleBlur('confirm')} value={confirm} onChangeText={handleChange('confirm')} autoCapitalize='none' secureTextEntry title='Confirm Password' placeholder='Confirm Password'/>
                <FormSubmitBtn submitting={isSubmitting} onPress={handleSubmit} title='Signup'/>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={{marginTop:40, alignContent:'center'}}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={{fontSize: 15, }}>Already have an account? </Text>
                    <Text style={{fontSize: 15,  fontWeight: 'bold', color: 'rgba(24,119,242,1)'}}>Login</Text>
                  </View>
                </TouchableOpacity>
                
              </>
            }}
          </Formik>
          
         
        </FormContainer> 
        {error ? (
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end',bottom:  Dimensions.get('window').height/2, position: 'absolute', width: Dimensions.get('window').width, height:  Dimensions.get('window').height/2, shadowOpacity: 0.2, alignSelf: 'center',}}>
            <View style={{position: "absolute", }}>
              <TouchableOpacity onPress={()=> [setModalVisible(true),setIsGuideClick(true)]} style={[styles.guideBtn, {backgroundColor: '#4C89C6', }]}>
                <Text style={{fontSize: 16, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',  padding: 7, }}>{error}</Text>
              </TouchableOpacity>
            </View>
          </View>):null}
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
  guideBtn: {
    width: Dimensions.get('window').width, height: 60, justifyContent: 'center', alignItems: 'center'
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

export default SignupForm;

