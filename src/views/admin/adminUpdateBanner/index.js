import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import { updateObject, validate } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../../store/actions';
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
  StyledImageBackground,
  StyledCardCover,
  InputWrapper,

} from './style';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { launchImageLibrary } from 'react-native-image-picker';
import Banner from '../../../sharedComponents/banner';
import OutsideAuthApi from '../../../services/outSideAuth';

const AdminUpdateBanner = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const [image, setImage] = useState(props.route.params?.data?.image ? props.route.params.data.image : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg');
  const formElementsArray = [];

  const [loader, setLoader] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(props.route.params?.data?.category ? props.route.params.data.category : '');
  const [categoryArr, setCategoryArr] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerFor, setBannerFor] = useState(props.route.params?.data?.banner_for ? props.route.params.data.banner_for : '');
  const [bannerForArr, setBannerForArr] = useState([
    { label: 'main', value: 'main' },
    { label: 'category', value: 'category' }
  ]);
  const [data, setData] = useState({
    controls: {
      link: {
        elementType: 'input',
        elementConfig: {
          type: 'link',
          text: 'link*',
          placeholder: 'Enter Link',
        },
        value: props.route.params?.data?.link ? props.route.params.data.link : '',
        validation: {
          required: true,
        },
        valid: props.route.params?.data?.link ? true : false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      lat: {
        elementType: 'input',
        elementConfig: {
          type: 'lat',
          text: 'lat*',
          placeholder: 'Enter lat',
        },
        value: props.route.params?.data?.location?.coordinates ? props.route.params.data.location.coordinates[0].toString() : '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: props.route.params?.data?.location?.coordinates ? true : false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      long: {
        elementType: 'input',
        elementConfig: {
          type: 'long',
          text: 'long*',
          placeholder: 'Enter long',
        },
        value: props.route.params?.data?.location?.coordinates ? props.route.params.data.location.coordinates[1].toString() : '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: props.route.params?.data?.location?.coordinates ? true : false,
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
    setLoader(true);
    OutsideAuthApi()
      .categoryListApi()
      .then((res) => {
        setLoader(false);
        let data = [];
        res.data?.map((x, i) => {
          data.push({
            key: x._id,
            label: x.category_name, value: x._id
          })
        })
        setCategoryArr(data);
      })
      .catch((err) => {
        setLoader(false);
        dispatch(SnackbarUpdate({
          type: 'error',
          msg: err?.message
        }));
      });
  }, []);

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

  const createBannerFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    isValid.push(bannerFor.length > 0);
    isValid.push(image.length > 0);
    if (isValid.includes(false)) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      const requestData = {
        // application_id: props.route.params.data._id,
        ...category !== '' && { category: category },
        link: data.controls.link.value,
        banner_for: bannerFor,
        location: {
          lat: Number(data.controls.lat.value),
          long: Number(data.controls.long.value)
        },
        image: image
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .bannerAddApi(requestData)
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
            msg: err?.message
          }))
        });
    }
  }
  const editBannerFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    isValid.push(bannerFor.length > 0);
    isValid.push(image.length > 0);
    if (isValid.includes(false)) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      const requestData = {
        id: props.route.params?.data?._id,
        ...category !== '' && { category: category },
        link: data.controls.link.value,
        banner_for: bannerFor,
        location: {
          lat: Number(data.controls.lat.value),
          long: Number(data.controls.long.value)
        },
        image: image
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .bannerUpdateApi(requestData)
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
            msg: err?.message
          }))
        });
    }
  }

  const uploadImg = async () => {
    const options = {
      includeBase64: true,
      maxWidth: 200,
      quality: .5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const result = await launchImageLibrary(options);
      setImage("data:image/png;base64," + result.assets[0].base64);
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
    <ShadowWrapperContainer none>
      <StyledScrollView>
        <Banner data={[{
          img: image,
          onPress: uploadImg
        }]} />
        <InputWrapper>
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
          <Input
            ele='select'
            open={showBanner}
            title={'Select Type'}
            value={bannerFor}
            items={bannerForArr}
            placeholder={'Select Type'}
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
              marginLeft: -5,
            }}
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.borderColor,
            }}
            setOpen={setShowBanner}
            setValue={setBannerFor}
            setItems={setBannerForArr}
          />
          <InputView>
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
          </InputView>
          <SubmitButton mode='contained' labelStyle={{ color: colors.backgroundColor }} loading={loader} onPress={!loader ? props.route.params?.data?._id ? editBannerFnc : createBannerFnc : null}>
            {props.route.params?.data?._id ? 'Edit Banner' : 'Create Banner'}
          </SubmitButton>
        </InputWrapper>
      </StyledScrollView>
    </ShadowWrapperContainer>
  );
};

export default AdminUpdateBanner;