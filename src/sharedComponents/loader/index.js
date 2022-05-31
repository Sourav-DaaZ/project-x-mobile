import React, { useContext } from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const Loader = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <Portal>
            <Modal visible={props.show} dismissable={false}>
                <ActivityIndicator animating={true} color={colors.backgroundColor} />
            </Modal>
        </Portal>
    );
};

export default Loader;