import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const FormSubmitBtn =({title, submitting, onPress}) =>{
  const backgroundColor = submitting ? 'rgba(24,119,242,0.4)': '#4C89C6'
    return(
      <>
        <TouchableOpacity onPress={submitting? null :  onPress} style={[styles.sub, {backgroundColor}]}>
          <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>{title}</Text>
        </TouchableOpacity>
      </>
    )
}
const styles = StyleSheet.create({
  sub: {height: 55, borderRadius: 10, marginTop: 25,justifyContent: 'center',  alignItems: 'center', marginHorizontal: 20, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}
})

export default FormSubmitBtn;