import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import {
    StyledHorizontalScrollView,
    StyledSearchbarView
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import SingleCategory from '../categoryList/singleCat';
import Routes from '../../constants/routeConst';
import { BottomShadow, ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';
import Input from '../../sharedComponents/input';
import Loader from '../../sharedComponents/loader';
import { SnackbarUpdate } from '../../store/actions';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

const Dashboard = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
    const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);

    useEffect(() => {
        if (isFocused) {
            setShowLoader(true);
            OutsideAuthApi()
                .categoryListApi()
                .then((res) => {
                    setShowLoader(false);
                    setCategory(res.data);
                })
                .catch((err) => {
                    setShowLoader(false);
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err?.message
                    }));
                })
        };
    }, [isFocused, refreshing])

    return (
        <DashboardLayout fab={true} {...props} category={category} refreshFnc={() => setRefreshing(!refreshing)} outsideScroll={
            <BottomShadow>
                <StyledSearchbarView>
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate(Routes.search)}>
                        <Input
                            ele={'search'}
                            placeholder="Search Post / User"
                            theme={{
                                colors: {
                                    placeholder: colors.textLight, text: colors.textDeep
                                }
                            }}
                            style={{ backgroundColor: colors.backgroundColor }}
                            value={''}
                            editable={false}
                            onFocus={() => props.navigation.navigate(Routes.search)}
                        />
                    </TouchableOpacity>
                </StyledSearchbarView>
            </BottomShadow>

        }>
            {showLoader ? <Loader /> : <ShadowWrapperContainer>
                <DashboardHeader text='Category' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} onPress={() => props.navigation.navigate(Routes.category)} goNext={<AntDesign name='rightcircle' size={25} style={{ color: colors.mainByColor, marginBottom: -5 }} />} />
                <View style={{ flexDirection: "row" }}>
                    <StyledHorizontalScrollView style={{ height: "100%" }} horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableWithoutFeedback
                            onPressIn={handleInnerPressIn}
                            onPressOut={handleInnerPressOut}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {category?.map((x, i) => detailsStore.expectedCat?.length > 0 && detailsStore.expectedCat.includes(x._id) ?
                                    <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}>
                                        <SingleCategory name={x.category_name} img={x.images} />
                                    </TouchableOpacity> : detailsStore.expectedCat?.length === 0 ?
                                        <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}>
                                            <SingleCategory name={x.category_name} img={x.images} />
                                        </TouchableOpacity> : null)}
                            </View>
                        </TouchableWithoutFeedback>
                    </StyledHorizontalScrollView>
                </View>
            </ShadowWrapperContainer>}
        </DashboardLayout >
    )
};

export default Dashboard;