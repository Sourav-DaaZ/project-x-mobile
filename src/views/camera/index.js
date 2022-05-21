'use strict';
import React, { useRef, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';

import Layout from '../../sharedComponents/layout';

const { width, height } = Dimensions.get('screen');

import { StyledPreview, StyledTouchableOpacity, StyledHeadline, StyledQrBox } from './style'
import { View } from 'react-native-animatable';

const CameraComponent = (props) => {
  let cameraRef = useRef(null);
  let [permission, setPermission] = useState('undetermined')

  const takePicture = async function () {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  useEffect(() => {
    Permissions.check('camera').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      setPermission(response);
    });
  }, []);

  const slide = {
    0: {
      marginTop: -(width * .5 - 4),
    },
    0.5: {
      marginTop: (width * .5 - 4),
    },
    1: {
      marginTop: -(width * .5 - 4),
    },
  };

  const barcodeRecognized = ({ barcodes }) => {
    if (barcodes[0]?.dataRaw) {
      props.navigation.navigate(
        'HomeScreen', {
          data: barcodes[0]?.dataRaw
        }
      )
    }
  };

  return (
    <Layout>
      <StyledPreview
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        autoFocus={true}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={barcodeRecognized}
      >
        <StyledQrBox>
          <StyledHeadline
            animation={slide}
            iterationCount="infinite"
          />
        </StyledQrBox>
        {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <StyledTouchableOpacity onPress={takePicture}>
            <Text style={{ fontSize: 14 }}> snap </Text>
          </StyledTouchableOpacity>
      </View> */}
      </StyledPreview>
    </Layout>
  );
}


export default CameraComponent;