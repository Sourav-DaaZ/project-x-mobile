import React from 'react';
import { Card, Paragraph, Title } from 'react-native-paper';
import Button from '../../sharedComponents/button';

const CardComponent = (props) => {

    return (
        <Card style={{ width: '90%', margin: 20 }}>
            <Card.Cover style={{ height: 150 }} source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title>Card</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>
    )
};

export default CardComponent;