import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { View, TouchableWithoutFeedback } from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import Button from '../../sharedComponents/button';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    StyledHorizontalScrollView
} from './style';

import CategoryList from '../categoryList/singleCat';
import Card from '../../sharedComponents/card';

const Dashboard = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] = useState(true);
    const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
    const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);
    return (
        <DashboardLayout banner='https://rukminim2.flixcart.com/flap/844/140/image/d7acd8642443dd1c.jpg?q=50'>
            <View>
                <DashboardHeader text='Category' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} goNext={<Button><AntDesign name='rightcircle' size={25} style={{ color: colors.mainColor }} /></Button>} />
                <View style={{ flexDirection: "row" }}>
                    <StyledHorizontalScrollView style={{ height: "100%", paddingBottom: 20, paddingLeft: 20, }} horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableWithoutFeedback
                            onPressIn={handleInnerPressIn}
                            onPressOut={handleInnerPressOut}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <CategoryList />
                            </View>
                        </TouchableWithoutFeedback>
                    </StyledHorizontalScrollView>
                </View>
            </View>
            <View>
                <DashboardHeader text='Premium Post' goNext={<Button><AntDesign name='rightcircle' size={25} style={{ color: colors.mainColor }} /></Button>} />
                {/* <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgray' }}>
                    <Button mode='contained' style={{ width: '50%', backgroundColor: 'lightgray' }}>Cancel</Button>
                    <Button mode='contained' style={{ width: '50%', backgroundColor: 'gray' }}>Ok</Button>
                </View> */}
                <Card />
            </View>
        </DashboardLayout>
    )
};

export default Dashboard;