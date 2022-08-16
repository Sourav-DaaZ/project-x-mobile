import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView,
    StyledChip,
    WrapperView
} from './style';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import OutsideAuthApi from '../../../services/outSideAuth';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import Routes from '../../../constants/routeConst';
import DashboardHeader from '../../dashboard/header';
import { FAB, Menu } from 'react-native-paper';
import Loader from '../../../sharedComponents/loader';
import InsideAuthApi from '../../../services/inSideAuth';
import { SnackbarUpdate } from '../../../store/actions';

const MyTags = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [Tag, setTag] = useState([]);
    const [showMenu, setShowMenu] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    const apiCall = () => {
        OutsideAuthApi()
            .tagListApi(`?user=${detailsStore.id}`)
            .then((res) => {
                if (res.data) {
                    setTag(res.data)
                }
                setShowLoader(false);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            });
    }

    useEffect(() => {
        setShowLoader(true);
        apiCall();
    }, []);

    const onDelete = (id) => {
        const param = {
            id: id,
            delete_tag: true
        }
        InsideAuthApi(authStore)
            .editTagApi(param)
            .then((res) => {
                setShowMenu(null);
                apiCall()
            })
            .catch((err) => {
                setShowMenu(null);
                useDispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            });
    }

    return (
        showLoader ? <Loader /> : <DashboardLayout {...props} fab={false}>
            <StyledScrollView>
                <WrapperView animation='zoomIn'>
                    <DashboardHeader text='My Tags' />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>{Tag.map((x, i) =>
                        <Menu
                            key={i}
                            visible={showMenu === i}
                            onDismiss={() => setShowMenu(null)}
                            anchor={<StyledChip accessibilityLabel={x.details} onLongPress={() => setShowMenu(i)} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                                {x.tag_name}
                            </StyledChip>}
                        >
                            <Menu.Item onPress={() => onDelete(x._id)} title="Delete" />
                        </Menu>
                    )}</View>
                </WrapperView>
            </StyledScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Tag'
                onPress={() => props.navigation.navigate(Routes.addTag)}
            /> : null}
        </DashboardLayout>
    )
}
export default MyTags;