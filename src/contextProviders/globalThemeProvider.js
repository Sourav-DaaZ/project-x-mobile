import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "styled-components";
import { defaultColor } from '../constants/colorCode';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const theme = {
  baseColor: 'blue',
  colors: {
    ...defaultColor
  },
  fonts: {
    small: width * .03,
    regular: width * .04,
    medium: width * .05,
    large: width * .06
  },
  fontWeight: {
    light: 400,
    semiBold: 500,
    bold: 600,
    trueBold: 700,
    boldText: 'bold'
  },
  borderRedius: {
    small: 10,
    semi: 20,
    round: 40
  },
  spacing: {
    height: height * .01,
    width: width * .01,
  },
  animation: {
    scale: 1.0,
  },
};



const GlobalThemeProvider = (props) => {
  return (<ThemeProvider theme={theme}>{props.children}</ThemeProvider>)
};

export default GlobalThemeProvider; 