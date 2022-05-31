import React, { useContext, useState } from 'react';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import defaultValue from '../../constants/defaultValue';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import Modal from '../../sharedComponents/modal';
import OutsideAuthApi from '../../services/outSideAuth';
import { TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  LoginOuterView,
  SplashTitle,
  LoginDescription,
  LoginSubmitButton,
  InputView,
  StyledInputOtp,
  StyledViewButton,
  StyledTouchableOpacity,
  StyledButtonActive,
  StyledButtonView,
  StyledForgot
} from './style';

const Login = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const [modalShow, setModalShow] = useState(false);
  const [globalPost, setGlobalPost] = useState(true);
  const [data, setData] = useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          text: 'Email',
          placeholder: 'Enter your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      password: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          text: 'Password',
          placeholder: 'Enter your password',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [
          <FontAwesome name="lock" color="#05375a" size={20} />,
          <Feather name={'eye-off'} color="gray" size={20} />,
        ],
      },
      otp: {
        elementType: 'password',
        value: '',
        elementConfig: {
          type: 'otp',
          text: 'Otp',
          placeholder: 'Enter your OTP',
        },
        validation: {
          required: true,
          minLength: defaultValue.otpLength,
        },
        valid: false,
        errors: '',
        success: '',
        className: [],
        icons: [
          <FontAwesome name="lock" color="#05375a" size={20} />,
        ],
      },
    },
  });
  const formElementsArray = []

  const onInputChange = (val, type) => {
    let varVal = {};
    if (!validate(val, { required: true })) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.requiredField(),
            valid: false,
          }),
        }),
      });
    } else if (type === 'email' && !validate(val, { isEmail: true })) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('email'),
            valid: false,
          }),
        }),
      });
    } else if (type === 'password' && !validate(val, { password: true })) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('password'),
            valid: false,
          }),
        }),
      });
    } else if (
      type === 'otp' &&
      !validate(val, { minLength: defaultValue.otpLength })
    ) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('OTP'),
            success: '',
            valid: false,
          }),
        }),
      });
    } else {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: '',
            valid: true,
          }),
        }),
      });
    }
    setData(varVal);
  };

  const loginFnc = () => {
    OutsideAuthApi()
      .loginApi()
      .then((res) => {
        console.warn(res)
      })
      .catch((err) => {
        // console.warn(err)
      })
  }

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  const GlobalButton = (select, text, onPress) => (
    select ? <StyledButtonActive mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
  )

  return (
    <LoginLayout {...props}>
      <StyledViewButton>
        {GlobalButton(globalPost, 'Log In', () => setGlobalPost(true))}
        {GlobalButton(!globalPost, 'Register', () => setGlobalPost(false))}
      </StyledViewButton>
      <LoginOuterView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* <LoginDescription>Please Login with details.</LoginDescription> */}
        <InputView>
          {formElementsArray?.map((x, index) => (
            x.id !== 'otp' && <Input
              key={index}
              title={x.config?.elementConfig?.text}
              placeholder={x.config?.elementConfig?.placeholder}
              onInputChange={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={x.config?.value}
              type={x.config?.elementConfig?.type}
              isValid={x.config?.valid}
              validation={x.config?.validation}
              icons={x.config?.icons}
              ele={x.config?.elementType}
            />
          ))}
          <StyledForgot>
            <TouchableOpacity><LoginDescription>Forgot Password?</LoginDescription></TouchableOpacity><TouchableOpacity onPress={() => setModalShow(true)}><LoginDescription>Login with OTP?</LoginDescription></TouchableOpacity>
          </StyledForgot>
        </InputView>
        <LoginSubmitButton mode='contained' onPress={loginFnc}>
          Login
        </LoginSubmitButton>
      </LoginOuterView>
      <Modal show={modalShow} onClose={() => setModalShow(false)}>
        <SplashTitle>Otp!</SplashTitle>
        <LoginDescription style={{ marginBottom: 20 }}>Please enter otp details.</LoginDescription>
        <StyledInputOtp>
          {formElementsArray?.map((x, index) => (
            x.id === 'otp' && <Input
              key={index}
              title={x.config?.elementConfig?.text}
              placeholder={x.config?.elementConfig?.placeholder}
              onInputChange={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={x.config?.value}
              autoFocus={true}
              type={x.config?.elementConfig?.type}
              isValid={x.config?.valid}
              validation={x.config?.validation}
              icons={x.config?.icons}
              ele={x.config?.elementType}
            />))}
          <LoginSubmitButton mode='contained' onPress={() => setModalShow(true)}>
            Login
          </LoginSubmitButton>
        </StyledInputOtp>
      </Modal>
    </LoginLayout>
  );
};

export default Login;