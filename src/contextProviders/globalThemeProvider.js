import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
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
  return (<PaperProvider theme={theme}>{props.children}</PaperProvider>)
};

export default GlobalThemeProvider;