import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import InsideAuthApi from '../../services/inSideAuth';
import OutsideAuthApi from '../../services/outSideAuth';
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
  StyledLgout,
  StyledInlineInputContainer,
  StyledInput
} from './style';

const UpdateDetails = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const formElementsArray = [];
  const [genderArr, setGenderArr] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [gender, setGender] = useState(detailsStore.gender !== '' ? detailsStore.gender : '');
  const [category, setCategory] = useState(detailsStore.userCat !== '' ? detailsStore.userCat._id : '');
  const [tergetCategory, setTergetCategory] = useState(detailsStore.expectedCat !== '' ? detailsStore.expectedCat : '');
  const [openTergetCategory, setOpenTergetCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [data, setData] = useState({
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'name',
          text: 'Name',
          placeholder: 'Enter your title',
        },
        value: detailsStore.name,
        validation: {
          required: true
        },
        valid: detailsStore.name !== '',
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
    },
  });

  useEffect(() => {
    let data = []
    dispatch(loader(true));
    OutsideAuthApi()
      .categoryListApi()
      .then((res) => {
        res.data?.map((x, i) => {
          data.push({
            key: x._id,
            label: x.category_name, value: x._id
          })
        })
        dispatch(loader(false));
        setCategoryArr(data);
      })
      .catch((err) => {
        dispatch(loader(false));
        dispatch(SnackbarUpdate({
          type: 'error',
          msg: err.message
        }));
      });
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

  const editDetailsFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    isValid.push(category.length > 0);
    isValid.push(tergetCategory.length > 0);
    isValid.push(gender.length > 0);
    if (isValid.includes(false)) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      setLoading(true);
      const requestData = {
        name: data.controls.name.value,
        category: category,
        category_preference: tergetCategory,
        gender: gender,
      }
      InsideAuthApi(authStore)
        .updateDetailsApi(requestData)
        .then((res) => {
          setLoading(false);
          dispatch(SnackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.navigate('Home');
        })
        .catch((err) => {
          setLoading(false);
          dispatch(SnackbarUpdate({
            type: 'error',
            msg: err.message
          }))
        });
    }
  }

  const onLoginOut = () => {
    InsideAuthApi(authStore)
      .logout()
      .then(async (res) => {
        await AsyncStorage.removeItem('token');
        dispatch(tokenUpdate({
          access_token: '',
          refresh_token: ''
        }));
      })
      .catch(async (err) => {
        await AsyncStorage.removeItem('token');
        dispatch(tokenUpdate({
          access_token: '',
          refresh_token: ''
        }));
      });
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
          <Input
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
      <StyledInlineInputContainer style={{ zIndex: 1000 }}>
        <StyledInput>
          <Input
            ele='select'
            open={openCategory}
            title={'My Category'}
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
            title={'Gender'}
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
      </StyledInlineInputContainer>
      <StyledInlineInputContainer>
        <StyledInput>
          <Input
            ele='select'
            open={openTergetCategory}
            title={'Interested Category'}
            value={tergetCategory}
            items={categoryArr}
            multiple={true}
            max={5}
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
            setOpen={setOpenTergetCategory}
            setValue={setTergetCategory}
            setItems={setCategoryArr}
          />
        </StyledInput>
      </StyledInlineInputContainer>
      <SubmitButton mode='contained' loading={loading} onPress={!loading ? editDetailsFnc : null}>
        Save
      </SubmitButton>
      <TouchableOpacity style={{
        marginTop: 20
      }} onPress={props.route.params?.logedin ? onLoginOut : () => props.navigation.goBack()}>
        <StyledLgout>{props.route.params?.logedin ? "Logout" : "Back"}</StyledLgout>
      </TouchableOpacity>
    </StyledScrollView>
  );
};

export default UpdateDetails;