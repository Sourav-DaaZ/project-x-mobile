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
import * as Animatable from 'react-native-animatable';
import Routes from '../../constants/routeConst';

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
            <Animatable.View animation='slideInUp'>
                <DashboardHeader text='Category' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} onPress={() => props.navigation.navigate(Routes.category)} goNext={<Button><AntDesign name='rightcircle' size={25} style={{ color: colors.mainByColor }} /></Button>} />
                <View style={{ flexDirection: "row" }}>
                    <StyledHorizontalScrollView style={{ height: "100%", paddingBottom: 20, paddingLeft: 20, }} horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableWithoutFeedback
                            onPressIn={handleInnerPressIn}
                            onPressOut={handleInnerPressOut}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {category?.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
                            </View>
                        </TouchableWithoutFeedback>
                    </StyledHorizontalScrollView>
                </View>
            </Animatable.View>
            <Animatable.View animation='slideInUp'>
                <DashboardHeader text='Premium Post' goNext={<Button><AntDesign name='rightcircle' size={25} style={{ color: colors.mainByColor }} /></Button>} />
                {/* <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgray' }}>
                    <Button mode='contained' style={{ width: '50%', backgroundColor: 'lightgray' }}>Cancel</Button>
                    <Button mode='contained' style={{ width: '50%', backgroundColor: 'gray' }}>Ok</Button>
                </View> */}
                {/* <TouchableOpacity onPress={() => props.navigation.navigate(Routes.appChat, { id: '6249a9caf8189e221c63ec8f' })}>
                    <Card />
                </TouchableOpacity> */}
            </Animatable.View>
        </DashboardLayout>
    )
};

export default Dashboard;