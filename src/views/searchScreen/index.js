import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { List, Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import {
    StyledScrollView,
    StyledWrapperBody,
    StyledChip,
    StyledWrapper,
    StyledOptiondWrapper,
    StyledWrapperList
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import { validate } from '../../utils';
import Routes from '../../constants/routeConst';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import Input from '../../sharedComponents/input';
import ListItem from '../../sharedComponents/listItem';

const SearchScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const colors = themeContext.colors[themeContext.baseColor];
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(true);

    const onTypeFnc = (text, lflag) => {
        if (text.length === 0 || (text.length <= 1 && validate(text, { isAlphaNumeric: true }))) {
            setSearchQuery(text);
            setData([])
        } else if (text.length > 1 && validate(text, { isAlphaNumeric: true })) {
            setSearchQuery(text);
            setData([])
            if (lflag) {
                OutsideAuthApi()
                    .searchPostApi(text)
                    .then((res) => {
                        setData(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else {
                OutsideAuthApi()
                    .searchUserApi(text)
                    .then((res) => {
                        setData(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        }
    }

    return (
        <DashboardLayout {...props} fab={false} outsideScroll={
            <StyledWrapper>
                <Input
                    ele={'search'}
                    placeholder="Search Post / User"
                    theme={{
                        colors: {
                            placeholder: colors.textColor, text: colors.textDeep, background: colors.backgroundColor
                        }
                    }}
                    
                    focus clear onChange={(x) => onTypeFnc(x, flag)} value={searchQuery} />
            </StyledWrapper>
        }>
            <StyledWrapperBody>
                <StyledOptiondWrapper>
                    <StyledChip selectedColor={flag ? colors.backgroundColor : colors.borderLight} selected={flag} onPress={() => { setFlag(true); onTypeFnc(searchQuery, true) }}>
                        Post
                    </StyledChip>
                    <StyledChip selectedColor={!flag ? colors.backgroundColor : colors.borderLight} selected={!flag} onPress={() => { setFlag(false); onTypeFnc(searchQuery, false) }}>
                        User
                    </StyledChip>
                </StyledOptiondWrapper>
                <StyledScrollView>
                    {flag && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.postDetails, { id: x._id })}>
                        <StyledWrapperList>
                            <ListItem
                                title={x.message ? x.message : ''}
                                description={(x.owner && x.owner.userInfo && x.visible ? x.owner.userInfo.name : 'anonymous')}
                                image={<Avatar.Image style={{ margin: 5 }} size={60} source={{ uri: x.images && x.images[0] && x.visible ? x.images[0] : "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png" }} />} />
                        </StyledWrapperList>
                    </TouchableOpacity>)}
                    {!flag && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.profile, { id: x._id })}>
                        <StyledWrapperList>
                            <ListItem
                                title={x.userInfo?.name ? x.userInfo.name : ''}
                                description={(x.userInfo && x.userInfo.category ? x.userInfo.category.category_name : '')}
                                image={<Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.userInfo && x.userInfo.images ? x.userInfo.images : "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png" }} />} />
                        </StyledWrapperList>
                    </TouchableOpacity>)}
                </StyledScrollView>
            </StyledWrapperBody>
        </DashboardLayout>
    )
}
export default SearchScreen;