import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import { updateObject, validate } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import OutsideAuthApi from '../../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
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
  StyledInput,
  StyledImageBackground,
  StyledCardCover,
  InputWrapper
} from './style';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import { launchImageLibrary } from 'react-native-image-picker';

const CreatePost = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
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
  const [loading, setLoading] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [image, setImage] = useState([null]);
  const [data, setData] = useState({
    controls: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'title',
          text: 'Title*',
          placeholder: 'Enter your title',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        errors: '',
        className: { width: '100%' },
        icons: [],
      },
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
          multiline: true
        },
        valid: false,
        errors: '',
        className: { width: '100%' },
        icons: [],
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
        valid: true,
        errors: '',
        className: { width: '100%' },
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={spacing.width * 5} />,
        ],
      },
      minAge: {
        elementType: 'input',
        elementConfig: {
          type: 'minAge',
          text: 'Min Age*',
          placeholder: 'Enter Min Age',
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        errors: '',
        className: { width: '48%', marginRight: '1%' },
        icons: [],
      },
      maxAge: {
        elementType: 'input',
        elementConfig: {
          type: 'maxAge',
          text: 'Max Age*',
          placeholder: 'Enter Max Age',
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        errors: '',
        className: { width: '48%', marginLeft: '1%' },
        icons: [],
      }
    },
  });

  useEffect(() => {
    if (props.route.params.category) {
      setCategory(props.route.params.category.id);
    }
    let data = []
    OutsideAuthApi()
      .categoryListApi()
      .then((res) => {
        setShowLoader(false);
        res.data?.map((x, i) => {
          data.push({
            key: x._id,
            label: x.category_name, value: x._id
          })
        })
        setCategoryArr(data);
      })
      .catch((err) => {
        setShowLoader(false);
        dispatch(snackbarUpdate({
          type: 'error',
          msg: err?.message ? err.message : ''
        }));
      });
  }, [])

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
    } else if (type === 'price' && val.length > 0 && !validate(val, { isNumeric: true })) {
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
    } else if ((type === 'maxAge' && !validate(val, { isNumeric: true }) && val >= 0) || (type === 'minAge' && !validate(val, { isNumeric: true }))) {
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

  const createPostFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    isValid.push(category.length > 0);
    if (isValid.includes(false)) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      setLoading(true);
      const requestData = {
        category_id: props.route.params.category ? props.route.params.category.id : category,
        title: data.controls.title.value,
        message: data.controls.description.value,
        minAge: Number(data.controls.minAge.value),
        maxAge: Number(data.controls.maxAge.value),
        ...data.controls.price.value !== '' && { expectedPrice: Number(data.controls.price.value) },
        isPublic: isPublic,
        genderSpecific: gender,
        userVisible: userVisible,
        location: detailsStore.location,
        images: image
      }
      InsideAuthApi(authStore)
        .createPost(requestData)
        .then((res) => {
          setLoading(false);
          dispatch(snackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.goBack();
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
      setImage(['data:image/png;base64,' + result.assets[0].base64]);
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
    showLoader ? <Loader /> :
      <ShadowWrapperContainer none {...props}>
        <StyledScrollView>
          <TouchableOpacity onPress={uploadImg}>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: image && image[0] ? image[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
              <StyledCardCover source={{ uri: image && image[0] ? image[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
            </StyledImageBackground>
          </TouchableOpacity>
          <InputWrapper>
            <InputView>
              {formElementsArray?.map((x, index) => (
                x.id !== 'otp' && <Input
                  key={index}
                  styleContainer={x.config?.className}
                  title={x.config?.elementConfig?.text}
                  placeholder={x.config?.elementConfig?.placeholder}
                  onInputChange={onInputChange}
                  onSubmit={() => Keyboard.dismiss()}
                  value={x.config?.value}
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
            {props.route.params.category ? <StyledText>Category Name: {props.route.params.category.name}</StyledText> : <StyledInlineInputContainer style={{ zIndex: 1000 }}>
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
                  title={'Terget Gender'}
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
              </StyledInput> : null}
            </StyledInlineInputContainer>
            <StyledInlineInputContainer style={{ zIndex: 1 }}>
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
            <StyledInlineInputContainer style={{ zIndex: 1 }}>
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
            <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? createPostFnc : null}>
              Create Post
            </SubmitButton>
          </InputWrapper>
        </StyledScrollView>
      </ShadowWrapperContainer>
  );
};

export default CreatePost;