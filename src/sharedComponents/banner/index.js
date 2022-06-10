import React, { useContext } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Banner} from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import Feather from 'react-native-vector-icons/Feather'
import { StyledClose } from './style';

const upDown = {
    0: {
        bottom: -30
    },
    1: {
        bottom: -20
    },

};

const BannerComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];


    return (
        <View>
            <Banner
                visible={props.showBanner}
                contentStyle={{ backgroundColor: colors.backgroundDeepColor, padding: 0 }}
                style={{ marginBottom: 35 }}
                actions={[
                ]}
                icon={({ size }) => (
                    props.image ? <Image
                        source={{
                            uri: props.image,
                        }}
                        style={{
                            width: size,
                            height: size,
                        }}
                    /> : null
                )}>
                {props.children}
            </Banner>
            <TouchableOpacity onPress={props.setShowBanner}><StyledClose animation={upDown} iterationCount='infinite' direction="alternate"><Feather name={props.showBanner ? 'chevrons-up' : 'chevrons-down'} size={40} /></StyledClose></TouchableOpacity>
        </View>
    );
};

export default BannerComponent;