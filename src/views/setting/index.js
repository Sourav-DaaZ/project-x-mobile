import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Avatar
} from 'react-native-paper';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledProfile, StyledLeftContainer, StyledModalView } from './style';

import ViewShot from "react-native-view-shot";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from '../../sharedComponents/modal';
import Share from 'react-native-share';
import RNQRGenerator from 'rn-qr-generator';

const Setting = (props) => {
  const [qrPopup, setQrPopup] = useState(false);
  const [image, setImage] = useState('');
  const [qrImage, setQrImage] = useState('');
  const viewRef = useRef();

  const url = "https://awesome.contents.com/";
  const title = "Awesome Contents";
  const message = "Please check this out.";

  const options = {
    title,
    url,
    message,
  };

  const onCapture = (data) => {
    setImage(data);
  }

  const ShareFnc = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    RNQRGenerator.generate({
      value: 'hii',
      height: 200,
      width: 200,
      base64: true
    })
      .then(response => {
        const { uri, width, height, base64 } = response;
        setQrImage(base64);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }, [])
  
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
        <TouchableOpacity>
          <StyledLeftContainer>
            <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
            <StyledSemiTitle>Setting</StyledSemiTitle>
          </StyledLeftContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setQrPopup(true)}>
          <StyledLeftContainer>
            <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
            <StyledSemiTitle>Qr Code Scan</StyledSemiTitle>
          </StyledLeftContainer>
        </TouchableOpacity>
      </StyledProfile>
      <StyledProfile>
        <TouchableOpacity onPress={async () => {
          await ShareFnc({
            title: "Sharing image file from awesome share app",
            message: "Please take a look at this image",
            url: "data:image/png;base64," + image,
          });
        }}>
          <StyledLeftContainer>
            <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
            <StyledSemiTitle>Settings</StyledSemiTitle>
          </StyledLeftContainer>
        </TouchableOpacity>
      </StyledProfile>
      <Modal show={qrPopup} onClose={() => setQrPopup(false)}>
        <StyledModalView>
          <ViewShot options={{ result: "base64" }} onCapture={onCapture} captureMode="mount">
            <Image
            style={{
              width: 200,
              height: 200,
            }}
              source={{
                uri: "data:image/png;base64," + qrImage
              }}
            />
          </ViewShot>
        </StyledModalView>
      </Modal>
    </DashboardLayout>
  )
}

export default Setting;