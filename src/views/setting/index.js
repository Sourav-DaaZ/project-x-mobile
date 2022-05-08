import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Avatar
} from 'react-native-paper';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledProfile, StyledLeftContainer, StyledModalView } from './style';

import QRCode from 'react-native-qrcode-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from '../../sharedComponents/modal';

const Setting = (props) => {
  const [qrPopup, setQrPopup] = useState(false);
  return (
    <DashboardLayout>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <StyledProfileView>
          <View>
            <StyledTitle>Sourav Das</StyledTitle>
            <StyledParagraph>Tap to view your profile.</StyledParagraph>
          </View>
          <Avatar.Image
            source={{
              uri:
                'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
            }}
            size={70}
          />
        </StyledProfileView>
      </TouchableOpacity>
      <StyledProfileView style={{ justifyContent: 'space-around' }}>
        <StyledCenter>
          <Ionicons name='settings-outline' size={30} />
          <StyledParagraph>Settings</StyledParagraph>
        </StyledCenter>
        <StyledCenter>
          <Ionicons name='settings-outline' size={30} />
          <StyledParagraph></StyledParagraph>
        </StyledCenter>
      </StyledProfileView>
      <StyledProfile>
        <StyledLeftContainer>
          <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
          <StyledSemiTitle>Setting</StyledSemiTitle>
        </StyledLeftContainer>
        <TouchableOpacity onPress={() => setQrPopup(true)}>
          <StyledLeftContainer>
            <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
            <StyledSemiTitle>Qr Code Scan</StyledSemiTitle>
          </StyledLeftContainer>
        </TouchableOpacity>
      </StyledProfile>
      <StyledProfile>
        <StyledLeftContainer>
          <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
          <StyledSemiTitle>Settings</StyledSemiTitle>
        </StyledLeftContainer>
      </StyledProfile>
      <Modal show={qrPopup} onClose={() => setQrPopup(false)} title='hi'>
        <StyledModalView>
          <QRCode
            size={200}
            value="Sourav Das"
            logo={require('../../assets/images/logo.png')}
            logoSize={30}
            logoBackgroundColor={'white'}
            logoMargin={5}
          />
        </StyledModalView>
      </Modal>
    </DashboardLayout>
  )
}

export default Setting;