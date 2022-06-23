import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { List, Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import {
    StyledScrollView,
    StyledSearchbar,
    StyledDivider
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

    const onTypeFnc = (text) => {
        if (text.length === 0 || (text.length <= 1 && validate(text, { isAlphaNumeric: true }))) {
            setSearchQuery(text);
            console.log(text)
        } else if (text.length > 1 && validate(text, { isAlphaNumeric: true })) {
            setSearchQuery(text);
            console.log(text)
            OutsideAuthApi()
                .searchPostApi(text)
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }))
                });
        }
    }

    return (
        <DashboardLayout {...props} fab={false} outsideScroll={
            <StyledSearchbar focus clear onChangeText={onTypeFnc} value={searchQuery} />
        }>
            <StyledScrollView>
                {data.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate('Posts', { data: x })}><List.Item
                    title={x.message ? x.message : ''}
                    description={(x.owner.name ? x.owner.name : '')}
                    left={props => x.images[0] ? <Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.images[0] }} /> : null} /></TouchableOpacity>)}
                <StyledDivider />

            </StyledScrollView>
        </DashboardLayout>
    )
}
export default SearchScreen;