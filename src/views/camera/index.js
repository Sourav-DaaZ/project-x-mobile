import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Camera, useCameraDevices, sortFormats } from 'react-native-vision-camera';
import { StyledContainer, StyledButton, StyledReverse } from './style';
var RNFS = require('react-native-fs')

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isBack, setIsBack] = React.useState(false);
  const camera = useRef(null)
  const devices = useCameraDevices();
  const device = isBack ? devices.back : devices.front;
  const takePhotoOptions = {
    qualityPrioritization: 'balanced',
    flash: 'off',
    quality: 25
  };


  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePhoto = async () => {
    try {
      //Error Handle better
      if (camera.current == null) throw new Error('Camera Ref is Null');
      console.log('Photo taking ....');
      const photo = await camera.current.takeSnapshot(takePhotoOptions);
      console.log(photo);
      const base64image = await RNFS.readFile(photo.path, 'base64');
      console.log(base64image);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    device != null &&
    hasPermission && (
      <StyledContainer>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <StyledButton onPress={takePhoto}></StyledButton>
        <StyledReverse onPress={() => setIsBack(!isBack)} name='camera-reverse' />
      </StyledContainer>
    )
  );
}

export default CameraComponent;