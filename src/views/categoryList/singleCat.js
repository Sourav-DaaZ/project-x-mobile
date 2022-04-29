import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

const CategoryList = (props) => {

    return (
        <Card style={{ width: 150 }}>
            <Card.Cover style={{ height: 100 }} source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Paragraph style={{textAlign: 'center', marginTop: 15}}>Card</Paragraph>
            </Card.Content>
        </Card>
    )
};

export default CategoryList;