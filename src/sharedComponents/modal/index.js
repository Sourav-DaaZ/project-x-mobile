import * as React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalComponent = (props) => {

    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        position: 'absolute',
        bottom: -40,
        with: 40,
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 40
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
                {props.children}
            </Modal>
        </Portal>
    );
};

export default ModalComponent;