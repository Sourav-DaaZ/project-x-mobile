import React, { useContext } from 'react';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const SnackBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <Snackbar
            visible={props.show}
            onDismiss={props.hide}
            duration={5000}
            action={{
                label: 'Ok',
                onPress: props.hide
            }}
            theme={{ colors: { surface: colors.backgroundColor, accent: colors.backgroundColor } }}
            wrapperStyle={{
                zIndex: 999,
            }}>
            {props.text}
        </Snackbar>
    );
};


export default SnackBar;