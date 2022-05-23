import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, Keyboard } from 'react-native';
import { StyledProfileButton, StyledViewShot, StyledRevProfileButton, StyledSemiTitle, StyledProfile, StyledTitle, StyledModalView } from './style';

import QRCode from 'react-native-qrcode-svg';
import Modal from '../../sharedComponents/modal';
import Share from 'react-native-share';
import { updateObject } from '../../utils';
import Input from '../../sharedComponents/input';
import { InterstitialAd, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
var CryptoJS = require("crypto-js");

import Layout from '../../sharedComponents/layout';

const Home = (props) => {
  const [qrPopup, setQrPopup] = useState(false);
  const [resultPopup, setResultPopup] = useState(false);
  const [image, setImage] = useState('');
  const [scanData, setScanData] = useState('');
  const viewRef = useRef();
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = React.useState({
    controls: {
      qus: {
        elementType: 'input',
        elementConfig: {
          type: 'qus',
          text: 'Security Question',
          placeholder: 'Enter Your Security Question',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [

        ],
      },
      ans: {
        elementType: 'input',
        elementConfig: {
          type: 'ans',
          text: 'Security Answer',
          placeholder: 'Enter your Security Answer',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [

        ],
      },
      msg: {
        elementType: 'input',
        elementConfig: {
          type: 'msg',
          text: 'Message',
          placeholder: 'Enter your Message',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [

        ],
      },
    },
  });


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

  const onInputChange = (val, type) => {
    let varVal = {};
    varVal = updateObject(data, {
      controls: updateObject(data.controls, {
        [type]: updateObject(data.controls[type], {
          value: val,
          errors: '',
          valid: false,
        }),
      }),
    });
    setData(varVal);
  };

  const ShareFnc = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };
  const interstitial = InterstitialAd.createForAdRequest('');
  const interstitialGen = InterstitialAd.createForAdRequest('');
  interstitial.load();
  interstitialGen.load();

  useEffect(() => {
    if (props.route.params) {
      setScanData(props.route.params.data);
    }
  }, [props.route.params])

  return (
    <Layout>
      {/* <NativeAdView adUnitID='ca-app-pub-8150077367094891/7722062799'>
        <NativeAdView adUnitID="ca-app-pub-8150077367094891/9816661522"></NativeAdView> */}
      {/* <GAMBannerAd unitId={'ca-app-pub-3940256099942544/6300978111'} sizes={[BannerAdSize.FULL_BANNER]} /> */}
      <StyledProfile>
        {scanData === '' ? <View>
          <Input
            placeholder={data.controls.qus.elementConfig.placeholder}
            onInputChange={onInputChange}
            title={'Security Qustion'}
            onSubmit={() => Keyboard.dismiss()}
            value={data.controls.qus.value}
            type={data.controls.qus.elementConfig.type}
            isValid={data.controls.qus.valid}
            validation={data.controls.qus.validation}
            icons={data.controls.qus.icons}
            ele={data.controls.qus.elementType}
          />
        </View> : null}
        <View>
          <Input
            placeholder={data.controls.ans.elementConfig.placeholder}
            onInputChange={onInputChange}
            title={'Security Answer'}
            onSubmit={() => Keyboard.dismiss()}
            value={data.controls.ans.value}
            type={data.controls.ans.elementConfig.type}
            isValid={data.controls.ans.valid}
            validation={data.controls.ans.validation}
            icons={data.controls.ans.icons}
            ele={data.controls.ans.elementType}
          />
        </View>
        {scanData === '' ? <View>
          <Input
            placeholder={data.controls.msg.elementConfig.placeholder}
            title={'Message'}
            onInputChange={onInputChange}
            onSubmit={() => Keyboard.dismiss()}
            value={data.controls.msg.value}
            type={data.controls.msg.elementConfig.type}
            isValid={data.controls.msg.valid}
            validation={data.controls.msg.validation}
            icons={data.controls.msg.icons}
            ele={data.controls.msg.elementType}
          />
        </View> : null}
        {scanData ? <View><StyledProfileButton mode="contained" onPress={() => {
          try {
            interstitial.show();
          } catch (e) {
            console.log(e)
          }
          Keyboard.dismiss();
          setResultPopup(true)
        }}>Get result</StyledProfileButton>
          <StyledRevProfileButton mode='text' color='#F07B3A' onPress={() => {
            setScanData('')
          }}>Reset</StyledRevProfileButton></View> : data.controls.msg.value !== ''?<StyledProfileButton mode="contained" onPress={() => {
            try {
              interstitialGen.show();
            } catch (e) {
              console.log(e)
            }
            Keyboard.dismiss()
            setQrPopup(true)
          }}>Generate QR</StyledProfileButton>:null}
      </StyledProfile>
      <View style={{ marginBottom: 20 }}>
        {/* <GAMBannerAd unitId={'ca-app-pub-3940256099942544/6300978111'} sizes={[BannerAdSize.FULL_BANNER]} /> */}
      </View>
      {/* {scanData !== '' ? <GAMBannerAd unitId={'ca-app-pub-3940256099942544/6300978111'} sizes={[BannerAdSize.FULL_BANNER]} /> : null} */}
      <Modal show={qrPopup} onClose={() => setQrPopup(false)}>
        <StyledModalView>
          <StyledViewShot options={{ result: "base64" }} onCapture={onCapture} captureMode="mount">
            <StyledTitle>SecretQR</StyledTitle>
            <StyledSemiTitle>{data.controls.qus.value}</StyledSemiTitle>
            <QRCode
              size={200}
              value={data.controls.ans.value.trim() === '' ? CryptoJS.AES.encrypt(data.controls.msg.value, data.controls.ans.value.toLowerCase().trim()).toString() : data.controls.msg.value}
              logo={require('../../assets/images/logo.jpeg')}
              logoSize={30}
              logoBackgroundColor={'white'}
              logoMargin={5}
            />
          </StyledViewShot>
          <StyledProfileButton mode="contained" onPress={async () => {
            await ShareFnc({
              title: "Sharing image file from awesome share app",
              message: "Please take a look at this image",
              url: "data:image/png;base64," + image,
            });
          }}>Share</StyledProfileButton>
        </StyledModalView>
      </Modal>
      {props.route.params && props.route.params.data? <Modal show={resultPopup} onClose={() => setResultPopup(false)}>
        <StyledModalView>
          <StyledTitle>Your Message is: </StyledTitle>
          <StyledSemiTitle>{CryptoJS.AES.decrypt(props.route.params.data, data.controls.ans.value.toLowerCase().trim()).toString(CryptoJS.enc.Utf8).length > 0 ? CryptoJS.AES.decrypt(props.route.params.data, data.controls.ans.value.toLowerCase().trim()).toString(CryptoJS.enc.Utf8) : scanData}</StyledSemiTitle>
        </StyledModalView>
      </Modal> : null}
    </Layout>
  )
}

export default Home;