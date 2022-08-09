import React, { useContext, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import { updateObject, validate } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../../store/actions';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  InputWrapper,

} from './style';
import SingleCat from '../../categoryList/singleCat';
import { launchImageLibrary } from 'react-native-image-picker';

const AdminUpdateCategory = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const colors = themeContext.colors[themeContext.baseColor];
  const [image, setImage] = useState(props.route.params?.data?.images ? props.route.params?.data?.images : '');
  const formElementsArray = [];

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    controls: {
      category_name: {
        elementType: 'input',
        elementConfig: {
          type: 'category_name',
          text: 'Category Name*',
          placeholder: 'Enter category name',
        },
        value: props.route.params?.data?.category_name ? props.route.params.data.category_name : '',
        validation: {
          required: true,
        },
        valid: props.route.params?.data?.category_name ? true : false,
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
          text: 'Description*',
          placeholder: 'Enter your description',
        },
        value: props.route.params?.data?.description ? props.route.params.data.description : '',
        validation: {
          required: true,
        },
        valid: props.route.params?.data?.description ? true : false,
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

  const createCategory = () => {
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
        id: props.route.params?.data?._id,
        category_name: data.controls.category_name.value,
        description: data.controls.description.value,
        images: image
      }
      setLoader(true);
      InsideAuthApi()
        .editCategoryApi(requestData)
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
  const editCategory = () => {
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
        
        category_name: data.controls.category_name.value,
        description: data.controls.description.value,
        images: image
      }
      setLoader(true);
      InsideAuthApi()
        .editCategoryApi(requestData)
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
    <StyledScrollView>
      <TouchableOpacity onPress={uploadImg}>
        <SingleCat img={image} name={data.controls.category_name.value} />
      </TouchableOpacity>
      <InputWrapper>
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
        <SubmitButton mode='contained' labelStyle={{ color: colors.backgroundColor }} loading={loader} onPress={!loader ? props.route.params?.data?._id ? createCategory : editCategory : null}>
          {props.route.params?.data?._id ? "Edit Category" : "Create Category"}
        </SubmitButton>
      </InputWrapper>
    </StyledScrollView>
  );
};

export default AdminUpdateCategory;