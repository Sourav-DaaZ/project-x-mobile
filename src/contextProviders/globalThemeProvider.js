import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "styled-components";
import { defaultColor } from '../constants/colorCode';

const theme = {
  baseColor: 'blue',
  colors: {
    ...defaultColor
  },
  fonts:{
    regular: 1,
    medium: 2
  },
  animation: {
    scale: 1.0,
  },
};



const GlobalThemeProvider = (props) => {
  return (<ThemeProvider theme={theme}>{props.children}</ThemeProvider>)
};

export default GlobalThemeProvider;