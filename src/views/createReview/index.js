import React, { useContext, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import defaultValue from '../../constants/defaultValue';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import InsideAuthApi from '../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';
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

const CreateReview = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const formElementsArray = [];

  const [loader, setLoader] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [data, setData] = useState({
    controls: {
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'description',
          text: 'Description*',
          placeholder: 'Enter your description',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
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
    } else if (type === 'price' && !validate(val, { isNumeric: true })) {
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
        "isPublic": isPublic,
        "description": data.controls.description.value,
        "user_id": props.route.params.id,
        "token": authStore.firebase_token
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .createReviewApi(requestData)
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
            <StyledText>Public Visibility</StyledText>
            <Input
              ele={'switch'}
              color={colors.mainByColor}
              value={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
          </StyledInlineInput>
        </StyledInlineInputContainer>
        <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loader} onPress={!loader ? applicationFnc : null}>
          Create Review
        </SubmitButton>
      </StyledScrollView>
    </ShadowWrapperContainer>
  );
};

export default CreateReview;