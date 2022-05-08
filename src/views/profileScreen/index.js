import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    Avatar
} from 'react-native-paper';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledReviewProfile, StyledScrollView, StyledContainer } from './style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CardComponent from '../../sharedComponents/card'

const ProfileScreen = (props) => {

    return (
        <StyledScrollView>
            <StyledProfileView>
                <Avatar.Image
                    source={{
                        uri:
                            'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
                    }}
                    size={70}
                />
                <StyledTitle>Sourav Das</StyledTitle>
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
                <CardComponent />
            </StyledContainer>
        </StyledScrollView>
    )
}
export default ProfileScreen;