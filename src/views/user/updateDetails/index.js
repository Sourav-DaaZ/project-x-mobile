import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import Tabs from '../../../sharedComponents/tab';
import { updateObject, validate } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import OutsideAuthApi from '../../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import Routes from '../../../constants/routeConst';

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  WrapperImage,
  StyledInlineInputContainer,
  StyledInput,
  BodyWrapper,
  StyledViewButton,
} from './style';
import { Avatar } from 'react-native-paper';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { debounce } from 'lodash';

const UpdateDetails = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const formElementsArray = [];
  const [genderArr, setGenderArr] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [gender, setGender] = useState(props.route.params?.data?.gender ? props.route.params.data.gender : '');
  const [category, setCategory] = useState(props.route.params?.data?.category?._id ? props.route.params.data.category._id : '');
  const [tergetCategory, setTergetCategory] = useState(props.route.params?.data?.categoryPreference ? props.route.params.data.categoryPreference : []);
  const [openTergetCategory, setOpenTergetCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [globalDetails, setGlobalDetails] = useState(true);
  const [image, setImage] = useState(props.route.params?.data?.images ? props.route.params.data.images : null);
  const [userId, setUserId] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'name',
      text: 'Name',
      placeholder: 'Enter your title',
    },
    value: props.route.params?.data?.userId ? props.route.params.data.userId : '',
    validation: {
      required: props.route.params?.data?.userId ? true : false
    },
    valid: detailsStore.name !== '',
    errors: '',
    className: [],
    icons: [],
  })
  const [data, setData] = useState({
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'name',
          text: 'Name',
          placeholder: 'Enter your title',
        },
        value: props.route.params?.data?.name ? props.route.params.data.name : '',
        validation: {
          required: props.route.params?.data?.name ? true : false
        },
        valid: detailsStore.name !== '',
        errors: '',
        className: [],
        icons: [],
      },
      contactNumber: {
        elementType: 'input',
        elementConfig: {
          type: 'contactNumber',
          text: 'Contact Number',
          placeholder: 'Enter your Contact Number',
        },
        value: props.route.params?.data?.contactNumber ? props.route.params.data.contactNumber : '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: props.route.params?.data?.contactNumber ? true : false,
        errors: '',
        className: [],
        icons: [
          <Feather name="phone-call" color="#05375a" size={spacing.width * 5} />
        ],
      },
      contactAddress: {
        elementType: 'input',
        elementConfig: {
          type: 'contactAddress',
          text: 'Contact Address',
          placeholder: 'Enter your Contact Address',
        },
        value: props.route.params?.data?.contactAddress ? props.route.params.data.contactAddress : '',
        validation: {
          required: false,
          multiline: true
        },
        valid: props.route.params?.data?.contactAddress ? true : false,
        errors: '',
        className: [],
        icons: [],
      },
      subCategory: {
        elementType: 'input',
        elementConfig: {
          type: 'subCategory',
          text: 'Sub-category',
          placeholder: 'Enter your Sub-Category',
        },
        value: props.route.params?.data?.subCategory ? props.route.params.data.subCategory : '',
        validation: {
          required: false,
        },
        valid: props.route.params?.data?.subCategory ? true : false,
        errors: '',
        className: [],
        icons: [],
      },
      age: {
        elementType: 'input',
        elementConfig: {
          type: 'age',
          text: 'Age',
          placeholder: 'Enter your age',
        },
        value: props.route.params?.data?.age ? props.route.params.data.age.toString() : '',
        validation: {
          required: false,
          isNumeric: true
        },
        valid: props.route.params?.data?.age ? true : false,
        errors: '',
        className: [],
        icons: [],
      },
      facebook: {
        elementType: 'input',
        elementConfig: {
          type: 'facebook',
          text: 'Facebook Link',
          placeholder: 'Enter Facebook Link',
        },
        value: props.route.params?.data?.user_socials?.fb_link ? props.route.params.data.user_socials.fb_link : '',
        validation: {
          required: false,
        },
        valid: true,
        errors: '',
        className: [],
        icons: [],
      },
      insta: {
        elementType: 'input',
        elementConfig: {
          type: 'insta',
          text: 'Instagram Link',
          placeholder: 'Enter Instagram Link',
        },
        value: props.route.params?.data?.user_socials?.insta_link ? props.route.params.data.user_socials.insta_link : '',
        validation: {
          required: false,
        },
        valid: true,
        errors: '',
        className: [],
        icons: [],
      }
    }
  });

  useEffect(() => {
    let data = []
    OutsideAuthApi()
      .categoryListApi()
      .then((res) => {
        res.data?.map((x, i) => {
          data.push({
            key: x._id,
            label: x.category_name, value: x._id
          })
        })
        setCategoryArr(data);
      })
      .catch((err) => {
        dispatch(snackbarUpdate({
          type: 'error',
          msg: err?.message ? err.message : ''
        }));
      });
  }, [])

  const onInputChange = (val, type) => {
    let varVal = {};
    if (type !== 'contactAddress' && type !== 'contactAddress' && type !== 'facebook' && type !== 'insta' && !validate(val, { required: true })) {
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
    } else if (type === 'contactNumber' && !validate(val, { isNumeric: true })) {
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
    } else if ((type === 'age' && !validate(val, { isNumeric: true }) && !Number(data.controls.age.value) >= 0)) {
      varVal = updateObject(data, {
        controls: updateObject(data.controls, {
          [type]: updateObject(data.controls[type], {
            value: val,
            errors: validation.validateField('age'),
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
  const onIdChange = (val, type) => {
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
    } else {
      varVal = updateObject(userId, {
        errors: '',
        value: val,
        valid: true,
      });
      setUserId(varVal);
      onChangeUserID(val)
    }
  };

  const onChangeUserID = useCallback(debounce((val) => {
    const requestData = {
      "userId": val
    }
    OutsideAuthApi()
      .userIdCheckApi(requestData)
      .then((res) => {
        let varVal = updateObject(userId, {
          errors: '',
          value: val,
          valid: true,
        });
        setUserId(varVal);
      })
      .catch((err) => {
        let varVal = updateObject(userId, {
          errors: err.message,
          value: val,
          valid: false,
        });
        setUserId(varVal);
      });
  }, 700), [])

  const editDetailsFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    isValid.push(category.length > 0);
    isValid.push(tergetCategory.length > 0);
    isValid.push(gender.length > 0);
    if (isValid.includes(false)) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      setLoading(true);
      const requestData = {
        name: data.controls.name.value,
        contactNumber: data.controls.contactNumber.value,
        contactAddress: data.controls.contactAddress.value,
        subCategory: data.controls.subCategory.value,
        fb_link: data.controls.facebook.value,
        insta_link: data.controls.insta.value,
        age: Number(data.controls.age.value),
        category: category,
        categoryPreference: tergetCategory,
        gender: gender,
        images: image
      }
      InsideAuthApi(authStore)
        .updateDetailsApi(requestData)
        .then((res) => {
          setLoading(false);
          dispatch(snackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.navigate(Routes.home);
        })
        .catch((err) => {
          setLoading(false);
          dispatch(snackbarUpdate({
            type: 'error',
            msg: err?.message ? err.message : ''
          }))
        });
    }
  }

  const editId = () => {
    let isValid = [];
    isValid.push(userId.value.length > 0 && userId.valid);
    if (isValid.includes(false)) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      setLoading(true);
      const requestData = {
        userId: userId.value
      }
      InsideAuthApi(authStore)
        .changeUseridApi(requestData)
        .then((res) => {
          setLoading(false);
          dispatch(snackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.navigate(Routes.home);
        })
        .catch((err) => {
          setLoading(false);
          dispatch(snackbarUpdate({
            type: 'error',
            msg: err?.message ? err.message : ''
          }))
        });
    }
  }

  const uploadImg = async () => {
    const options = {
      includeBase64: true,
      maxWidth: 700,
      maxHeight: 700,
      quality: .5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      const result = await launchImageLibrary(options);
      setImage('data:image/png;base64,' + result.assets[0].base64);
    } catch (e) {
      console.log(e)
    }
  }

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  return (
    <StyledScrollView stickyHeaderIndices={[0]}>
      <BottomShadow small>
        <StyledViewButton>
          <Tabs select={globalDetails} text='Details' onPress={() => setGlobalDetails(true)} />
          <Tabs select={!globalDetails} text='Cred' onPress={() => setGlobalDetails(false)} />
        </StyledViewButton>
      </BottomShadow>
      <WrapperImage>
        <TouchableOpacity style={{ zIndex: 9 }} onPress={uploadImg}>
          <Avatar.Image size={120} source={{ uri: image ? image : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />
        </TouchableOpacity>
      </WrapperImage>
      {globalDetails ? <ShadowWrapperContainer>
        <BodyWrapper>
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
                multiline={x.config?.validation?.multiline}
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
                  marginLeft: -spacing.width
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
                  marginLeft: -spacing.width
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
                  marginLeft: -spacing.width
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
          <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? editDetailsFnc : null}>
            Save
          </SubmitButton>
        </BodyWrapper>
      </ShadowWrapperContainer> : <ShadowWrapperContainer>
        <BodyWrapper>
          <InputView>
            <Input
              title={userId.elementConfig?.text}
              placeholder={userId.elementConfig?.placeholder}
              onInputChange={onIdChange}
              onSubmit={() => Keyboard.dismiss()}
              value={userId.value}
              class={userId.className}
              type={userId.elementConfig?.type}
              keyNum={userId.validation?.isNumeric}
              multiline={userId.validation?.multiline}
              isValid={userId.valid}
              validation={userId.validation}
              errorMsg={userId.errors}
              icons={userId.icons}
              ele={userId.elementType}
            />
          </InputView>
        </BodyWrapper>
        <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? editId : null}>
          Save
        </SubmitButton>
      </ShadowWrapperContainer>}
    </StyledScrollView>
  );
};

export default UpdateDetails;