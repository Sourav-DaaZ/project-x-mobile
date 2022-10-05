import React, { useContext, useState } from 'react';
import { Keyboard } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';

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
import defaultValue from '../../../constants/defaultValue';

const AdminUserVerifyAction = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const colors = themeContext.colors[themeContext.baseColor];
  const [loading, setLoading] = useState(false);
  const [contactNumber, setContactNumber] = useState(props.route.params?.data?.contactNumber ? props.route.params.data.contactNumber : '');
  const [userIdProof, setUserIdProof] = useState(props.route.params?.data?.userIdProof ? props.route.params.data.userIdProof : '');
  const [userImage, setUserImage] = useState(props.route.params?.data?.userImage ? props.route.params.data.userImage : '');



  const saveFnc = (num) => {

    setLoading(true);
    const requestData = {
      id: props.route.params?.data?._id ? props.route.params.data._id : '',
      status: defaultValue.verifyUserOption[num],
    }
    InsideAuthApi()
      .actionUserVerification(requestData)
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


  return (
    <ShadowWrapperContainer>
      <StyledScrollView>
        <BodyWrapper>
          <StyledTitle>User Image</StyledTitle>
          <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: userImage ? userImage : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
            <StyledCardCover source={{ uri: userImage ? userImage : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
          </StyledImageBackground>
          <StyledTitle>Id Proof</StyledTitle>
          <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: userIdProof ? userIdProof : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
            <StyledCardCover source={{ uri: userIdProof ? userIdProof : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
          </StyledImageBackground>
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
          <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? () => saveFnc(1) : null}>
            Reject
          </SubmitButton>
          <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? () => saveFnc(2) : null}>
            Approve
          </SubmitButton>
        </BodyWrapper>
      </StyledScrollView>
    </ShadowWrapperContainer>
  );
};

export default AdminUserVerifyAction;