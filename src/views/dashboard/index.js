import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { View, TouchableWithoutFeedback, TouchableOpacity, RefreshControl } from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import {
    StyledHorizontalScrollView,
    StyledSearchbarView,
    StyledBannerWrapper,
    StyledScrollView,
    StyledChip,
    StyledImage,
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import SingleCategory from '../category/categoryList/singleCat';
import Routes from '../../constants/routeConst';
import { BottomShadow, ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';
import Input from '../../sharedComponents/input';
import Loader from '../../sharedComponents/loader';
import { useSelector, shallowEqual } from 'react-redux';
import Banner from '../../sharedComponents/banner';
import { openUrl } from '../../utils';
import { CustomHeader } from '../../routes/custom';
import logoImg from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import Badge from '../../sharedComponents/badge';

const Dashboard = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const fonts = themeContext.fonts;
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const isFocused = useIsFocused();
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
                setCategory(res.data);
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
    }, [authStore.firebase_token, detailsStore.id, isFocused])

    useEffect(() => {
        if (isFocused && !refreshing) {
            apiCall();
        }
    }, [isFocused, refreshing])

    useEffect(() => {
        if (authStore.access_token !== '' && detailsStore.location.lat !== 0 && isFocused && !refreshing) {
            apiCallWithToken();
        }
    }, [isFocused, authStore.access_token, detailsStore.location, refreshing]);

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
                    left={<StyledImage style={{ marginLeft: spacing.width * 3 }} source={logoImg} />}
                    right={authStore.access_token && authStore.access_token !== '' ? <Badge show><Ionicons name="md-chatbubble-outline" color={colors.iconColor} size={spacing.width * 8} onPress={() => props.navigation.navigate(Routes.chatList)} /></Badge> : null}
                />
                <View style={{ marginTop: - spacing.height * 2 }}>
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
                                    icon={() => <Ionicons name="md-search-sharp" color={colors.textLight} size={spacing.width * 7} />}
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
                    <DashboardHeader text='Category' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} onPress={() => props.navigation.navigate(Routes.category)} goNext={<AntDesign name='rightcircle' size={spacing.width * 7} style={{ color: colors.mainByColor, marginBottom: -spacing.height }} />} />
                    <View style={{ flexDirection: "row" }}>
                        <StyledHorizontalScrollView style={{ height: "100%" }} horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableWithoutFeedback
                                onPressIn={handleInnerPressIn}
                                onPressOut={handleInnerPressOut}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {category?.map((x, i) => detailsStore.expectedCat?.length > 0 && authStore.access_token !== '' && detailsStore.expectedCat.includes(x._id) ?
                                        <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}>
                                            <SingleCategory name={x.category_name} img={x.images} />
                                        </TouchableOpacity> : <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}>
                                            <SingleCategory name={x.category_name} img={x.images} />
                                        </TouchableOpacity>)}
                                </View>
                            </TouchableWithoutFeedback>
                        </StyledHorizontalScrollView>
                    </View>
                </ShadowWrapperContainer>}
                {tagLoader ? <Loader /> : saveTag.tags && saveTag.tags.length > 0 ? <ShadowWrapperContainer noSnack>
                    <DashboardHeader text='Save Tag' outerScrollViewScrollEnabled={outerScrollViewScrollEnabled} onPress={() => props.navigation.navigate(Routes.myTag)} goNext={<AntDesign name='rightcircle' size={spacing.width * 7} style={{ color: colors.mainByColor, marginBottom: -spacing.height }} />} />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: spacing.height * 2 }}>
                        {saveTag.tags.map((x, i) => <StyledChip textStyle={{ fontSize: fonts.regular }} key={i} accessibilityLabel={x.details} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                            {x.tag_name}
                        </StyledChip>)}
                    </View>
                </ShadowWrapperContainer> : null}
            </StyledScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    right: spacing.width * 5,
                    bottom: spacing.height * 3,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => props.navigation.navigate(Routes.createPost, { categories: category })}
            /> : null}
        </DashboardLayout>
    )
};

export default React.memo(Dashboard);