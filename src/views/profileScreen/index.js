import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    Avatar,
    FAB
} from 'react-native-paper';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledReviewProfile, StyledImage, StyledScrollView, StyledContainer } from './style';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { SnackbarUpdate, loader, detailsUpdate } from '../../store/actions';
import Review from './review';

import Routes from '../../constants/routeConst';
import OutsideAuthApi from '../../services/outSideAuth';

const ProfileScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch()
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [data, setData] = useState([])

    useEffect(() => {
        OutsideAuthApi()
            .userDetailsApi(`?user_id=${props.route.params?.id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }))
            });
    }, [])

    return (
        <React.Fragment>
            <StyledImage>
                <Avatar.Image
                    source={{
                        uri:
                            data.images ? data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
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
                    <Review {...props} myUser={data.user === detailsStore.id} userId={props.route.params?.id} />
                </StyledContainer>
                {props.route.params && props.route.params.id !== detailsStore.id ? <FAB
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 30,
                        backgroundColor: colors.mainColor
                    }}
                    icon="plus"
                    label='Review'
                    onPress={() => props.navigation.navigate(Routes.createReview, { id: props.route.params.id })}
                /> : null}
            </StyledScrollView>
        </React.Fragment>
    )
}
export default ProfileScreen;