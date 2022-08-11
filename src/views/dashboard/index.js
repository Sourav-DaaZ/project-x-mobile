import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { View, TouchableWithoutFeedback, TouchableOpacity, Image, RefreshControl } from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import {
    StyledHorizontalScrollView,
    StyledSearchbarView,
    StyledBannerWrapper,
    StyledScrollView
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import SingleCategory from '../categoryList/singleCat';
import Routes from '../../constants/routeConst';
import { BottomShadow, ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';
import Input from '../../sharedComponents/input';
import Loader from '../../sharedComponents/loader';
import { SnackbarUpdate } from '../../store/actions';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Banner from '../../sharedComponents/banner';
import { openUrl } from '../../utils';
import { CustomHeader } from '../../routes/custom';
import logoImg from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [banner, setBanner] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
    const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);

    useEffect(() => {
        if(isFocused){
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
        OutsideAuthApi()
            .getBannerApi('?banner_for=main')
            .then((res) => {
                setShowLoader(false);
                let varData = [];
                res.data?.map((x, i) => {
                    varData.push({
                        key: x._id,
                        img: x.image,
                        onPress: () => openUrl(x.link)
                    })
                })
                setBanner(varData);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err?.message
                }));
            })
        }
        setRefreshing(false);
    }, [isFocused, refreshing])

    return (
        <DashboardLayout fab={true} {...props} category={category} refreshing={refreshing}>
            <StyledScrollView
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
                }
            >
                <CustomHeader
                    left={<Image style={{ marginLeft: 10 }} source={logoImg} />}
                    right={props.islogin ? <Ionicons name="md-chatbubble-outline" color={colors.iconColor} size={30} onPress={() => navigation.navigate(Routes.chatList)} /> : null}
                />
                <View style={{ marginTop: -20 }}>
                    <BottomShadow small>
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
                </View>
                {banner.length > 0 ? <StyledBannerWrapper>
                    <Banner data={banner} />
                </StyledBannerWrapper> : null}
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
            </StyledScrollView>
        </DashboardLayout >
    )
};

export default Dashboard;