import React, { useContext, useState, useEffect } from 'react';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import defaultValue from '../../constants/defaultValue';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import Modal from '../../sharedComponents/modal';
import OutsideAuthApi from '../../services/outSideAuth';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, tokenUpdate } from '../../store/actions';

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

import Routes from '../../constants/routeConst';

const Login = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const [modalShow, setModalShow] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = React.useState(false);
  const [data, setData] = useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          text: 'User ID / Email',
          placeholder: 'Enter your User ID / email',
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
          password: true,
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
  const formElementsArray = [];
  const dispatch = useDispatch();

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
    let isValid = [];
    let val = {};
    formElementsArray.map(
      (x) => (
        x.id == 'email' ||
          (!isOtpLogin && x.id == 'password') ||
          (isOtpLogin && modalShow && x.id == 'otp')
          ? (val[x.id] = x.config.value)
          : null,
        (!isOtpLogin && x.id == 'password') ||
          (isOtpLogin && modalShow && x.id == 'otp')
          ? isValid.push(x.config.valid)
          : null
      ),
    );
    if (isValid.includes(false)) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      if (isOtpLogin && !modalShow) {
        const requestData = {
          ...(validate(data.controls.email.value, { email: true }) && { "email": data.controls.email.value }),
          ...(!validate(data.controls.email.value, { email: true }) && { "userId": data.controls.email.value })
        }
        let varVl;
        varVl = updateObject(data, {
          controls: updateObject(data.controls, {
            otp: updateObject(data.controls.otp, {
              errors: '',
              value: '',
              valid: true,
            }),
          }),
        });
        setData(varVl);
        OutsideAuthApi()
          .verifyOtp(requestData)
          .then((res) => {
            setModalShow(true);
          })
          .catch((err) => {
            dispatch(SnackbarUpdate({
              type: 'error',
              msg: err?.message ? err.message : ''
            }))
          });
      } else {
        const requestData = {
          "userId": data.controls.email.value,
          ...(modalShow && { otp: data.controls.otp.value.toString() }),
          ...(!modalShow && { password: data.controls.password.value }),
        }
        let varVl;
        OutsideAuthApi()
          .loginApi(requestData)
          .then((res) => {
            dispatch(tokenUpdate({
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token
            }))
            props.navigation.navigate(Routes.home);
          })
          .catch((err) => {
            varVl = updateObject(data, {
              controls: updateObject(data.controls, {
                otp: updateObject(data.controls.otp, {
                  errors: err.message,
                  value: '',
                  valid: false,
                }),
              }),
            });
            setData(varVl);
          });
      }
    }
  }

  const resetPassword = () => {
    const requestData = {
      ...(validate(data.controls.email.value, { email: true }) && { "email": data.controls.email.value }),
      ...(!validate(data.controls.email.value, { email: true }) && { "userId": data.controls.email.value })
    }
    if (!data.controls.email.valid) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      OutsideAuthApi()
        .requestForChangePassword(requestData)
        .then((res) => {
          dispatch(SnackbarUpdate({
            type: 'success',
            msg: res.message
          }))
        })
        .catch((err) => {
          dispatch(SnackbarUpdate({
            type: 'error',
            msg: err?.message ? err.message : ''
          }))
        });
    }
  }

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  const GlobalButton = (select, text, onPress) => (
    select ? <StyledButtonActive labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
  )

  return (
    <LoginLayout {...props}>
      <StyledViewButton>
        {GlobalButton(true, 'Log In', () => {
          setGlobalPost(true);
          props.navigation.navigate(Routes.login);
        })}
        {GlobalButton(false, 'Register', () => {
          props.navigation.navigate(Routes.register);
        })}
      </StyledViewButton>
      <LoginOuterView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <InputView>
          {formElementsArray?.map((x, index) => (
            (x.id !== 'otp' && !(x.id === 'password' && isOtpLogin)) && <Input
              key={index}
              title={x.config?.elementConfig?.text}
              placeholder={x.config?.elementConfig?.placeholder}
              onInputChange={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={x.config?.value}
              type={x.config?.elementConfig?.type}
              isValid={x.config?.valid}
              validation={x.config?.validation}
              errorMsg={x.config?.errors}
              icons={x.config?.icons}
              ele={x.config?.elementType}
            />
          ))}
          <StyledForgot>
            <TouchableOpacity onPress={resetPassword}><LoginDescription>Forgot Password?</LoginDescription></TouchableOpacity><TouchableOpacity onPress={() => setIsOtpLogin(!isOtpLogin)}><LoginDescription>Login with {!isOtpLogin ? 'OTP' : 'Password'}?</LoginDescription></TouchableOpacity>
          </StyledForgot>
        </InputView>
        <LoginSubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={loginFnc}>
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
              errorMsg={x.config?.errors}
              icons={x.config?.icons}
              ele={x.config?.elementType}
            />))}
          <StyledForgot>
          </StyledForgot>
          <LoginSubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={loginFnc}>
            Login
          </LoginSubmitButton>
        </StyledInputOtp>
      </Modal>
    </LoginLayout>
  );
};

export default Login;