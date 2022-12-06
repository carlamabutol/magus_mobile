import React from "react";
import { View, Dimensions, Text, KeyboardAvoidingView, Platform } from "react-native";

const FormContainer =({children}) =>{
    return(
        <>
        <KeyboardAvoidingView enabled behavior={Platform.OS=== 'ios' ? "padding" : null} style={{width: Dimensions.get('window').width, paddingHorizontal: 10}}>
          {children}
        </KeyboardAvoidingView>
        </>
    )
}


export default FormContainer;