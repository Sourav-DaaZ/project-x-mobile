import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar, FAB } from 'react-native-paper';
import { TouchableOpacity, RefreshControl } from 'react-native';
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
import { openUrl } from '../../../utils';
import defaultValue from '../../../constants/defaultValue';

const SingleCategory = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [globalPost, setGlobalPost] = useState(true);
    const [data, setData] = useState([]);
    const [banner, setBanner] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);


    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    const apiCall = (pageCount) => {
        if (globalPost) {
            const requestData = `?category_id=${props.route.params?.data._id}&lat=${detailsStore.location.lat}&long=${detailsStore.location.long}&gender=${detailsStore.gender}&page=${pageCount}`
            OutsideAuthApi()
                .getPostsApi(requestData)
                .then((res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                        varData = varData.concat(res.data)
                    } else {
                        varData = varData.push(res.data)
                    }
                        setData(varData);
                    } else {
                        setData(res.data);
                    }
                    if (res.data && res.data.length < defaultValue.paginationLength) {
                        setDataLoader(false)
                    }
                    setShowLoader(false);
                })
                .catch((err) => {
                    if (err.message) {
                        dispatch(snackbarUpdate({
                            type: 'error',
                            msg: err?.message ? err.message : ''
                        }));
                    }
                    setShowLoader(false);
                });
        } else {
            const requestData = `?lat=${detailsStore.location.lat}&long=${detailsStore.location.long}&category=${props.route.params.data._id}&page=${pageCount}`
            OutsideAuthApi()
                .allUserApi(requestData)
                .then((res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                        varData = varData.concat(res.data)
                    } else {
                        varData = varData.push(res.data)
                    };
                        setData(varData);
                    } else {
                        setData(res.data);
                    }
                    if (res.data && res.data.length < defaultValue.paginationLength) {
                        setDataLoader(false)
                    }
                    setShowLoader(false);
                })
                .catch((err) => {
                    if (err.message) {
                        dispatch(snackbarUpdate({
                            type: 'error',
                            msg: err?.message ? err.message : ''
                        }));
                    }
                    setShowLoader(false);
                });
        }
        setRefreshing(false);
    }

    useEffect(() => {
        setData([]);
        setBanner([]);
        setShowLoader(true);
        setDataLoader(true);
        setPage(0);
        apiCall(0);
        bannerData();
    }, [globalPost, refreshing])

    useEffect(() => {
        if (page !== 0) {
            // setBanner([]);
            apiCall(page)
            // bannerData()
        }
    }, [page])

    const bannerData = () => {
        OutsideAuthApi()
            .getBannerApi(`?banner_for=category&category=${props.route.params?.data._id}&lat=${detailsStore.location.lat}&long=${detailsStore.location.long}`)
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

    return (
        <ShadowWrapperContainer none>
            <StyledHorizontalScrollView
                showsHorizontalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
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
                {showLoader ? <Loader /> : <React.Fragment>
                    {globalPost && data.map((x, i) =>
                        <Card key={i} images={x.images && x.images[0] ? x.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} title={x.title} message={x.message} onIconPress={() => console.log('hi')} icon={<StyledCardIcon name='share-outline' />} onViewPress={() => props.navigation.navigate(Routes.postDetails, { id: x._id })} />
                    )}
                    {!globalPost && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.profile, { id: x.user?._id })}>
                        <StyledUserWrapper>
                            <ListItem
                                title={x.user && x.user.userInfo ? x.user.userInfo.name : ''}
                                description={x.user && x.user.userInfo && x.user.userInfo.category ? x.user.userInfo.category.category_name : ''}
                                image={<Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.user?.userInfo?.images ? x.user.userInfo.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />} />
                        </StyledUserWrapper>
                    </TouchableOpacity>)}
                    {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
                </React.Fragment>}
            </StyledHorizontalScrollView>
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
                onPress={() => props.navigation.navigate(Routes.createPost, { category: { name: props.route.params.data.category_name, id: props.route.params.data._id } })}
            /> : null}
        </ShadowWrapperContainer>
    )
};

export default SingleCategory;