import React, { useContext, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const SnackBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [visible, setVisible] = React.useState(true);
    useEffect(() => {
        setVisible(props.show);
    }, [props.show])

    return (
        <Snackbar
            visible={props.show}
            onDismiss={props.onDismiss}
            duration={7000}
            action={{
                label: 'Ok',
                onPress: props.onDismiss
            }}
            theme={{ colors: { surface: colors.backgroundColor, onSurface: props.type === 'error' ? colors.errorColor : colors.textDeep, accent: colors.backgroundColor } }}
            wrapperStyle={{
                zIndex: 99999,
                bottom: 0
            }}>
            {props.text}
        </Snackbar>
    );
};


export default SnackBar;