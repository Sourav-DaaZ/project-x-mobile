import React, { useContext, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../store/actions';

const SnackBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [visible, setVisible] = React.useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.text !== '') {
            setVisible(true);
        }
    }, [props.text])

    const onClose = () => {
        dispatch(snackbarUpdate({
            type: '',
            msg: ''
        }));
        setVisible(false)
    }

    return (
        <Snackbar
            visible={visible}
            onDismiss={props.onDismiss ? props.onDismiss : onClose}
            duration={7000}
            action={{
                label: 'Ok',
                onPress: props.onDismiss ? props.onDismiss : onClose
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