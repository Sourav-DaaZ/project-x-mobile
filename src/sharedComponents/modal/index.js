import React, { useContext } from 'react';
import { Portal, Modal, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { ThemeContext } from 'styled-components';
const { width, height } = Dimensions.get('screen');

const ModalComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const fonts = themeContext.fonts;
    const spacing = themeContext.spacing;
    const containerStyle = {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -(spacing.height * 5),
        with: '100%',
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingTop: (spacing.height * 5),
        zIndex: 999
    };

    return (
        <Portal>
            <Modal visible={props.show} onDismiss={props.onClose} contentContainerStyle={containerStyle}>
                {props.onClose ? <Entypo
                    name="cross"
                    size={spacing.width * 8}
                    style={{ position: 'absolute', right: (spacing.width * 5), top: (spacing.height * 2) }}
                    onPress={props.onClose}
                /> : null}
                <Text style={{ position: 'absolute', top: -(spacing.height * 5), left: (spacing.width * 5), color: colors.backgroundColor, fontSize: fonts.medium }}>{props.title}</Text>
                {props.children}
            </Modal>
        </Portal>
    );
};

export default ModalComponent;