import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Routes from '../../../constants/routeConst';

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  BodyWrapper,
  StyledImageBackground,
  StyledCardCover,
  StyledTitle
} from './style';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';

const Verification = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const colors = themeContext.colors[themeContext.baseColor];
  const [loading, setLoading] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [userIdProof, setUserIdProof] = useState('');
  const [userImage, setUserImage] = useState('');



  const editDetailsFnc = () => {
    let isValid = [];
    isValid.push(contactNumber.length > 0);
    isValid.push(userIdProof.length > 0);
    isValid.push(userImage.length > 0);
    if (isValid.includes(false)) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      setLoading(true);
      const requestData = {
        contactNumber: contactNumber,
        userImage: userImage,
        userIdProof: userIdProof
      }
      InsideAuthApi()
        .requestedForUserVerification(requestData)
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

  return (
    <ShadowWrapperContainer>
      <StyledScrollView>
        <BodyWrapper>
          <StyledTitle>User Image</StyledTitle>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.camera)}>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: userImage ? userImage : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
              <StyledCardCover source={{ uri: userImage ? userImage : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
            </StyledImageBackground>
          </TouchableOpacity>
          <StyledTitle>Id Proof</StyledTitle>
          <TouchableOpacity onPress={() => uploadImg(setUserIdProof)}>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: userIdProof ? userIdProof : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
              <StyledCardCover source={{ uri: userIdProof ? userIdProof : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
            </StyledImageBackground>
          </TouchableOpacity>
          <InputView>
            <Input
              title={'Contact Number'}
              placeholder={'Enter your phone number'}
              onInputChange={(val) => setContactNumber(val)}
              onSubmit={() => Keyboard.dismiss()}
              value={contactNumber}
              type={'input'}
              keyNum={true}
              ele={'input'}
            />
          </InputView>
          <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? editDetailsFnc : null}>
            Save
          </SubmitButton>
        </BodyWrapper>
      </StyledScrollView>
    </ShadowWrapperContainer>
  );
};

export default Verification;