import React, { useContext } from 'react';
import {
    View,
} from 'react-native';
import { ThemeContext } from 'styled-components';


export default BottomShadow = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <View style={{ overflow: 'hidden', paddingBottom: 40, backgroundColor: colors.backgroundDeepColor, marginBottom: -20 }}>
            <View
                style={{
                    backgroundColor: colors.backgroundColor,
                    shadowColor: colors.shadowColor,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 3,
                    elevation: 10,
                }} >
                    {props.children}
            </View>
        </View>
    );
};
