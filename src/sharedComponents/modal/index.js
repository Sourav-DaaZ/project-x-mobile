import * as React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';

const ModalComponent = (props) => {

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <Portal>
            <Modal visible={props.show} onDismiss={props.onClose} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
        </Portal>
    );
};

export default ModalComponent;