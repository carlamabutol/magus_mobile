import React from "react";
import { View, StyleSHeet, Text , TextInput} from "react-native";

const FormInput =(props) =>{
  const {placeholder, title, error} =props
    return(
      <>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5, marginHorizontal: 20}}>
        
        {error ? (<Text style={{color: 'red', fontSize: 13, justifyContent: 'flex-start', marginBottom: -18, marginTop: -8}}>{error}</Text>) : null}
        </View>
        <TextInput {...props} placeholder={placeholder} style={{borderBottomWidth: 2, borderBottomColor: 'white', height: 30, fontSize: 13, marginBottom: 15, marginHorizontal:20}}/>

      </ >
    )
}


export default FormInput;