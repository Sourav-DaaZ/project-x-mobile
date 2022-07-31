import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar,
    FAB
} from 'react-native-paper';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledReviewProfile, StyledImage, StyledScrollView, StyledContainer, StyledButtonActive, StyledTouchableOpacity, StyledButtonView, StyledViewButton } from './style';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import Review from './review';

import Routes from '../../constants/routeConst';
import OutsideAuthApi from '../../services/outSideAuth';
import Loader from '../../sharedComponents/loader';
import { BottomShadow } from '../../sharedComponents/bottomShadow';
import Booking from './booking';

const ProfileScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [globalPost, setGlobalPost] = useState(true);

    useEffect(() => {
        OutsideAuthApi()
            .userDetailsApi(`?user_id=${props.route.params?.id}`)
            .then((res) => {
                setShowLoader(false);
                setData(res.data);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }))
            });
    }, [])

    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    return (
        showLoader ? <Loader /> : <React.Fragment>
            <StyledImage>
                <Avatar.Image
                    source={{
                        uri:
                            data.images ? "data:image/png;base64," + data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
                    }}
                    size={120}
                />
            </StyledImage>
            <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StyledProfileView>
                    <StyledTitle>{data?.name}</StyledTitle>
                    <StyledParagraph>{data?.category?.category_name + (data?.subCategory ? `( ${data?.subCategory} )` : '')}</StyledParagraph>
                </StyledProfileView>
                <StyledReviewProfile>
                    <StyledCenter>
                        <StyledSemiTitle>0</StyledSemiTitle>
                        <StyledParagraph>Followers</StyledParagraph>
                    </StyledCenter>
                    <StyledCenter>
                        <StyledSemiTitle>0</StyledSemiTitle>
                        <StyledParagraph>Followers</StyledParagraph>
                    </StyledCenter>
                    <StyledCenter>
                        <StyledSemiTitle>0</StyledSemiTitle>
                        <StyledParagraph>Followers</StyledParagraph>
                    </StyledCenter>
                </StyledReviewProfile>
                <StyledContainer>
                    {data.user === detailsStore.id && authStore.access_token && authStore.access_token !== '' ? <BottomShadow>
                        <StyledViewButton>
                            {GlobalButton(globalPost, 'Booking', () => setGlobalPost(true))}
                            {GlobalButton(!globalPost, 'Review', () => setGlobalPost(false))}
                        </StyledViewButton>
                    </BottomShadow> : null}
                    {globalPost ? <Booking {...props} myUser={data.user === detailsStore.id} userId={props.route.params?.id} /> : null}
                </StyledContainer>
            </StyledScrollView>
            {props.route.params && props.route.params.id === detailsStore.id ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Book'
                onPress={() => props.navigation.navigate(Routes.createBooking)}
            /> : null}
        </React.Fragment>
    )
}
export default ProfileScreen;