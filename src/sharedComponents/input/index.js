import React from 'react';
import { Picker } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { StyledInputElement, StyledInputView, StyledTitle, StyledError, StyledPicker, StyledSwitch, StyledSearchbar } from './style';

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
          {props.errorMsg !== '' ? <StyledError>{props.errorMsg}</StyledError> : null}
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
          {props.errorMsg !== '' ? <StyledError>{props.errorMsg}</StyledError> : null}
        </React.Fragment>
      );
      break;
    case 'select':
      inputElement = (
        <React.Fragment>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledPicker
            key={props.placeholder}
            value={props.value}
            open={props.open}
            items={props.items}
            multiple={props.multiple}
            zIndex={props.zIndex}
            zIndexInverse={props.zIndexInverse}
            min={props.min}
            max={props.max}
            maxHeight={100}
            autoScroll={true}
            style={props.style}
            listItemContainerStyle={props.listStyle}
            dropDownContainerStyle={props.containerStyle}
            itemSeparator={true}
            setOpen={props.setOpen}
            setValue={props.setValue}
            setItems={props.setItems}
            placeholder={props.placeholder}
          />
        </React.Fragment>)
      break;
    case 'switch':
      inputElement = (
        <StyledSwitch color={props.color} value={props.value} onValueChange={props.onChange} />
      )
      break;
    case 'search':
      inputElement = (
        <StyledSearchbar
          ref={props.ref}
          theme={props.theme}
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          isFocused={props.isFocused}
          onFocus={props.onFocus}
          autoFocus={props.focus}
          disabled
          editable={props.editable !== undefined? props.editable : true}
           />
      )
  }
  return inputElement;
};

export default Input;