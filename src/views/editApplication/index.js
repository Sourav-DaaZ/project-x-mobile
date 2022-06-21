import React, { useContext, useState, useEffect } from 'react';
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
  StyledInlineInputContainer,
  StyledInput
} from './style';

const EditApplication = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const formElementsArray = [];
  const [genderArr, setGenderArr] = useState([
    { label: 'All', value: 'all' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [userVisible, setUserVisible] = useState(true);
  const [gender, setGender] = useState(genderArr[0].value);
  const [category, setCategory] = useState('');
  const [loader, setLoader] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [data, setData] = useState({
    controls: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'title',
          text: 'Title',
          placeholder: 'Enter your title',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'description',
          text: 'Description',
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
      },
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'price',
          text: 'Expected Price',
          placeholder: 'Enter Expected Price',
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
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

  useEffect(() => {
    let data = []
    props.route.params?.categories?.map((x, i) => {
      data.push({
        key: x._id,
        label: x.category_name, value: x._id
      })
    })
    setCategoryArr(data);
  }, [])

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

  const createPostFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    isValid.push(category.length > 0);
    if (isValid.includes(false)) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      setLoader(true);
      const requestData = {
        category_id: props.route.params.category ? props.route.params.category.id : category,
        title: data.controls.title.value,
        message: data.controls.description.value,
        expected_price: data.controls.price.value,
        isPublic: isPublic,
        genderSpecific: gender,
        userVisible: userVisible,
        location: {
          lat: 104,
          long: 20
        }
      }
      InsideAuthApi(authStore)
        .createPost(requestData)
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
    <StyledScrollView style={{ flex: 1 }}>
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
      {props.route.params.category ? <StyledText>Categoty Name: {props.route.params.category.name}</StyledText> : <StyledInlineInputContainer style={{ zIndex: 1000 }}>
        <StyledInput>
          <Input
            ele='select'
            open={openCategory}
            title={'Select Category'}
            value={category}
            items={categoryArr}
            placeholder={'Select Category'}
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              marginLeft: -5
            }}
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.borderColor,
            }}
            setOpen={setOpenCategory}
            setValue={setCategory}
            setItems={setCategoryArr}
          />
        </StyledInput>
        <StyledInput>
          <Input
            ele='select'
            open={openGender}
            title={'Terget Gender'}
            value={gender}
            items={genderArr}
            placeholder={'Select Gender'}
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              marginLeft: -5
            }}
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.borderColor,
            }}
            setOpen={setOpenGender}
            setValue={setGender}
            setItems={setGenderArr}
          />
        </StyledInput>
      </StyledInlineInputContainer>}
      <StyledInlineInputContainer>
        {props.route.params.category ? <StyledInput>
          <Input
            ele='select'
            open={openGender}
            title={'Terget Gender'}
            value={gender}
            items={genderArr}
            placeholder={'Select Gender'}
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              marginLeft: -5
            }}
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.borderColor,
            }}
            setOpen={setOpenGender}
            setValue={setGender}
            setItems={setGenderArr}
          />
        </StyledInput> : null}
      </StyledInlineInputContainer>
      <StyledInlineInputContainer>
        <StyledInlineInput>
          <StyledText>Public Post</StyledText>
          <Input
            ele={'switch'}
            color={colors.mainByColor}
            value={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </StyledInlineInput>
      </StyledInlineInputContainer>
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
      <SubmitButton mode='contained' loading={loader} onPress={!loader ? createPostFnc : null}>
        Create Post
      </SubmitButton>
    </StyledScrollView>
  );
};

export default EditApplication;