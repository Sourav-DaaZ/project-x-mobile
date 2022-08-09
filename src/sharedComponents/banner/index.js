import React, { useContext } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyledClose, StyledView } from './style';

const upDown = {
    0: {
        top: -5
    },
    1: {
        top: -10
    },

};

const Banner = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const SLIDER_WIDTH = Dimensions.get('window').width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

    const renderItem = ({ item }) => (
        <View>
            <Text>{`Item ${item}`}</Text>
        </View>
    );

    return (
        <View>
            <Text style={styles.counter}
            >
                {this.state.index}
            </Text>
        </View>
    );
};

export default Banner;