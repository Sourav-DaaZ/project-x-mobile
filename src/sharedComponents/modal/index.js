import * as React from 'react';
import { Portal, Modal, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalComponent = (props) => {

    const containerStyle = {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -40,
        with: 40,
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingTop: 40,
    };

    return (
        <Portal>
            <Modal visible={props.show} onDismiss={props.onClose} contentContainerStyle={containerStyle}>
                <Entypo
                    name="cross"
                    size={25}
                    style={{ position: 'absolute', right: 15, top: 15 }}
                    onPress={props.onClose}
                />
                <Text style={{position: 'absolute', top: -50, left: 30, color: 'white', fontSize: 30}}>{props.title}</Text>
                {props.children}
            </Modal>
        </Portal>
    );
};

export default ModalComponent;