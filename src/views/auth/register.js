import React, { useContext, useState, useCallback } from 'react';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import defaultValue from '../../constants/defaultValue';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import Modal from '../../sharedComponents/modal';
import OutsideAuthApi from '../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate, tokenUpdate } from '../../store/actions';
import { debounce } from "lodash";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Routes from '../../constants/routeConst';

import {
  LoginOuterView,
  SplashTitle,
  LoginDescription,
  LoginSubmitButton,
  InputView,
  StyledInputOtp,
  StyledViewButton,
  StyledForgot
} from './style';
import Tabs from '../../sharedComponents/tab';

const Register = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    controls: {
      userId: {
        elementType: 'input',
        elementConfig: {
          type: 'userId',
          text: 'User Id',
          placeholder: 'Enter your User ID',
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
          <FontAwesome name="user-o" color="#05375a" size={spacing.width * 5} />,
          <Feather name="check-circle" color="green" size={spacing.width * 5} />,
        ],
      },
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
          <FontAwesome name="user-o" color="#05375a" size={spacing.width * 5} />,
          <Feather name="check-circle" color="green" size={spacing.width * 5} />,
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
          <FontAwesome name="lock" color="#05375a" size={spacing.width * 5} />,
          <Feather name={'eye-off'} color="gray" size={spacing.width * 5} />,
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
          <FontAwesome name="lock" color="#05375a" size={spacing.width * 5} />,
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
      setData(varVal);
    } else if (type === 'email' && !validate(val, { email: true })) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('email'),
            valid: false,
          }),
        }),
      });
      setData(varVal);
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
      setData(varVal);
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
      setData(varVal);
    } else if (type === 'userId') {
      const requestData = {
        "userId": val
      }
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          userId: updateObject(data.controls.userId, {
            value: val,
            valid: false,
          }),
        }),
      });
      setData(varVal);
      onChangeUserID(requestData, val);
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
      setData(varVal);
    }
  };

  const onChangeUserID = useCallback(debounce((requestData, val) => {
    OutsideAuthApi()
      .userIdCheckApi(requestData)
      .then((res) => {
        let varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            userId: updateObject(data.controls.userId, {
              errors: '',
              value: val,
              valid: true,
            }),
          }),
        });
        setData(varVal);
      })
      .catch((err) => {
        let varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            userId: updateObject(data.controls.userId, {
              errors: err.message,
              value: val,
              valid: false,
            }),
          }),
        });
        setData(varVal);
      });
  }, 700), [])

  const registerFnc = () => {
    let isValid = [];
    let val = {};
    formElementsArray.map(
      (x) => (
        x.id == 'userId' ||
          x.id == 'email' ||
          x.id == 'password' ||
          (modalShow && x.id == 'otp')
          ? (val[x.id] = x.config.value)
          : null
      ),
    );
    if (isValid.includes(false)) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      if (!modalShow) {
        const requestData = {
          "email": data.controls.email.value
        }
        let varVal;
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            otp: updateObject(data.controls.otp, {
              errors: '',
              value: '',
              valid: true,
            }),
          }),
        });
        setData(varVal);
        OutsideAuthApi()
          .verifyOtp(requestData)
          .then((res) => {
            setModalShow(true);
          })
          .catch((err) => {
            dispatch(snackbarUpdate({
              type: 'error',
              msg: err?.message ? err.message : ''
            }))
          });
      } else {
        const requestData = {
          "userId": data.controls.userId.value,
          "otp": data.controls.otp.value.toString(),
          "email": data.controls.email.value,
          "password": data.controls.password.value
        }
        let varVal;
        OutsideAuthApi()
          .registerUserApi(requestData)
          .then((res) => {
            dispatch(tokenUpdate({
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token
            }))
            props.navigation.navigate(Routes.updateDetails);
          })
          .catch((err) => {
            varVal = updateObject(data, {
              controls: updateObject(data.controls, {
                otp: updateObject(data.controls.otp, {
                  errors: err.message,
                  value: '',
                  valid: false,
                }),
              }),
            });
            setData(varVal);
          });
      }
    }
  }


  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  return (
    <LoginLayout {...props}>
      <StyledViewButton>
        <Tabs select={false} text='Log In' onPress={() => {
          props.navigation.navigate(Routes.login);
        }} />
        <Tabs select={true} text='Register' onPress={() => {
          props.navigation.navigate(Routes.register);
        }} />
      </StyledViewButton>
      <LoginOuterView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
              errorMsg={x.config?.errors}
              icons={x.config?.icons}
              ele={x.config?.elementType}
            />
          ))}
        </InputView>
        <StyledForgot></StyledForgot>
        <LoginSubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={registerFnc}>
          Register
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
          <LoginSubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={registerFnc}>
            Register
          </LoginSubmitButton>
        </StyledInputOtp>
      </Modal>
    </LoginLayout>
  );
};

export default Register;