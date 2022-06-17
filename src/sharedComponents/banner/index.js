import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Banner } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyledClose, StyledView } from './style';

const upDown = {
    0: {
        top: -5
    },
    1: {
        top: -10
    },

};

const BannerComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [show, setShow] = React.useState(false);

    return (
        <React.Fragment>
            {show && <StyledView animation={show ? 'fadeInDown' : 'fadeOutUp'}>
                {props.children}
            </StyledView>}
            <TouchableOpacity style={{ zIndex: 99 }} onPress={() => setShow(!show)}><StyledClose animation={upDown} iterationCount='infinite' direction="alternate"><MaterialIcons name={show ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={40} /></StyledClose></TouchableOpacity>
        </React.Fragment>
    );
};

export default BannerComponent;