import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { List, Avatar } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import {
    StyledScrollView,
    StyledSearchbar,
    StyledDivider,
    StyledChip
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import { validate } from '../../utils'

import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';

const SearchScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const colors = themeContext.colors[themeContext.baseColor];
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(true);

    const onTypeFnc = (text) => {
        if (text.length === 0 || (text.length <= 1 && validate(text, { isAlphaNumeric: true }))) {
            setSearchQuery(text);
            setData([])
        } else if (text.length > 1 && validate(text, { isAlphaNumeric: true })) {
            setSearchQuery(text);
            if (flag) {
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
            <StyledSearchbar focus clear onChangeText={onTypeFnc} value={searchQuery} />
        }>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <StyledChip selected={flag} onPress={() => { setFlag(true); onTypeFnc(searchQuery) }}>
                    POST DATA
                </StyledChip>
                <StyledChip selected={!flag} onPress={() => { setFlag(false);; onTypeFnc(searchQuery) }}>
                    USER DATA
                </StyledChip>
            </View>
            <StyledScrollView>
                {flag && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate('Posts', { id: x._id })}><List.Item
                    title={x.message ? x.message : ''}
                    description={(x.owner && x.owner.userInfo ? x.owner.userInfo.name : '')}
                    left={props => x.images && x.images[0] ? <Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.images[0] }} /> : null} /></TouchableOpacity>)}
                {!flag && data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate('Posts', { data: x })}><List.Item
                    title={x.userInfo?.name ? x.userInfo.name : ''}
                    description={(x.userInfo && x.userInfo.category ? x.userInfo.category.category_name : '')}
                    left={props => x.userInfo.images && x.userInfo.images[0] ? <Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.userInfo.images[0] }} /> : null} /></TouchableOpacity>)}
                <StyledDivider />

            </StyledScrollView>
        </DashboardLayout>
    )
}
export default SearchScreen;