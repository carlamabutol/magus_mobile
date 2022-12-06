import React from "react";
import {Animated, View, StyleSheet, Text } from "react-native";

const FormHeader =({leftH, rightH, subH, leftTranslate=40, rightTranslate=-20, rightOpacity=0}) =>{
    return(
        <>
        <View style={{flexDirection: 'row', justifyContent: 'center', }}>
          <Animated.Text style={[styles.head, {transform: [{translateX: leftTranslate}]}]}>{leftH }</Animated.Text>
          <Animated.Text style={[styles.head, {opacity: rightOpacity, transform: [{translateY: rightTranslate}]}]}>{rightH }</Animated.Text>
        </View>
        <Text style={{fontSize: 18,  color: '#1b1b33', textAlign: 'center'}}>{subH }</Text>

        </>
    )
}

const styles = StyleSheet.create({
    head: {fontSize: 30, fontWeight: 'bold', color: '#1b1b33'}
});
export default FormHeader;