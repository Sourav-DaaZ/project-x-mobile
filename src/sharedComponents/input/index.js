import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { StyledInputElement, StyledInputView, StyledTitle } from './style';

const Input = (props) => {
  const [dot, setDot] = React.useState(true);
  let inputElement = null;
  switch (props.ele) {
    case 'input':
      inputElement = (
        <React.Fragment>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledInputView
            style={props.styleView}>
            {/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
            {props.icons ? props.icons[0] : null}
            <StyledInputElement
              placeholder={props.placeholder}
              style={props.style}
              autoFocus={props.autoFocus}
              keyboardType={props.keyNum ? "numeric" : null}
              onChangeText={(val) => props.onInputChange(val, props.type)}
              value={props.value}
              onBlur={() => props.onBlur ? props.onBlur(props.type) : null}
              onSubmitEditing={() => props.onSubmit()}
              autoCapitalize="none"
            />
            {props.isValid ? (props.icons ? props.icons[1] : null) : null}
          </StyledInputView>
        </React.Fragment>
      );
      break;
    case 'password':
      inputElement = (
        <React.Fragment>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledInputView
            style={props.styleView}>
            {props.icons ? props.icons[0] : null}
            <StyledInputElement
              placeholder={props.placeholder}
              style={props.inputStyle}
              onChangeText={(val) => props.onInputChange(val, props.type)}
              value={props.value}
              autoFocus={props.autoFocus}
              onSubmitEditing={() => props.onSubmit()}
              autoCapitalize="none"
              secureTextEntry={dot}
            />
            <Feather
              name={dot ? 'eye-off' : 'eye'}
              color="gray"
              size={20}
              onPress={() => setDot(!dot)}
            />
          </StyledInputView>
        </React.Fragment>
      );
      break;
    // case 'multi-select':
    // inputElement = <Multiselect options={props.options} displayValue="name"/>
    // break;
  }
  return inputElement;
};

export default Input;