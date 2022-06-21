import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import Button from '../../sharedComponents/button';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import {
    StyledHorizontalScrollView
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import SingleCategory from '../categoryList/singleCat';
import Card from '../../sharedComponents/card';

const Dashboard = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const isFocused = useIsFocused();
    const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [showMsg, setShowMsg] = useState('');
    const [category, setCategory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
    const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);

    useEffect(() => {
        let isMounted = true;
        // const unsubscribe = props.navigation.addListener("focus", () => {
        if (isFocused) {
            setShowLoader(true);
            OutsideAuthApi()
                .categoryListApi()
                .then((res) => {
                    if (isMounted) {
                        setShowLoader(false);
                        setCategory(res.data);
                    }
                })
                .catch((err) => {
                    if (isMounted) {
                        setShowLoader(false);
                        setShowMsg(err.message);
                    }
                })
            // });
        }
        return () => {
            isMounted = false;
            setRefreshing(false)
        };
    }, [isFocused, refreshing])

    return (
        <DashboardLayout fab={true} {...props} showLoader={showLoader} showMsg={showMsg} category={category} refreshFnc={() => setRefreshing(!refreshing)}>
            <View>
                <DashboardHeader text='Category' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} onPress={() => props.navigation.navigate('Category')} goNext={<Button><AntDesign name='rightcircle' size={25} style={{ color: colors.mainByColor }} /></Button>} />
                <View style={{ flexDirection: "row" }}>
                    <StyledHorizontalScrollView style={{ height: "100%", paddingBottom: 20, paddingLeft: 20, }} horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableWithoutFeedback
                            onPressIn={handleInnerPressIn}
                            onPressOut={handleInnerPressOut}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {category?.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate('SingleCategory', { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
                            </View>
                        </TouchableWithoutFeedback>
                    </StyledHorizontalScrollView>
                </View>
            </View>
            <View>
                <DashboardHeader text='Premium Post' goNext={<Button><AntDesign name='rightcircle' size={25} style={{ color: colors.mainByColor }} /></Button>} />
                {/* <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgray' }}>
                    <Button mode='contained' style={{ width: '50%', backgroundColor: 'lightgray' }}>Cancel</Button>
                    <Button mode='contained' style={{ width: '50%', backgroundColor: 'gray' }}>Ok</Button>
                </View> */}
                <TouchableOpacity onPress={() => console.log('hii')}>
                    <Card />
                </TouchableOpacity>
            </View>
        </DashboardLayout>
    )
};

export default Dashboard;