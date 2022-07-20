import React, { useContext, useState } from 'react';
import { Keyboard } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import InsideAuthApi from '../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  StyledInlineInput,
  StyledText,
  StyledInlineInputContainer
} from './style';
import { ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';

const EditApplication = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const formElementsArray = [];

  const [loader, setLoader] = useState(false);
  const [userVisible, setUserVisible] = useState(props.route.params.data.visible);
  const [data, setData] = useState({
    controls: {
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'description',
          text: 'Description*',
          placeholder: 'Enter your description',
        },
        value: props.route.params.data.details ? props.route.params.data.details : '',
        validation: {
          required: true,
        },
        valid: props.route.params.data.details ? true : false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'price',
          text: 'Expected Price',
          placeholder: 'Enter Expected Price',
        },
        value: props.route.params.data.expectedPrice ? props.route.params.data.expectedPrice.toString() : '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: true,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
        ],
      }
    },
  });

  const onInputChange = (val, type) => {
    let varVal = {};
    if (type !== 'price' && !validate(val, { required: true })) {
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
    } else if (type === 'price' && val > 0 && !validate(val, { isNumeric: true })) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('price'),
            valid: false,
          }),
        }),
      });
      setData(varVal);
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

  const applicationFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    if (isValid.includes(false)) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      const requestData = {
        application_id: props.route.params.data._id,
        details: data.controls.description.value,
        expectedPrice: Number(data.controls.price.value),
        userVisible: userVisible,
        images: []
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .updateApplicationApi(requestData)
        .then((res) => {
          setLoader(false);
          dispatch(SnackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoader(false);
          dispatch(SnackbarUpdate({
            type: 'error',
            msg: err.message
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


  return (
    <ShadowWrapperContainer>
      <StyledScrollView>
        <InputView>
          {formElementsArray?.map((x, index) => (
            x.id !== 'otp' && <Input
              key={index}
              title={x.config?.elementConfig?.text}
              placeholder={x.config?.elementConfig?.placeholder}
              onInputChange={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={x.config?.value}
              class={x.config?.className}
              type={x.config?.elementConfig?.type}
              keyNum={x.config?.validation?.isNumeric}
              isValid={x.config?.valid}
              validation={x.config?.validation}
              errorMsg={x.config?.errors}
              icons={x.config?.icons}
              ele={x.config?.elementType}
            />
          ))}
        </InputView>

        <StyledInlineInputContainer>
          <StyledInlineInput>
            <StyledText>User Visibility</StyledText>
            <Input
              ele={'switch'}
              color={colors.mainByColor}
              value={userVisible}
              onChange={() => setUserVisible(!userVisible)}
            />
          </StyledInlineInput>
        </StyledInlineInputContainer>
        <SubmitButton mode='contained' labelStyle={{ color: colors.backgroundColor }} loading={loader} onPress={!loader ? applicationFnc : null}>
          Edit Application
        </SubmitButton>
      </StyledScrollView>
    </ShadowWrapperContainer>
  );
};

export default EditApplication;