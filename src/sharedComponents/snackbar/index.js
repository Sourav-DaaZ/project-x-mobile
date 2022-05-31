import React, { useContext, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const SnackBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [visible,setVisible] = React.useState(true);
    useEffect(()=>{
        setVisible(props.show);
    },[props.show])

    return (
        <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={7000}
            action={{
                label: 'Ok',
                onPress: ()=> setVisible(false)
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