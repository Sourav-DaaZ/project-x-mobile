import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
  } from 'react-native';

const Input = (props) => {
    let inputElement = null;

    switch (props.type) 
    {
        case 'text':
            inputElement = 
            (  
                <TextInput 
                        style={props.style} 
                        placeholder={props.placeholder}
                        onChangeText={(val)=> {props.onChangeText(val)}}
                    >
                </TextInput>
            )
            break;
        case 'password':
            inputElement = 
            (  
                <TextInput 
                        style={props.style} 
                        placeholder={props.placeholder}
                        onChangeText={(val)=> {props.onChangeText(val)}}
                    >
                </TextInput>
            )
            break;
        case 'select':
            break;
    }
    return inputElement;
};

export default Input;