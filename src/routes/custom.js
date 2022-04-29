import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native-paper';
import { StyledTabView, StyledCercularBorder, StyledHeaderView, StyledEachHeaderView } from './style'

export const CustomTab = ({ state, descriptors, navigation, colors }) => {
    return (
        <StyledTabView>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const icon = options.tabBarIcon(isFocused ? colors.backgroundColor : colors.textDeep, isFocused ? 25 : 30)
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;


                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        {isFocused ? <StyledCercularBorder>{icon}</StyledCercularBorder> : icon}
                        {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </StyledTabView>
    );
}

export const CustomHeader = (props) => {
    return (
        <StyledHeaderView dark={props.dark ? true : false}>
            <StyledEachHeaderView>
                {props.left}
            </StyledEachHeaderView>
            <StyledEachHeaderView style={{marginTop: -5}}>
                {props.logo}
            </StyledEachHeaderView>
            <StyledEachHeaderView>
                {props.right}
            </StyledEachHeaderView>
        </StyledHeaderView>
    )
}