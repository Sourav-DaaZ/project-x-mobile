'use strict';
import React, { useRef, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

const { width, height } = Dimensions.get('screen');

import { StyledPreview, StyledTouchableOpacity, StyledHeadline, StyledQrBox } from './style'

const CameraComponent = () => {
  let cameraRef = useRef(null);

  const takePicture = async function () {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  useEffect(() => {
    
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
    console.log(barcodes);
  };

  return (
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
  );
}


export default CameraComponent;