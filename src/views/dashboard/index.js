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
    StyledScrollView,
    StyledChip
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import SingleCategory from '../category/categoryList/singleCat';
import Routes from '../../constants/routeConst';
import { BottomShadow, ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';
import Input from '../../sharedComponents/input';
import Loader from '../../sharedComponents/loader';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Banner from '../../sharedComponents/banner';
import { openUrl } from '../../utils';
import { CustomHeader } from '../../routes/custom';
import logoImg from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';

const Dashboard = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [tagLoader, setTagLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [banner, setBanner] = useState([]);
    const [saveTag, setSaveTag] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
    const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);

    const apiCall = () => {
        const paramData = {
            banner_for: 'main',
        }
        setShowLoader(true);
        OutsideAuthApi()
            .categoryListApi()
            .then((res) => {
                setShowLoader(false);
                // setCategory(res.data);
                setCategory({});
            })
            .catch((err) => {
                setShowLoader(false);
            })
        OutsideAuthApi()
            .getBannerApi(paramData)
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
            })
    }

    useEffect(() => {
        if (detailsStore.location.loat !== 0 && detailsStore.location.long !== 0 && isFocused) {
            const requestParam = {
                token: authStore.firebase_token,
                user_id: detailsStore.id,
                location: detailsStore.location
            }
            OutsideAuthApi()
                .firebaseTokenCall(requestParam)
                .then(() => {

                }).catch((e) => {
                    console.log(e)
                })
        }
    }, [authStore.firebase_token, detailsStore.id])

    useEffect(() => {
        if (isFocused && !refreshing) {
            apiCall();
        }
    }, [refreshing])

    useEffect(() => {
        if (authStore.access_token !== '' && detailsStore.location.lat !== 0 && isFocused && !refreshing) {
            apiCallWithToken();
        }
    }, [authStore.access_token, detailsStore.location, refreshing]);


    const apiCallWithToken = () => {
        const varData = {
            lat: detailsStore.location.lat,
            long: detailsStore.location.long
        }
        setTagLoader(true);
        InsideAuthApi()
            .updateLocationApi(varData)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
        InsideAuthApi()
            .getSaveTagApi()
            .then((res) => {
                setTagLoader(false);
                setSaveTag(res.data);
            })
            .catch((err) => {
                setTagLoader(false);
            })
    };

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }

    return (
        <DashboardLayout {...props} refreshing={refreshing}>
            <StyledScrollView
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }
            >
                <CustomHeader
                    left={<Image style={{ marginLeft: 10 }} source={logoImg} />}
                    right={authStore.access_token && authStore.access_token !== '' ? <Ionicons name="md-chatbubble-outline" color={colors.iconColor} size={30} onPress={() => props.navigation.navigate(Routes.chatList)} /> : null}
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
                <StyledBannerWrapper>
                    {banner.length > 0 ? <Banner data={banner} /> : null}
                </StyledBannerWrapper>
                {showLoader ? <Loader /> : <ShadowWrapperContainer noSnack>
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
                {tagLoader ? <Loader /> : saveTag.tags && saveTag.tags.length > 0 ? <ShadowWrapperContainer noSnack>
                    <DashboardHeader text='Save Tag' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} onPress={() => props.navigation.navigate(Routes.category)} goNext={<AntDesign name='rightcircle' size={25} style={{ color: colors.mainByColor, marginBottom: -5 }} />} />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                        {saveTag.tags.map((x, i) => <StyledChip key={i} accessibilityLabel={x.details} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                            {x.tag_name}
                        </StyledChip>)}
                    </View>
                </ShadowWrapperContainer> : null}
            </StyledScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => props.navigation.navigate(Routes.createPost, { categories: category })}
            /> : null}
        </DashboardLayout>
    )
};

export default Dashboard;