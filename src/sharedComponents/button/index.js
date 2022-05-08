import React from 'react';
import { Button } from 'react-native-paper';

const ButtonComponent = (props) => (
    <Button uppercased={false} {...props} contentStyle={[{ padding: 10 }, props.contentStyle]} style={[{ borderRadius: props.circular ? 30 : 5 }, props.style]}>
        {props.children}
    </Button>
);

export default ButtonComponent;