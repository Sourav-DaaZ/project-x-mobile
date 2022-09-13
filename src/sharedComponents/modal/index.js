import * as React from 'react';
import { Portal, Modal, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('screen');
const ModalComponent = (props) => {

    const containerStyle = {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -(height * .05),
        with: '100%',
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingTop: (height * .05),
        zIndex: 999
    };

    return (
        <Portal>
            <Modal visible={props.show} onDismiss={props.onClose} contentContainerStyle={containerStyle}>
                {props.onClose ? <Entypo
                    name="cross"
                    size={25}
                    style={{ position: 'absolute', right: (width * .05), top: (height * .02) }}
                    onPress={props.onClose}
                /> : null}
                <Text style={{ position: 'absolute', top: -50, left: 30, color: 'white', fontSize: 30 }}>{props.title}</Text>
                {props.children}
            </Modal>
        </Portal>
    );
};

export default ModalComponent;