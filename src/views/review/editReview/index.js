import React, { useContext, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import { updateObject, validate } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  StyledImageBackground,
  StyledCardCover
} from './style';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { launchImageLibrary } from 'react-native-image-picker';
import RatingComponent from '../../../sharedComponents/rating';

const EditReview = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const spacing = themeContext.spacing;
  const colors = themeContext.colors[themeContext.baseColor];
  const formElementsArray = [];

  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(props.route.params.data?.image ? props.route.params.data.image : '');
  const [rating, setRating] = useState(props.route.params.data?.rating ? props.route.params.data.rating : 0);
  const [data, setData] = useState({
    controls: {
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'description',
          text: 'Description',
          placeholder: 'Enter your description',
        },
        value: props.route.params.data?.description ? props.route.params.data.description : '',
        validation: {
          required: true,
        },
        valid: props.route.params.data?.description ? true : false,
        errors: '',
        className: [],
        icons: [],
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

  const editFnc = () => {
    let isValid = [];
    formElementsArray.map(
      (x) => x.config.valid ? isValid.push(true) : isValid.push(false)
    );
    if (isValid.includes(false)) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      const requestData = {
        id: props.route.params?.data?._id,
        description: data.controls.description.value,
        image: image,
        ...rating > 0 && props.route.params?.data?.booking_id && { rating: rating },
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .editReviewApi(requestData)
        .then((res) => {
          setLoader(false);
          dispatch(snackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoader(false);
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
    <ShadowWrapperContainer none {...props}>
      <TouchableOpacity onPress={uploadImg}>
        <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: image ? image : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
          <StyledCardCover source={{ uri: image ? image : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
        </StyledImageBackground>
      </TouchableOpacity>
      <StyledScrollView>
        {props.route.params?.data?.booking_id ? <RatingComponent rating={rating} setRating={setRating} style={{ marginTop: spacing.height * 5 }} /> : null}
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
        <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loader} onPress={!loader ? editFnc : null}>
          Edit Review
        </SubmitButton>
      </StyledScrollView>
    </ShadowWrapperContainer>
  );
};

export default EditReview;