import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    Avatar,
    FAB
} from 'react-native-paper';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledReviewProfile, StyledScrollView, StyledContainer } from './style';
import { ThemeContext } from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Review from './review';

const ProfileScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <StyledScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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
                <Review {...props} />
            </StyledContainer>
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Review'
                onPress={() => props.navigation.navigate('CreateReview')}
            />
        </StyledScrollView>
    )
}
export default ProfileScreen;