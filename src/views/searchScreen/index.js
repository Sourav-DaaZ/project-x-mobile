import React, { useContext, useState, useCallback } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { debounce } from "lodash";

import {
    StyledScrollView,
    StyledWrapperBody,
    StyledChip,
    StyledWrapper,
    StyledOptiondWrapper,
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { validate } from '../../utils';
import Routes from '../../constants/routeConst';
import Input from '../../sharedComponents/input';
import ListItem from '../../sharedComponents/listItem';
import { ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';

const SearchScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const colors = themeContext.colors[themeContext.baseColor];
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);

    const onTypeFnc = (text, lflag) => {
        if (text.length === 0 || (text.length <= 1 && validate(text, { isAlphaNumeric: true }))) {
            setSearchQuery(text);
            setData([])
        } else if (text.length > 1 && validate(text, { isAlphaNumeric: true })) {
            setSearchQuery(text);
            setData([])
            onApicall(text, lflag);
        }
    }

    const onApicall = useCallback(debounce((text, lflag) => {
        if (lflag) {
            const varParam = {
                search: text
            }
            OutsideAuthApi()
                .searchPostApi(varParam)
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            const varParam = {
                search: text
            }
            OutsideAuthApi()
                .searchUserApi(varParam)
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }, 700), [])

    return (
        <ShadowWrapperContainer none>
            <StyledWrapperBody>
                <StyledWrapper>
                    <Input
                        ele={'search'}
                        placeholder="Search Post / User"
                        theme={{
                            colors: {
                                placeholder: colors.textLight, text: colors.textDeep
                            }
                        }}
                        style={{ backgroundColor: colors.backgroundColor }}
                        focus clear onChange={(x) => onTypeFnc(x, flag)} value={searchQuery} />
                </StyledWrapper>
                <StyledOptiondWrapper>
                    <StyledChip selectedColor={!flag ? colors.backgroundColor : colors.borderDeep} selected={!flag} onPress={() => { setFlag(false); onTypeFnc(searchQuery, false) }}>
                        User
                    </StyledChip>
                    <StyledChip selectedColor={flag ? colors.backgroundColor : colors.borderDeep} selected={flag} onPress={() => { setFlag(true); onTypeFnc(searchQuery, true) }}>
                        Post
                    </StyledChip>
                </StyledOptiondWrapper>
                <StyledScrollView>
                    {flag && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.postDetails, { id: x._id })}>
                        <ListItem
                            title={x.title ? x.title : ''}
                            description={(x.owner && x.owner.userInfo && x.visible ? x.owner.userInfo.name : 'anonymous')}
                            image={<Avatar.Image style={{ margin: 5 }} size={60} source={{ uri: x.images && x.images[0] && x.visible ? x.images[0] : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg" }} />} />
                    </TouchableOpacity>)}
                    {!flag && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.profile, { id: x._id })}>
                        <ListItem
                            title={x.userInfo?.name ? x.userInfo.name : ''}
                            description={(x.userInfo && x.userInfo.category ? x.userInfo.category.category_name : '')}
                            image={<Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.userInfo && x.userInfo.images ? x.userInfo.images : "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png" }} />} />
                    </TouchableOpacity>)}
                </StyledScrollView>
            </StyledWrapperBody>
        </ShadowWrapperContainer>
    )
}
export default SearchScreen;