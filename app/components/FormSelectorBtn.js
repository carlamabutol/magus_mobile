import React from "react";
import { View, StyleSheet, Text ,Animated, TouchableWithoutFeedback} from "react-native";

const FormSelectorBtn =({title, backgroundColor, onPress}) =>{
    return (
        <>
        <TouchableWithoutFeedback onPress={onPress}>
          <Animated.View style={[styles.container, {backgroundColor}]}>
            <Text style={{color: 'white', fontSize: 16}}>{title}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {height: 45, width: '50%', backgroundColor: '#1b1b33', justifyContent: 'center', alignItems: 'center'}
  });
export default FormSelectorBtn;