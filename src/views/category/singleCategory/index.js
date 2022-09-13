import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar, FAB } from 'react-native-paper';
import { TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import Share from 'react-native-share';
import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity,
    StyledUserWrapper,
    StyledCardIcon,
    StyledButtonLoadMore,
    StyledBannerWrapper
} from './style';
import OutsideAuthApi from '../../../services/outSideAuth';
import Card from '../../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Routes from '../../../constants/routeConst';
import ListItem from '../../../sharedComponents/listItem';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import Banner from '../../../sharedComponents/banner';
import { calDistance, openUrl, queryStringBulder } from '../../../utils';
import defaultValue from '../../../constants/defaultValue';
import { buildLink } from '../../../services/google/deepLinkingHandler';

const { width, height } = Dimensions.get('screen');

const SingleCategory = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [globalPost, setGlobalPost] = useState(true);
    const [postData, setPostData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [banner, setBanner] = useState([]);
    const [showPostLoader, setPostShowLoader] = useState(false);
    const [showUserLoader, setUserShowLoader] = useState(false);
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);


    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive onPress={onPress}><StyledButtonView invert>{text}</StyledButtonView></StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    const apiCall = (pageCount) => {
        if (globalPost) {
            const requestData = {
                category_id: props.route.params?.data._id ? props.route.params.data._id : '',
                lat: detailsStore.location.lat,
                long: detailsStore.location.long,
                gender: detailsStore.gender,
                ...detailsStore.age > 0 && { age: detailsStore.age },
                page: pageCount
            }
            OutsideAuthApi()
                .getPostsApi(requestData)
                .then((res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                            varData = varData.concat(res.data)
                        } else {
                            varData.push(res.data)
                        }
                        setPostData(varData);
                    } else {
                        setPostData(res.data);
                    }
                    if (res.data && res.data.length < defaultValue.paginationLength) {
                        setDataLoader(false)
                    }
                    setPostShowLoader(false);
                })
                .catch((err) => {
                    if (err.message) {
                        dispatch(snackbarUpdate({
                            type: 'error',
                            msg: err?.message ? err.message : ''
                        }));
                    }
                    setPostShowLoader(false);
                });
        } else {
            const requestData = {
                lat: detailsStore.location.lat,
                long: detailsStore.location.long,
                category: props.route.params?.data?._id ? props.route.params.data._id : '',
                page: pageCount
            }
            OutsideAuthApi()
                .allUserApi(requestData)
                .then((res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                            varData = varData.concat(res.data)
                        } else {
                            varData.push(res.data)
                        };
                        setUserData(varData);
                    } else {
                        setUserData(res.data);
                    }
                    if (res.data && res.data.length < defaultValue.paginationLength) {
                        setDataLoader(false)
                    }
                    setUserShowLoader(false);
                })
                .catch((err) => {
                    if (err.message) {
                        dispatch(snackbarUpdate({
                            type: 'error',
                            msg: err?.message ? err.message : ''
                        }));
                    }
                    setUserShowLoader(false);
                });
        }
        setRefreshing(false);
    }

    const bannerData = () => {
        const paramData = {
            banner_for: 'category',
            category: props.route.params?.data._id ? props.route.params.data._id : '',
            lat: detailsStore.location.lat,
            long: detailsStore.location.long
        }
        OutsideAuthApi()
            .getBannerApi(paramData)
            .then((res) => {
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
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            })
    }
    useEffect(() => {
        bannerData();
    }, [refreshing])
    
    useEffect(() => {
        if (!refreshing) {
            setPostShowLoader(true);
            setUserShowLoader(true);
            setDataLoader(true);
            setPage(0);
            apiCall(0);
        }
    }, [globalPost, refreshing])

    useEffect(() => {
        if (page !== 0) {
            apiCall(page)
        }
    }, [page])

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }

    const onShare = async (page, id, image, title) => {
        const varParam = {
            page: page,
            id: id
        }
        const url = 'https://projectxmobile.com/?' + queryStringBulder(varParam)
        const longUrl = await buildLink(url);
        const options = {
            title: 'post:' + title,
            subject: 'post:' + title,
            message: title + ', click this link: ' + longUrl
        }
        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    return (
        <ShadowWrapperContainer none {...props}>
            <StyledHorizontalScrollView
                showsHorizontalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }>
                <StyledBannerWrapper>
                    {banner.length > 0 ? <Banner data={banner} /> : null}
                </StyledBannerWrapper>
                <BottomShadow small>
                    <StyledViewButton>
                        {GlobalButton(globalPost, 'Post', () => setGlobalPost(true))}
                        {GlobalButton(!globalPost, 'Users', () => setGlobalPost(false))}
                        {GlobalButton(globalPost && !globalPost, 'Global', () => props.navigation.navigate(Routes.globalChat, { id: props.route.params.data._id }))}
                    </StyledViewButton>
                </BottomShadow>

                {globalPost ? showPostLoader ? <Loader /> : postData.map((x, i) =>
                    <Card key={i} images={x.images && x.images[0] ? x.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} title={x.title} message={x.message} onIconPress={() => onShare(Routes.postDetails, x._id, x.images && x.images[0] ? x.images[0] : null, x.title)} icon={<StyledCardIcon name='share-outline' />} onViewPress={() => props.navigation.navigate(Routes.postDetails, { id: x._id })} />
                ) : null}
                {!globalPost ? showUserLoader ? <Loader /> : userData.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.profile, { id: x.user?._id })}>
                    <StyledUserWrapper>
                        <ListItem
                            title={x.user && x.user.userInfo ? x.user.userInfo.name : ''}
                            description={x.user && x.user.userInfo && x.user.userInfo.category ? x.user.userInfo.category.category_name : ''}
                            smallDescription={detailsStore.location.lat && detailsStore.location.long && x?.location?.coordinates ? calDistance(x.location.coordinates[0], x.location.coordinates[1], detailsStore.location.lat, detailsStore.location.long).toString() + ' Km' : null}
                            image={<Avatar.Image style={{ margin: 5 }} size={50} source={{ uri: x.user?.userInfo?.images ? x.user.userInfo.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />} />
                    </StyledUserWrapper>
                </TouchableOpacity>) : null}
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
            </StyledHorizontalScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    right: width * .05,
                    bottom: height * .03,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => props.navigation.navigate(Routes.createPost, { category: { name: props.route.params.data.category_name, id: props.route.params.data._id } })}
            /> : null}
        </ShadowWrapperContainer>
    )
};

export default React.memo(SingleCategory);