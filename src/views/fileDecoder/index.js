import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native';
import Layout from '../../sharedComponents/layout';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import { StyledProfileButton } from './style';
import { InterstitialAd, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const FileDecoder = (props) => {
    const [error, setError] = useState('');


    const interstitial = InterstitialAd.createForAdRequest('');
    interstitial.load();

    const uploadImg = async () => {
        try {
            interstitial.show();
        } catch (e) {
            console.log(e)
        }
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
            },
        };
        setError('')
        const result = await launchImageLibrary(options);
        RNQRGenerator.detect({
            uri: result.assets[0].uri
        })
            .then(response => {
                const { values } = response; // Array of detected QR code values. Empty if nothing found.
                if (values.length) {
                    props.navigation.navigate(
                        'HomeScreen', {
                        data: values[0]
                    })
                } else {
                    setError('Try again!')
                }
            })
            .catch(error => console.log('Cannot detect QR code in image', error));

    }

    return (
        <Layout>
            {/* <GAMBannerAd unitId={'ca-app-pub-3940256099942544/6300978111'} sizes={[BannerAdSize.FULL_BANNER]} /> */}
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <StyledProfileButton mode="contained" onPress={uploadImg}>Upload Image</StyledProfileButton>
                {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
                <Text>**Please Upload a heigh quality image**</Text>
            </View>
            {/* <GAMBannerAd unitId={'ca-app-pub-3940256099942544/6300978111'} sizes={[BannerAdSize.FULL_BANNER]} /> */}
        </Layout>
    )
}

export default FileDecoder;